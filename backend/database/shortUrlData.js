const { default: mongoose } = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    unique: true,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
  },
});

module.exports = mongoose.model("links", urlSchema);
