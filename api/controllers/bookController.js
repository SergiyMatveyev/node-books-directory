"use strict";
const objectId = require("mongodb").ObjectId;
const Book = require("../models/book.js");

const getAllBooks = async function (req, res) {
  try {
    const books = await Book.getAllBooks(req.query.search);
    res.send({
      status: 200,
      book: books,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: error,
    });
  }
};

const getBookById = async function (req, res) {
  const id = new objectId(req.params.id);
  try {
    const book = await Book.getBook(id);
    res.send(book);
  } catch (error) {
    return console.log(error);
  }
};

const addBook = async function (req, res) {
  if (!req.body)
    return res.sendStatus({ status: 400, message: "Body is absent" });

  const bookName = req.body.name;
  const bookYear = req.body.year;
  const bookGenre = req.body.genre;

  if (!bookName)
    return res.sendStatus({ status: 400, message: "Book name is absent" });

  if (!bookYear)
    return res.sendStatus({ status: 400, message: "Book year is absent" });

  if (!bookGenre)
    return res.sendStatus({ status: 400, message: "Book genre is absent" });

  const book = new Book(bookName, bookYear, bookGenre);
  try {
    const result = await book.addBook();
    res.send({
      status: 200,
      book: {
        _id: result.insertedId,
        name: book.name,
        year: book.year,
        genre: book.genre,
      },
    });
  } catch (err) {
    return console.log(err);
  }
};

const editBook = async function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const id = new objectId(req.body.id);
  const bookName = req.body.name;
  const bookYear = req.body.year;
  const bookGenre = req.body.genre;

  if (!bookName)
    return res.sendStatus({ status: 400, message: "Book name is absent" });

  if (!bookYear)
    return res.sendStatus({ status: 400, message: "Book year is absent" });

  if (!bookGenre)
    return res.sendStatus({ status: 400, message: "Book genre is absent" });

  const book = new Book(bookName, bookYear, bookGenre);

  try {
    const result = await book.editBook(id);
    res.send({
      status: 200,
      book: {
        _id: id,
        name: book.name,
        year: book.year,
        genre: book.genre,
      },
    });
  } catch (error) {
    return console.log(err);
  }
};

const deleteBook = async function (req, res) {
  if (!req.params) return res.sendStatus(400);

  const id = new objectId(req.params.id);

  try {
    const result = await Book.deleteBook(id);
    res.send({
      status: 200,
      book: {
        id: id,
      },
    });
  } catch (error) {
    return console.log(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  editBook,
  deleteBook,
};
