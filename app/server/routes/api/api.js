const express = require("express");
const router = express.Router();

router.use("/wordle", require("./wordle/wordle"));
router.get("^/$", (req, res) => {
  res.json({ message: "API - /api" });
});

module.exports = router;
