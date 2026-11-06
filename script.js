let myLibrary = [];
const container = document.querySelector(".card-container");
const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".addBookBtn");
const closeBtn = document.querySelector(".closeBtn");
const form = document.querySelector("form");
const checkbox = document.querySelector(".checkbox");
const title = document.getElementById("title");
const titleError = document.querySelector(".titleError");
const author = document.getElementById("author");
const authorError = document.querySelector(".authorError");

title.addEventListener("input", () => {
  // it accepts a value of spaces
  if (title.validity.valid) {
    titleError.textContent = "";
    titleError.className = "titleError error";
  } else {
    showTitleError();
  }
});
function showTitleError() {
  if (title.validity.valueMissing) {
    titleError.textContent = "Title is required";
  }
  titleError.className = "titleError error active";
}
author.addEventListener("input", () => {
  if (author.validity.valid) {
    authorError.textContent = "";
    authorError.className = "authorError error";
  } else {
    showAuthorError();
  }
});
function showAuthorError() {
  if (author.validity.valueMissing) {
    authorError.textContent = "Author is required";
  }
  authorError.className = "authorError error active";
}
addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!title.validity.valid) {
    // only runs if browser check fails
    showTitleError();
    return;
  }
  if (!author.validity.valid) {
    showAuthorError();
    return;
  }
  //add new book to myLibrary array
  const formData = new FormData(event.target);
  formData.set("read", checkbox.checked); //sets the checkbox value to either true or false
  const formValues = Object.fromEntries(formData);
  const newBook = new Book(formValues);
  myLibrary.push(newBook);
  displayBook();
  form.reset();
  dialog.close();
});

class Book {
  constructor({ title, author, pages, read = false }) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.read = read;
  }
  changeRead() {
    this.read = !this.read;
  }
}
(function addBookToLibrary() {
  myLibrary.push(
    new Book({
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      pages: "180 pages",
      read: true,
    }),
  );
  myLibrary.push(
    new Book({
      title: "Pride and Prejudice",
      author: "Jane Austen",
      pages: "384 pages",
      read: false,
    }),
  );
  myLibrary.push(
    new Book({
      title: "A Tale of Two Cities",
      author: "Charles Dickens",
      pages: "416 pages",
      read: false,
    }),
  );
})();
function displayBook() {
  container.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookContainer = document.createElement("div");
    const buttonContainer = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const isRead = document.createElement("p");
    const removeBook = document.createElement("button");

    const readBook = document.createElement("input");
    readBook.type = "checkbox";

    title.textContent = `Title: ${book.title}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;
    isRead.textContent = book.read ? "Read: Yes" : "Read: No";
    removeBook.textContent = "Remove";

    bookContainer.setAttribute("data-id", book.id); //stamp book id into its container

    removeBook.addEventListener("click", () => {
      let bookId = bookContainer.getAttribute("data-id");
      myLibrary = myLibrary.filter((item) => item.id != bookId); //creates a new array with every item that doesnt equal the id which then assigned back to the same array
      displayBook();
    });

    readBook.addEventListener("click", () => {
      let bookId = bookContainer.getAttribute("data-id");
      let index = myLibrary.findIndex((item) => item.id == bookId);
      myLibrary[index].changeRead();
      displayBook();
    });

    readBook.classList.add("checkbox");
    removeBook.classList.add("removeButton");
    buttonContainer.classList.add("buttonContainer");
    bookContainer.classList.add("bookContainer");
    isRead.classList.add("isRead");

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(isRead);
    buttonContainer.appendChild(removeBook);
    isRead.appendChild(readBook);
    container.appendChild(bookContainer);
    bookContainer.appendChild(buttonContainer);
  });
}
displayBook();
