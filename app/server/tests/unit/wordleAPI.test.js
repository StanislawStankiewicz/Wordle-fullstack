const request = require("supertest");
const express = require("express");
const router = require("../../routes/api/wordle/wordleAPI");

jest.mock("../../models/wordleModel", () => {
  return jest.fn().mockImplementation(() => {
    return {};
  });
});

jest.mock("../../controllers/wordleController", () => {
  return {
    checkGuess: jest.fn(
      () => (req, res) => res.status(200).send("Guess Checked")
    ),
    getMaxGuesses: jest.fn(
      () => (req, res) => res.status(200).send("Max Guesses")
    ),
    getWordLength: jest.fn(
      () => (req, res) => res.status(200).send("Word Length")
    ),
  };
});

const WordleGame = require("../../models/wordleModel");
const wordleController = require("../../controllers/wordleController");

const app = express();
app.use(express.json());

const game = null;
app.use("/wordle", router(game));

describe("Wordle Router", () => {
  it("should handle POST /guess", async () => {
    const response = await request(app)
      .post("/wordle/guess")
      .send({ guess: "hello" });
    expect(response.status).toBe(200);
    expect(response.text).toBe("Guess Checked");
    expect(wordleController.checkGuess).toHaveBeenCalledWith(
      expect.any(Object)
    );
  });

  it("should handle GET /maxGuesses", async () => {
    const response = await request(app).get("/wordle/maxGuesses");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Max Guesses");
    expect(wordleController.getMaxGuesses).toHaveBeenCalledWith(
      expect.any(Object)
    );
  });

  it("should handle GET /wordLength", async () => {
    const response = await request(app).get("/wordle/wordLength");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Word Length");
    expect(wordleController.getWordLength).toHaveBeenCalledWith(
      expect.any(Object)
    );
  });
});
