"use strict";
const objectId = require("mongodb").ObjectId;
const Book = require("../models/book.js");

const getAllBooks = async function (req, res) {
  try {
    const books = await Book.getAllBooks();
    res.send(books);
  } catch (error) {
    return console.log(error);
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
  if (!req.body) return res.sendStatus(400);

  const bookName = req.body.name;
  const bookYear = req.body.year;
  const bookGenre = req.body.genre;

  let book = new Book(bookName, bookYear, bookGenre);

  try {
    const result = await book.addBook();
    res.send(result);
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

  let book = new Book(bookName, bookYear, bookGenre);

  try {
    const result = await book.editBook(id);
    res.send(result);
  } catch (error) {
    return console.log(err);
  }
};

const deleteBook = async function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const id = new objectId(req.body.id);

  try {
    const result = await Book.deleteBook(id);
    res.send(result);
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
