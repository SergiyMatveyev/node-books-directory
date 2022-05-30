"use strict";

const express = require("express");
const mustacheExpress = require("mustache-express");
const path = require("path");
const VIEWS_PATH = path.join(__dirname, "/views");

module.exports = function (app) {
  require("./routes")(app);

  app.engine("mst", mustacheExpress(VIEWS_PATH + "/partials", ".mst"));
  app.set("view engine", "mst");
  app.set("views", VIEWS_PATH);
  app.use(express.static(__dirname + "/public"));
};
