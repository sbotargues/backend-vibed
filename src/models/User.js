const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email is required"],
    },
    role: {
      type: String,
      trim: true,
      required: [true, "Role is required"],
      enum: ["user", "admin", "business"],
    },
    password: {
      type: String,
      required: function () {
        return this.authenticationMethod === "local";
      },
    },
    authenticationMethod: {
      type: String,
      required: true,
      enum: ["local", "google"],
      default: "local",
    },
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    genre: [{ type: String, trim: true }],
    link: {
      type: String,
      trim: true,
    },
    social: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    direction: {
      type: String,
      trim: true,
    },
    capacity: {
      type: Number,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    events: {
      type: Boolean,
      trim: true,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      trim: true,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
    likesFromBusinesses: [{ type: mongoose.Schema.Types.ObjectId }],
    favoriteCharacters: [{ type: String, trim: true }],
    requestList: [{ type: mongoose.Schema.Types.ObjectId }],
    lastRequestDate: Date,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("User", userSchema);
