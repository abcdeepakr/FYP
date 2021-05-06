const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const sentimentSchema = new mongoose.Schema(
  {   
    sentimentValues:[],
    days: [],
    user: {
      type: ObjectId,
      ref: "User"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sentiment", sentimentSchema);