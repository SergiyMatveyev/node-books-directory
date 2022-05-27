"use strict";
const getDb = require("../../utils/mongoUtil.js").getDb;

module.exports = class Book {
  constructor(name, year, genre) {
    this.name = name;
    this.year = year;
    this.genre = genre;
  }

  static async getAllBooks() {
    const collection = getDb().collection("books");
    const books = collection.find({}).toArray();
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
};
