const fs = require("fs");

const wordListPath = "resources/words.txt";

const wordList = fs.readFileSync(wordListPath, "utf8").split("\n");

const getWordList = (wordLength) => {
  return wordList.filter((word) => word.length === wordLength);
};

module.exports = getWordList;
