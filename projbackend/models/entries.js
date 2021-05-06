const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const entrySchema = new mongoose.Schema(
  {
      title : {
      type: String,
      trim: true,
      required: true,
      maxlength: 50
    },
    entry: {
      type: String,
      trim: true,
      required: true,
      maxlength: 1000
    },
    sentimentScore : {
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", entrySchema);