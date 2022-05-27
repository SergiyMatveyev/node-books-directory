"use strict";

const express = require("express");
const bookRoutes = require("./book_routes.js");
const bookRouter = express.Router();

module.exports = function (app) {
  app.use("/api/v1/books", bookRouter);
  bookRoutes(bookRouter);
};
