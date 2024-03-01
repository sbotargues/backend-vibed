const { Router } = require("express");
const isAuth = require("../middleware/is-user");
const characterController = require("../controllers/character");

const router = Router({ strict: true });

router.get("/", characterController.getAllCharacters);
router.get("/:id", characterController.getCharacterById);
router.post(
  "/:id/add-to-favorites",
  isAuth,
  characterController.addToFavorites
);

module.exports = router;
