const WordleGame = require("../../models/wordleModel");

describe("wordleModel", () => {
  let game;

  beforeEach(() => {
    game = new WordleGame(5, 6, -1);
  });

  beforeAll(() => {
    global.console = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
    };
  });

  afterAll(() => {
    global.console = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info,
      debug: console.debug,
    };
  });

  it("initializes correctly", () => {
    expect(game.targetWord).toHaveLength(5);
    expect(game.maxGuesses).toBe(6);
    expect(game.wordList[0]).toHaveLength(game.wordLength);
  });

  describe("checkGuess", () => {
    it("returns correct when guess is correct", () => {
      game.setTargetWord("hello");
      expect(game.checkGuess("hello")).toEqual({ result: "correct" });
    });

    it("returns incorrect when guess is incorrect", () => {
      game.setTargetWord("jumps");
      expect(game.checkGuess("world")).toEqual({
        result: "incorrect",
        letter_info: [
          { letter: "w", status: "incorrect" },
          { letter: "o", status: "incorrect" },
          { letter: "r", status: "incorrect" },
          { letter: "l", status: "incorrect" },
          { letter: "d", status: "incorrect" },
        ],
      });
    });

    it("returns correct status when guess is partially correct", () => {
      game.setTargetWord("hello");
      expect(game.checkGuess("world")).toEqual({
        result: "incorrect",
        letter_info: [
          { letter: "w", status: "incorrect" },
          { letter: "o", status: "present" },
          { letter: "r", status: "incorrect" },
          { letter: "l", status: "correct" },
          { letter: "d", status: "incorrect" },
        ],
      });
    });
  });

  describe("setTargetWord", () => {
    it("throws error when word is incorrect length", () => {
      expect(() => game.setTargetWord("worlds")).toThrow(
        "Word must be a valid 5-letter word"
      );
    });

    it("throws error when word is not in word list", () => {
      expect(() => game.setTargetWord("qwert")).toThrow(
        "Word must be a valid 5-letter word"
      );
    });

    it("sets target word when word is correct length and in word list", () => {
      game.setTargetWord("hello");
      expect(game.targetWord).toBe("hello");
    });
  });

  describe("setRandomTargetWord", () => {
    it("returns a valid word", () => {
      expect(game.targetWord).toHaveLength(5);
    });
  });
});
