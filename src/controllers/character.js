const axios = require("axios");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.getAllCharacters = async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    const characters = response.data.results;
    return res.status(200).json(characters);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.getCharacterById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const character = response.data;
    return res.status(200).json(character);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.addToFavorites = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  try {
    const userDocument = await User.findById(user._id);
    if (!userDocument)
      return res.status(404).json({ message: "User not found" });
    if (userDocument.favoriteCharacters.includes(id)) {
      const index = userDocument.favoriteCharacters.indexOf(id);
      userDocument.favoriteCharacters.splice(index, 1);
      await userDocument.save();
      console.log("Character removed from favorites");
      return res
        .status(200)
        .json({ message: "Character removed from favorites" });
    } else {
      userDocument.favoriteCharacters.push(id);
      await userDocument.save();
      console.log("Character added to favorites");
      return res.status(200).json({ message: "Character added to favorites" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
