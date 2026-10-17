const myLibrary = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: "180 pages",
    id: crypto.randomUUID(),
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: "384 pages",
    id: crypto.randomUUID(),
  },
  {
    title: "A Tale of Two Cities",
    author: " Charles Dickens",
    pages: "416 pages",
    id: crypto.randomUUID(),
  },
];
const container = document.querySelector(".card-container");
const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector("dialog + button");
const closeBtn = document.querySelector("dialog button");
const form = document.querySelector("form");

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (event) => {
  //add new book to myLibrary array
  event.preventDefault();
  const formData = new FormData(event.target);
  const formValues = Object.fromEntries(formData);
  const newBook = new Book(formValues);
  myLibrary.push(newBook);
  displayBook();
  form.reset();
  dialog.close();
});

class Book {
  constructor({ title, author, pages }) {
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

function displayBook() {
  container.innerHTML = "";
  myLibrary.forEach((book) => {
    const content = document.createElement("div");
    content.classList.add("card");
    content.textContent = `Title: ${book.title}, Author:${book.author}, Pages: ${book.pages}`;
    container.appendChild(content);
  });
}
displayBook();
