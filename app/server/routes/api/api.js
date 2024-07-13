module.exports = (game) => {
  const router = require("express").Router();
  router.use("/wordle", require("./wordle/wordleAPI")(game));
  router.get("^/$", (req, res) => {
    res.json({ message: "API - /api" });
  });

  return router;
};
