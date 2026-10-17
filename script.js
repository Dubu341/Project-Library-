const myLibrary = [];
const container = document.querySelector(".card-container");
let title = "test";
let author = "test";
let pages = "test";
class Book {
  constructor(title, author, pages) {
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.info = function () {
      return `Title:${this.title}, Author: ${this.author}, Pages: ${this.pages}`;
    };
  }
}

function addBookToLibrary() {
  ((myLibrary.push(new Book(title, author, pages)),
  myLibrary.push(
    new Book("The Great Gatsby", "F. Scott Fitzgerald", "180 pages"),
  )),
    myLibrary.push(new Book("Pride and Prejudice", "Jane Austen", "384 pages")),
    myLibrary.push(
      new Book("A Tale of Two Cities", " Charles Dickens", "416 pages"),
    ));
  displayBook();
}
function displayBook() {
  myLibrary.forEach((book) => {
    const content = document.createElement("div");
    content.classList.add("card");
    content.textContent = `Title: ${book.title}, Author:${book.author}, Pages: ${book.pages}`;
    container.appendChild(content);
  });
}
addBookToLibrary();
