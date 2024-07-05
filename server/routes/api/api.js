const express = require("express");
const router = express.Router();

router.use("/wordle", require("./wordle"));

module.exports = router;
