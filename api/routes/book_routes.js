"use strict";

const bookController = require("../controllers/bookController.js");
const jsonParser = require("express").json();

module.exports = function (app) {
  app.get("/api/v1/books/", bookController.getAllBooks);
  app.get("/api/v1/books/:id", bookController.getBookById);
  app.post("/api/v1/books/", jsonParser, bookController.addBook);
  app.put("/api/v1/books/", jsonParser, bookController.editBook);
  app.delete("/api/v1/books/:id", bookController.deleteBook);
};
