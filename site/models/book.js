"use strict";
const getDb = require("../../utils/mongoUtil.js").getDb;

module.exports = class Book {
  constructor(name, year, genre) {
    this.name = name;
    this.year = year;
    this.genre = genre;
  }

  static async getAllBooks(query) {
    let filter = {};
    if (query && Object.keys(query).length !== 0) {
      const queryKeys = Object.keys(query);
      if (queryKeys.length > 1) {
        filter.$and = this.formQueryParams(query);
      } else {
        filter = this.formQueryByKey(query, queryKeys[0], filter);
      }
    }

    const collection = getDb().collection("books");
    const books = collection.find(filter).toArray();
    return books;
  }

  static async getBook(id) {
    const collection = getDb().collection("books");
    const book = await collection.findOne({ _id: id });
    return book;
  }

  async addBook() {
    const collection = getDb().collection("books");
    const result = await collection.insertOne(this);
    return result;
  }

  async editBook(id, returnDocument = "after") {
    const collection = getDb().collection("books");
    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set: this },
      { returnDocument: returnDocument }
    );
    return result;
  }

  static async deleteBook(id) {
    const collection = getDb().collection("books");
    const result = await collection.findOneAndDelete({ _id: id });
    const book = result.value;
    return book;
  }

  static async getBooksYears() {
    const collection = getDb().collection("books");
    const years = collection.distinct("year");
    return years;
  }

  static async getBooksGenres() {
    const collection = getDb().collection("books");
    const years = collection.distinct("genre");
    return years;
  }

  static formQueryParams(query) {
    let array = [];
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        let param = this.formQueryByKey(query, key);
        array.push(param);
      }
    }
    return array;
  }

  static formQueryByKey(query, key) {
    let object = {};
    let value = query[key];
    if (Array.isArray(value)) {
      object[key] = { $in: value };
    } else {
      object[key] = value;
    }
    return object;
  }
};
