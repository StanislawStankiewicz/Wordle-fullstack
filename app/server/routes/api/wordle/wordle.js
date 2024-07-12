const express = require("express");
const router = express.Router();
const wordleController = require("../../../controllers/wordleController");

router
  .post("/guess", wordleController.checkGuess)
  .get("/maxGuesses", wordleController.getMaxGuesses)
  .get("/wordlength", wordleController.getWordLength);

module.exports = router;
