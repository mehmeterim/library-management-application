const express = require("express");
const bodyParser = require("body-parser");
const { body, param } = require("express-validator");
const {
  getUsers,
  getUser,
  addUser,
  barrowBook,
  returnBook,
} = require("./controllers/userController");
const { getBooks, getBook, addBook } = require("./controllers/bookController");

const app = express();
app.use(bodyParser.json());

app.get("/users", getUsers);
app.get("/users/:userId", [param("userId").notEmpty().isInt()], getUser);
app.post("/users", [body("name").notEmpty().isString()], addUser);

app.post(
  "/users/:userId/borrow/:bookId",
  [param("userId").notEmpty().isInt(), param("bookId").notEmpty().isInt()],
  barrowBook
);

app.post(
  "/users/:userId/return/:bookId",
  [
    param("userId").notEmpty().isInt(),
    param("bookId").notEmpty().isInt(),
    body("score").notEmpty().isFloat({ min: 0, max: 10 }),
  ],
  returnBook
);

app.get("/books", getBooks);
app.get("/books/:bookId", [param("bookId").notEmpty().isInt()], getBook);
app.post("/books", [body("name").notEmpty().isString()], addBook);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
