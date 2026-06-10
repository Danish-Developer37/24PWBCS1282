const express = require("express");
const router = express.Router();

const Book = require("../models/Book");

/*
GET ALL BOOKS
SEARCH + PAGINATION
*/
router.get("/", async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const query = {};

        if (req.query.author) {
            query.author = req.query.author;
        }

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        const books = await Book.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/*
GET SINGLE BOOK
*/
router.get("/:id", async (req, res) => {
    try {

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/*
ADD NEW BOOK
*/
router.post("/", async (req, res) => {
    try {

        const { title, author, price } = req.body;

        if (!title || !author || !price) {
            return res.status(400).json({
                message: "Title, Author and Price are required"
            });
        }

        const newBook = new Book(req.body);

        const savedBook = await newBook.save();

        res.status(201).json(savedBook);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/*
UPDATE BOOK
*/
router.put("/:id", async (req, res) => {
    try {

        const { title, author, price } = req.body;

        if (!title || !author || !price) {
            return res.status(400).json({
                message: "Title, Author and Price are required"
            });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(updatedBook);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/*
DELETE BOOK
*/
router.delete("/:id", async (req, res) => {
    try {

        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;