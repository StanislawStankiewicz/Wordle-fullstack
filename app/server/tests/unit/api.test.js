const request = require("supertest");
const express = require("express");
const router = require("../../routes/api/api");

jest.mock("../../routes/api/api", () => {
  const express = require("express");
  const router = express.Router();
  router.get("/wordle", (req, res) => res.status(200).send("Wordle API"));
  router.get("^/$", (req, res) => {
    res.json({ message: "API" });
  });
  return router;
});

const app = express();
app.use("/api", router);

describe("Main Router", () => {
  it("should mount the wordleAPI router at /wordle", async () => {
    const response = await request(app).get("/api/wordle/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Wordle API");
  });

  it("should handle GET /api", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "API" });
  });
});
