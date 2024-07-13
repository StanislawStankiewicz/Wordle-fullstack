const express = require("express");
const router = express.Router();
const wordleController = require("../../../controllers/wordleController");

module.exports = (game) => {
  router
    .post("/guess", wordleController.checkGuess(game))
    .get("/maxGuesses", wordleController.getMaxGuesses(game))
    .get("/wordLength", wordleController.getWordLength(game));

  return router;
};
