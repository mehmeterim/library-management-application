const knex = require("../config/database");

async function getUsers(req, res) {
  try {
    const users = await knex.select("*").from("users");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUser(req, res) {
  const userId = req.params.userId;
  try {
    const user = await knex("users").where({ id: userId }).first();

    if (user === undefined) throw new Error("user not found!");

    const borrowedBooks = await knex("borrowed_books") // Hata burada düzeltildi
      .select("books.*")
      .join("books", "books.id", "borrowed_books.book_id")
      .where("borrowed_books.user_id", userId);

    user.borrowedBooks = borrowedBooks;

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addUser(req, res) {
  const { name } = req.body;
  try {
    const newUser = await knex("users").insert({ name }).returning("*");
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function barrowBook(req, res) {
  const { userId, bookId } = req.params;
  try {
    const user = await knex("users").where({ id: userId }).first();

    if (user === undefined) throw new Error("user not found!");

    const borrowedBook = await knex("borrowed_books")
      .where({ user_id: userId, book_id: bookId, return_date: null })
      .first();

    if (borrowedBook !== undefined)
      throw new Error("borrowed book is available!");

    const insertedBorrowedBook = await knex("borrowed_books")
      .insert({
        user_id: userId,
        book_id: bookId,
        borrow_date: new Date(),
        return_date: null,
      })

      .returning("*");

    res.json(insertedBorrowedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function returnBook(req, res) {
  const { userId, bookId } = req.params;
  const { score } = req.body;
  try {
    const user = await knex("users").where({ id: userId }).first();

    if (user === undefined) throw new Error("user not found!");

    const borrowedBook = await knex("borrowed_books")
      .where({ user_id: userId, book_id: bookId })
      .first();

    if (borrowedBook === undefined) throw new Error("borrowed book not found!");

    const updatedBorrowedBook = await knex("borrowed_books")
      .where({ user_id: userId, book_id: bookId, return_date: null })
      .update({ return_date: new Date(), score: score });

    if (updatedBorrowedBook !== 0) {
      const bookDetail = await knex("books").where({ id: bookId }).first();

      let totalRates = bookDetail.total_rates;
      let totalRating = bookDetail.total_rating;

      totalRates += 1;
      totalRating += score;

      const avarageRating = totalRating / totalRates;

      await knex("books")
        .where({ id: bookId })
        .update({
          average_rating: avarageRating,
          total_rates: totalRates,
          total_rating: totalRating,
        });
    }

    res.json(updatedBorrowedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getUsers, getUser, addUser, barrowBook, returnBook };
