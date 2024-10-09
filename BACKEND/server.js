import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/book.js";

dotenv.config();

const app = express();
app.use(express.json());

const port = 3000;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
}

app.post("/books", (req, res) => {
  const book = new Book({
    title: req.body.title,
    writer: req.body.writer,
    edition: req.body.edition,
    pubDate: req.body.pubDate,
    isEbook: req.body.isEbook,
    cost: req.body.cost,
    languages: req.body.languages,
    genre: req.body.genre,
  });

  book.save().then((result) => res.send(result));
});

app.get("/books", (req, res) => {
  Book.find().then((books) => res.send(books));
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  Book.findById(id).then((book) => res.send(book));
});

app.delete("/books/:id", (req, res) => {
    const { id } = req.params;
    Book.findByIdAndDelete(id).then((result) => {
      if (result) {
        res.send({ message: "Book deleted successfully" });
      } else {
        res.send({ message: "Book not found" });
      }
    });
  });
  

app.patch("/books/:id", (req, res) => {
  const { id } = req.params;
  const updatedBook = {
    title: req.body.title,
    writer: req.body.writer,
    edition: req.body.edition,
    pubDate: req.body.pubDate,
    isEbook: req.body.isEbook,
    cost: req.body.cost,
    languages: req.body.languages,
    genre: req.body.genre,
  };

  Book.findByIdAndUpdate(id, updatedBook, { new: true }).then((result) =>
    res.send(result)
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
