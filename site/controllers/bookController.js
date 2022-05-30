"use strict";
const objectId = require("mongodb").ObjectId;
const Book = require("../models/book.js");

const renderMain = async function (req, res) {
  try {
    const books = await Book.getAllBooks(req.query);
    const years = await Book.getBooksYears();
    const genres = await Book.getBooksGenres();
    res.render("index", {
      title: "List of books",
      years: years,
      genres: genres,
      books: books.reverse(),
    });
  } catch (error) {
    return console.log(error);
  }
};

module.exports = {
  renderMain,
};
