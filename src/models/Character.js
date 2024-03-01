const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    status: {
      type: String,
    },
    species: {
      type: String,
    },
    type: {
      type: String,
    },
    gender: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Character", characterSchema);
