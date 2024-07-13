const express = require("express");
const router = express.Router();
const WordleGame = require("../../../models/wordleModel");
const wordleController = require("../../../controllers/wordleController");

const game = new WordleGame((wordLength = 5), (maxGuesses = 6));

router
  .post("/guess", wordleController.checkGuess(game))
  .get("/maxGuesses", wordleController.getMaxGuesses(game))
  .get("/wordLength", wordleController.getWordLength(game));

module.exports = router;
