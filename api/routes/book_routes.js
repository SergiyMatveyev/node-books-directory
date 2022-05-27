"use strict";

const bookController = require("../controllers/bookController.js");
const jsonParser = require("express").json();

module.exports = function (router) {
  router.get("/", bookController.getAllBooks);
  router.get("/:id", bookController.getBookById);
  router.post("/", jsonParser, bookController.addBook);
  router.put("/", jsonParser, bookController.editBook);
  router.delete("/:id", bookController.deleteBook);
};
