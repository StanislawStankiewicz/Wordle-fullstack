class WordleGame {
  constructor(targetWord) {
    this.targetWord = targetWord.toLowerCase();
  }

  checkGuess(guess) {
    guess = guess.toLowerCase();
    if (guess.length !== 5) {
      throw new Error("Guess must be a 5-letter word");
    }

    if (guess === this.targetWord) {
      return { result: "correct" };
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
}

module.exports = WordleGame;
