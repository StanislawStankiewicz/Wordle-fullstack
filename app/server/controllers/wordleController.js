const WordleGame = require("../models/wordleModel");

const game = new WordleGame((wordLength = 5), (maxGuesses = 6));

exports.checkGuess = (req, res) => {
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

exports.getMaxGuesses = (req, res) => {
  res.json({ maxGuesses: game.getMaxGuesses() });
};

exports.getWordLength = (req, res) => {
  res.json({ wordLength: game.getWordLength() });
};
