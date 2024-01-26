const createError = require("http-errors");
const Library = require("../models/book");

// Find book
const findBookId = (req) => {
    const bookId = req.params.id;
    return library.findIndex(book => book.id === bookId);
}

// Get all books
exports.getBooks = async (req, res, next) => {
    try {
        const bookLibrary = await Library.find();
        console.log("Found Library!");
        res.send(bookLibrary);
    } catch (err) {
        console.log("Error getting data from library");
        console.log(`Check MongoDB or ${__filename}`);
        return next(createError(500, err.message));
    }
}

// Create a book
exports.addBook = async (req, res, next) => {
    if (!req.headers["api_key"] || req.headers["api_key"] != "testpassword") {
        console.log("Invalid Call, Check API Key!");
        return;
    }

    try {
        const book =  new Library({
            author: req.body.author,
            title: req.body.title,
            comments: req.body.comments,
            rating: req.body.rating
        })

        await book.save();
        res.send(book);
    } catch (err) {
        return next(createError(500, err.message))
    }
}

exports.findBook = async (req, res, next) => {
    try {
        // Find book
        const book = await Library.findById(req.params.id);

        // Can't find book
        if (!book) {
            return next(createError(404, "Book not found! Check ID"));
        }

        // Book was found
        console.log("Book has been found!")
        res.send(book);
    } catch (err) {
        return next(createError(500, err.message));
    }
}

exports.deleteBook = async (req, res, next) => {
    try {
        // Get book to delete
        const bookToDelete = await Library.findByIdAndDelete(req.params.id);

        // Can't find book
        if (!bookToDelete) {
            return next(createError(404, "Book can't be deleted. Book not found! Check ID"));
        }

        // Book has been deleted
        console.log("Book has been deleted!");
        res.send({result: true});
    } catch (err) {
        return next(createError(500, err.message));
    }
}

// Update book information
exports.updateBook = async (req, res, next) => {
    try {
        console.log("Update")
        // Get book to update
        const bookToUpdate = await Library.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        // Book can't be found
        if (!bookToUpdate) {
            return next(createError(404, "Book can't be updated. Book not found! Check ID"));
        }

        // Book has been updated
        console.log("Book has been updated!");
        res.send(bookToUpdate);
    } catch (err) {
        return next(createError(500, err.message));
    }
}

