const express = require("express");
const { addBook, getBooks, updateBook, deleteBook } = require("../controllers/bookController.js");

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
