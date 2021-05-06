const express = require("express");
const router = express.Router();
const { getSentimentValues } = require("../controllers/sentiment");

//*Read Routes
router.get("/values",getSentimentValues)
module.exports = router;
