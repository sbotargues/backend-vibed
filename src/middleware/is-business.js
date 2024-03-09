const { verify } = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.get("x-business-auth-token");
  if (!token || token === "") {
    req.isAuth = false;
    return res.status(401).send("Authorization failed..");
  } else {
    let decoded;

    try {
      decoded = verify(token, process.env.JWT_SECRET);
    } catch (error) {
      req.isAuth = false;
      return res.status(401).send("Authorization failed..");
    }

    if (!decoded) {
      req.isAuth = false;
      return res.status(401).send("Authorization failed..");
    }

    // Verificar si el token incluye userId y email (inicio de sesión con Google OAuth)
    if (decoded.userId && decoded.email) {
      try {
        // Buscar al usuario en la base de datos
        req.business = await User.findOne({
          _id: decoded.userId,
          email: decoded.email,
        });
        if (!req.business) {
          req.isAuth = false;
          return res.status(401).send("Authorization failed..");
        }
      } catch (error) {
        req.isAuth = false;
        return res.status(500).send("Server error");
      }
    } else {
      // Verificar si el token incluye el objeto completo del usuario (inicio de sesión normal)
      if (!decoded.business || decoded.business.role !== "business") {
        req.isAuth = false;
        return res.status(401).send("Authorization failed..");
      }
      req.business = decoded.business;
    }

    req.isAuth = true;
    req.businessData = decoded;
    return next();
  }
};
