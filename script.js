let myLibrary = [];
const container = document.querySelector(".card-container");
const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".addBookBtn");
const closeBtn = document.querySelector(".closeBtn");
const form = document.querySelector("form");
const checkbox = document.querySelector(".checkbox");
// const removeButton = document.querySelector(".removeButton");

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
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.read = read;
  }
}
Book.prototype.changeRead = function () {
  this.read = !this.read;
};
function addBookToLibrary() {
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
}
addBookToLibrary();
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
