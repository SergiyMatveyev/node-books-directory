"use strict";

const bookController = require("../controllers/bookController.js");

module.exports = function (router) {
  router.get("/", bookController.renderMain);
};
