class WordleGame {
  constructor(wordLength = 5, guessesAmount = 6) {
    this.wordLength = wordLength;
    this.guessesAmount = guessesAmount;
    this.wordList = require("./getWordList")(wordLength);
    this.setRandomTargetWord();

    setInterval(() => {
      this.setRandomTargetWord();
    }, 1000 * 60 * 60 * 24);
  }

  setRandomTargetWord() {
    this.targetWord =
      this.wordList[Math.floor(Math.random() * this.wordList.length)];
    console.log(this.targetWord);
  }

  setTargetWord(word) {
    if (word.length !== this.wordLength || !this.wordList.includes(word)) {
      throw new Error(`Word must be a valid ${this.wordLength}-letter word`);
    }
    this.targetWord = word;
  }

  checkGuess(guess) {
    if (guess === this.targetWord) {
      return { result: "correct" };
    }

    guess = guess.toLowerCase();
    if (guess.length !== this.wordLength || !this.wordList.includes(guess)) {
      throw new Error(`Guess must be a valid ${this.wordLength}-letter word`);
    }

    const letterInfo = guess.split("").map((letter, index) => {
      if (letter === this.targetWord[index]) {
        return { letter, status: "correct" };
      } else if (this.targetWord.includes(letter)) {
        return { letter, status: "present" };
      } else {
        return { letter, status: "incorrect" };
      }
    });

    return { result: "incorrect", letter_info: letterInfo };
  }

  getWordLength() {
    return this.wordLength;
  }

  getGuessesAmount() {
    return this.guessesAmount;
  }
}

module.exports = WordleGame;
