const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");

exports.register = async (req, res, next) => {
  const {
    username,
    email,
    password,
    role,
    name,
    phone,
    genre,
    link,
    social,
    price,
    image,
    direction,
    capacity,
    description,
  } = req.body;

  console.log(req);

  if (!username || !email || !password || !role) {
    return res.status(400).send("Please fill in all the required fields!");
  }

  try {
    const userObj = {
      username,
      email,
      password: await hash(password, 12),
      role,
      name,
      phone,
      genre,
      link,
      social,
      price,
      image,
      direction,
      capacity,
      description,
    };

    const user = await new User(userObj).save();

    const token = sign({ [role]: user }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });

    return res.status(201).json({
      token,
      user: { ...user._doc, password: null },
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).lean();
    if (!user) return res.status(404).send("Invalid credentials");
    if (user.role !== "user")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ user }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(200).json({ token, user: { ...user, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?._id).select("-password").lean();
    if (!user)
      return res.status(400).send("User not found, Authorization denied..");
    return res.status(200).json({ ...user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const updateFields = req.body;

  if (req.file) {
    updateFields.image = req.file.location;
  }

  try {
    const userToUpdate = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });
    return res.status(200).json({
      ...userToUpdate.toObject(),
      password: null,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").lean();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.sendRequests = async (req, res) => {
  const { userId, businessIds } = req.body;
  console.log(
    "Received sendRequests with userId:",
    userId,
    "and businessIds:",
    businessIds
  );

  try {
    const user = await User.findById(userId);
    console.log("User found:", !!user);
    if (!user) return res.status(404).send("User not found");

    if (
      user.lastRequestDate &&
      new Date() - new Date(user.lastRequestDate) < 7 * 24 * 60 * 60 * 1000
    ) {
      console.log(
        "User cannot submit requests yet, lastRequestDate:",
        user.lastRequestDate
      );
      return res.status(400).send("You can only submit requests once a week");
    }

    user.requestList = businessIds;
    user.lastRequestDate = new Date();
    console.log("Updating user with new requestList and lastRequestDate");

    await user.save();
    console.log("User updated successfully");

    res.status(200).send("Requests sent successfully");
  } catch (error) {
    console.error("Error processing sendRequests:", error);
    res.status(500).send(error.message);
  }
};

exports.checkApplication = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    // Comprueba si ha pasado una semana desde el último envío
    const canApply =
      !user.lastRequestDate ||
      new Date() - new Date(user.lastRequestDate) >= 7 * 24 * 60 * 60 * 1000;

    res.status(200).json({ canApply, lastRequestDate: user.lastRequestDate });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
