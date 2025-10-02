const Book = require("../models/Book.js");

// ✅ Add Book
const addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();

    req.io.emit("bookAdded", book);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!book) return res.status(404).json({ msg: "Book not found" });

    req.io.emit("bookUpdated", book); // realtime event
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ msg: "Book not found" });

    req.io.emit("bookDeleted", book._id); // realtime event
    res.json({ msg: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
};
