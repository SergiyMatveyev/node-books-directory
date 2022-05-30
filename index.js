"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoUtil = require("./utils/mongoUtil.js");
const app = express();
const port = 3000;

// Allow server understands requests' body parameters
app.use(bodyParser.urlencoded({ extended: true }));

mongoUtil
  .connectToServer()
  .then(() => {
    require("./site")(app);
    require("./api/routes")(app);
    app.listen(port, () => {
      console.log("We are live on " + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
