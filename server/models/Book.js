const mongoose = require("mongoose");

const bookModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const BookSchema = mongoose.model("Book", bookModel);
module.exports = BookSchema;
