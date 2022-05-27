"use strict";

const MongoClient = require("mongodb").MongoClient;
const db = require("../config/db");

let _db;

module.exports = {
  connectToServer: function () {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(
        db.mongoDBUrl,
        { useNewUrlParser: true },
        function (err, client) {
          if (err) reject(err);
          _db = client.db(db.mongoDBName);
          resolve("MongoDB connected successfully");
        }
      );
    });
  },

  getDb: function () {
    return _db;
  },
};
