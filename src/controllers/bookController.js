const knex = require("../config/database");

async function getBooks(req, res) {
  try {
    const books = await knex
      .select(["id", "name", "average_rating"])
      .from("books");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getBook(req, res) {
  const bookId = req.params.bookId;
  try {
    const book = await knex("books")
      .select(["id", "name", "average_rating"])
      .where({ id: bookId })
      .first();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addBook(req, res) {
  const { name } = req.body;
  try {
    const newBook = await knex("books").insert({ name }).returning("*");
    res.json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getBooks, getBook, addBook };
