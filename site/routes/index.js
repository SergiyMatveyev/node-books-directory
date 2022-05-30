"use strict";

const bookRoutes = require("./book_routes.js");

module.exports = function (app) {
  bookRoutes(app);
};
