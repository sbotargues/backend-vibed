const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/User");

exports.registerBusiness = async (req, res, next) => {
  const {
    username,
    email,
    password,
    name,
    phone,
    direction,
    capacity,
    genre,
    link,
    social,
    price,
    image,
    events,
    description,
  } = req.body;
  const role = "business";
  if (!username || !email || !password) {
    return res.status(400).send("Please fill in all the required fields!");
  }
  try {
    const userObj = {
      username,
      email,
      role,
      name,
      phone,
      events,
      direction,
      capacity,
      genre,
      link,
      social,
      price,
      image,
      description,
    };
    const hashedPwd = await hash(password, 12);
    userObj.password = hashedPwd;
    const user = await new User(userObj).save();
    const token = sign({ business: user }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res
      .status(201)
      .json({ token, business: { ...user._doc, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.loginBusiness = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, role: "business" }).lean();
    if (!user) return res.status(404).send("Invalid credentials");
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ business: user }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res
      .status(200)
      .json({ token, business: { ...user, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getAuthBusiness = async (req, res, next) => {
  try {
    const business = await User.findById(req?.business?._id)
      .select("-password")
      .lean();
    if (!business)
      return res.status(400).send("Business not found, Authorization denied..");
    return res.status(200).json({ ...business });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getAllBusinesses = async (req, res, next) => {
  try {
    const businesses = await User.find({ role: "business" })
      .select("-password")
      .lean();
    if (!businesses || businesses.length === 0) {
      return res.status(404).send("No businesses found.");
    }
    return res.status(200).json(businesses);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.updateBusiness = async (req, res, next) => {
  const { businessId } = req.params;
  const updateFields = req.body;

  if (req.file) {
    updateFields.image = req.file.location;
  }

  try {
    const userToUpdate = await User.findByIdAndUpdate(
      businessId,
      updateFields,
      {
        new: true,
      }
    );
    return res.status(200).json({
      ...userToUpdate.toObject(),
      password: null,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUsersAppliedToBusiness = async (req, res, next) => {
  const { businessId } = req.params;

  try {
    const users = await User.find({
      role: "user",
      requestList: mongoose.Types.ObjectId(businessId),
    }).select("-password");

    if (!users.length) {
      return res.status(404).send("No users have applied to your business.");
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Failed to fetch applied users:", error);
    return res.status(500).send(error.message);
  }
};
