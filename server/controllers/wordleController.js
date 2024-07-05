const WordleGame = require("../models/wordleModel");

const targetWord = "apple";
const game = new WordleGame(targetWord);

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
