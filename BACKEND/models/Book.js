import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
  },
  edition: {
    type: String,
  },
  pubDate: {
    type: String,
  },
  isEbook: {
    type: String,
    default: "no",
  },
  cost: {
    type: String,
  },
  languages: {
    type: [String],
  },
  genre: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
