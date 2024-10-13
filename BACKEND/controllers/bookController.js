import Book from "../models/book.js";

export const createBook = async (req, res) => {
  const book = new Book(req.body);

  try {
    const savedBook = await book.save();
    res.status(201).send(savedBook);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).send(book);
    } else {
      res.status(404).send({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedBook) {
      res.status(200).send(updatedBook);
    } else {
      res.status(404).send({ message: "Book not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (deletedBook) {
      res.status(200).send({ message: "Book deleted successfully" });
    } else {
      res.status(404).send({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
