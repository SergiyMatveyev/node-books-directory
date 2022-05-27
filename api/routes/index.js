"use strict";

const express = require("express");
const apiRouter = express.Router();

const bookRoutes = require("./book_routes.js");
const bookRouter = express.Router();

module.exports = function (app) {
  app.use("/api/v1", apiRouter);

  apiRouter.use("/books", bookRouter);
  bookRoutes(bookRouter);
};
