const request = require("supertest");
const express = require("express");
const {
  checkGuess,
  getMaxGuesses,
  getWordLength,
} = require("../../controllers/wordleController");

const mockWordleGame = {
  checkGuess: jest.fn(),
  getMaxGuesses: jest.fn(),
  getWordLength: jest.fn(),
};

const app = express();
app.use(express.json());

app.post("/check-guess", checkGuess(mockWordleGame));
app.get("/max-guesses", getMaxGuesses(mockWordleGame));
app.get("/word-length", getWordLength(mockWordleGame));

describe("Wordle Controller", () => {
  describe("checkGuess", () => {
    it("returns 400 if guess is not provided", async () => {
      const response = await request(app).post("/check-guess").send({});
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Bad request. Must contain 'guess' attribute."
      );
    });

    it("returns 400 if game.checkGuess throws an error", async () => {
      const guess = "test";
      const errorMessage = "Invalid guess";
      mockWordleGame.checkGuess.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const response = await request(app).post("/check-guess").send({ guess });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(errorMessage);
    });

    it("returns result from game.checkGuess", async () => {
      const guess = "test";
      const result = { correct: false, message: "Wrong guess" };
      mockWordleGame.checkGuess.mockReturnValue(result);

      const response = await request(app).post("/check-guess").send({ guess });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(result);
      expect(mockWordleGame.checkGuess).toHaveBeenCalledWith(guess);
    });
  });

  describe("getMaxGuesses", () => {
    it("returns maxGuesses from game.getMaxGuesses", async () => {
      const maxGuesses = 6;
      mockWordleGame.getMaxGuesses.mockReturnValue(maxGuesses);

      const response = await request(app).get("/max-guesses");
      expect(response.status).toBe(200);
      expect(mockWordleGame.getMaxGuesses).toHaveBeenCalled();
      expect(response.body.maxGuesses).toBe(maxGuesses);
    });
  });

  describe("getWordLength", () => {
    it("returns wordLength from game.getWordLength", async () => {
      const wordLength = 5;
      mockWordleGame.getWordLength.mockReturnValue(wordLength);

      const response = await request(app).get("/word-length");
      expect(response.status).toBe(200);
      expect(response.body.wordLength).toBe(wordLength);
      expect(mockWordleGame.getWordLength).toHaveBeenCalled();
    });
  });
});
