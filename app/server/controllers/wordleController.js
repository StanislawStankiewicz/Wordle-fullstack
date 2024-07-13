const WordleGame = require("../models/wordleModel");

exports.checkGuess = (game) => (req, res) => {
  if (!req.body.guess) {
    return res
      .status(400)
      .json({ error: "Bad request. Must contain 'guess' attribute." });
  }
  try {
    const result = game.checkGuess(req.body.guess);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMaxGuesses = (game) => (req, res) => {
  res.json({ maxGuesses: game.getMaxGuesses() });
};

exports.getWordLength = (game) => (req, res) => {
  res.json({ wordLength: game.getWordLength() });
};
