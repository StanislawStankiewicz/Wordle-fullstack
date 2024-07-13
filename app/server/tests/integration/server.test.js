const request = require("supertest");
const WordleGame = require("../../models/wordleModel");

const game = new WordleGame(5, 6);
game.setTargetWord("hello");
const app = require("../../server")(game);

describe("server", () => {
  it("returns 404 for unknown route", async () => {
    const response = await request(app).get("/api/wordle/unknown");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(String),
        message: expect.any(String),
        status: 404,
      })
    );
  });

  it("returns html for GET /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toBe("text/html; charset=UTF-8");
  });
});

describe("api", () => {
  it("returns correct wordLength", async () => {
    const response = await request(app).get("/api/wordle/wordLength");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ wordLength: expect.any(Number) });
  });

  it("returns correct maxGuesses", async () => {
    const response = await request(app).get("/api/wordle/maxGuesses");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ maxGuesses: expect.any(Number) });
  });

  it("returns correct guess info", async () => {
    const response = await request(app)
      .post("/api/wordle/guess")
      .send({ guess: "hello" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        result: expect.any(String),
      })
    );
  });
});
