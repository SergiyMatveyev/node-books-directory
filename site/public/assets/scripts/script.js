"use strict";

const booksDirectory = {
  bookTable: document.querySelector("#bookTable"),
  bookEditButtons: document.querySelectorAll(".button-edit"),
  bookDeleteButtons: document.querySelectorAll(".button-delete"),
  bookForm: document.querySelector("#bookForm"),
  searchForm: document.querySelector("#searchForm"),

  init: function () {
    if (this.bookForm) {
      this.bookForm.addEventListener("submit", this.submitBookForm.bind(this));
    }

    if (this.bookEditButtons) {
      this.bookEditButtons.forEach((item) => {
        item.addEventListener("click", this.editBookHandler.bind(this));
      });
    }

    if (this.bookDeleteButtons) {
      this.bookDeleteButtons.forEach((item) => {
        item.addEventListener("click", this.deleteBookHandler.bind(this));
      });
    }
    if (this.searchForm) {
      this.searchForm.addEventListener(
        "submit",
        this.submitSearchForm.bind(this)
      );
    }
  },

  submitSearchForm: function (e) {
    e.preventDefault();
    if (this.searchForm.search.value !== undefined) {
      this.searchBook();
    }
  },

  searchBook: async function () {
    let search = {
      search: this.searchForm.search.value,
    };

    await this.makeFetch(
      "/api/v1/books/",
      "GET",
      search,
      undefined,
      this.addSearchedBookToTable
    );
  },

  addSearchedBookToTable: function (result, context = this) {
    const tableBody = context.bookTable.querySelector("tbody");
    tableBody.innerHTML = "";
    for (const element of result) {
      const row = context.createTableRow(element);
      tableBody.append(row);
    }
  },

  submitBookForm: function (e) {
    e.preventDefault();
    if (
      this.bookForm.bookId.value === undefined ||
      this.bookForm.bookId.value === ""
    ) {
      this.addBook();
    } else {
      this.editBook();
    }
    this.bookForm.reset();
  },

  editBookHandler: function (e) {
    e.preventDefault();
    this.bookForm.bookId.value = e.target.closest("tr").dataset.bookId;
    this.bookForm.bookName.value = e.target
      .closest("tr")
      .querySelectorAll("td")[0].innerText;
    this.bookForm.bookYear.value = e.target
      .closest("tr")
      .querySelectorAll("td")[1].innerText;
    this.bookForm.bookGenre.value = e.target
      .closest("tr")
      .querySelectorAll("td")[2].innerText;
  },

  deleteBookHandler: function (e) {
    e.preventDefault();
    const id = e.target.closest("tr").dataset.bookId;
    this.deleteBook(id);
  },

  addBook: async function () {
    let book = {
      name: this.bookForm.bookName.value,
      year: this.bookForm.bookYear.value,
      genre: this.bookForm.bookGenre.value,
    };
    await this.makeFetch(
      "/api/v1/books/",
      "POST",
      undefined,
      book,
      this.addBookToTable
    );
  },

  editBook: async function () {
    let book = {
      id: this.bookForm.bookId.value,
      name: this.bookForm.bookName.value,
      year: this.bookForm.bookYear.value,
      genre: this.bookForm.bookGenre.value,
    };
    await this.makeFetch(
      "/api/v1/books/",
      "PUT",
      undefined,
      book,
      this.editBookToTable
    );
  },

  deleteBook: async function (id) {
    await this.makeFetch(
      "/api/v1/books/",
      "DELETE",
      id,
      undefined,
      this.deleteBookFromTable
    );
  },

  makeFetch: async function (url, method, params = "", data, success) {
    let fetchObject = {
      method: method,
    };

    if (data) {
      fetchObject.headers = { "Content-Type": "application/json" };
      fetchObject.body = JSON.stringify(data);
    }

    if (params) {
      if (typeof params === "object" && params !== null) {
        url += "?" + new URLSearchParams(params);
      } else {
        url += params;
      }
    }

    let response = await fetch(url, fetchObject).catch((error) => {
      console.log(error);
    });

    let result = await response.json();

    if (result.status === 200) {
      this.hideFormErrorMessage();
      success(result.book, this);
    } else {
      this.showFormErrorMessage(result.message).bind(this);
    }
  },

  addBookToTable: function (book, context = this) {
    const tableBody = context.bookTable.querySelector("tbody");
    const row = context.createTableRow(book);
    tableBody.prepend(row);
  },

  editBookToTable: function (book, context = this) {
    const tableBody = context.bookTable.querySelector("tbody");
    const row = tableBody.querySelector(`[data-book-id="${book._id}"]`);
    const cells = row.querySelectorAll(`td`);
    cells[0].innerText = book.name;
    cells[1].innerText = book.year;
    cells[2].innerText = book.genre;
  },

  deleteBookFromTable: function (book, context = this) {
    const tableBody = context.bookTable.querySelector("tbody");
    const row = tableBody.querySelector(`[data-book-id="${book.id}"]`);
    row.remove();
  },

  createTableRow: function (object) {
    let tableRow = document.createElement("tr");
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        if (key == "_id") {
          tableRow.setAttribute("data-book-id", object["id"]);
        } else {
          tableRow.append(this.createCell(object[key]));
        }
      }
    }

    tableRow.append(
      this.createCellWithButton(
        "Edit",
        "waves-effect waves-light btn-small blue button-edit button-edit"
      )
    );
    tableRow.append(
      this.createCellWithButton(
        "Delete",
        "waves-effect waves-light btn-small red accent-4 button-delete"
      )
    );
    return tableRow;
  },

  createCell: function (data) {
    const tableCell = document.createElement("td");
    const tableCellTextNode = document.createTextNode(data);
    tableCell.append(tableCellTextNode);
    return tableCell;
  },

  createCellWithButton: function (text, classes) {
    const buttonMessageNode = document.createTextNode(text);
    const button = document.createElement("button");
    button.setAttribute("class", classes);
    button.setAttribute("type", "button");
    button.append(buttonMessageNode);
    const cell = document.createElement("td");
    cell.append(button);
    return cell;
  },

  showFormErrorMessage: function (message) {
    let errorBlock = document.createElement("div");
    let messageNode = document.createTextNode(message);
    errorBlock.setAttribute("id", "formError");
    errorBlock.setAttribute("class", "alert alert-danger mb-3");
    errorBlock.setAttribute("role", "alert");
    errorBlock.append(messageNode);

    this.bookTable.before(errorBlock);
  },

  hideFormErrorMessage: function () {
    let errorBlock = document.querySelector("#formError");
    if (errorBlock !== null) errorBlock.remove();
  },
};

booksDirectory.init();
