const express = require("express");
const router = express.Router();
const wordleController = require("../../controllers/wordleController");

router.post("/", wordleController.checkGuess);

module.exports = router;
