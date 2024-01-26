const express = require("express");

const router = express.Router();

// Import API Functions
const { getBooks, addBook, deleteBook, updateBook, findBook } = require("../controllers/bookControllers");

// API Endpoints

router.get("/library", getBooks); // Get all books
router.get("/find_book/:id", findBook); // Get specific books
router.post('/add_book', addBook); // Add book to library
router.delete('/delete_book/:id', deleteBook);  // Delete book from library by ID
router.put("/update_book/:id", updateBook);  // Update book from library by ID

module.exports = router;
