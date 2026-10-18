const myLibrary = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: "180 pages",
    id: crypto.randomUUID(),
    read: false,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: "384 pages",
    id: crypto.randomUUID(),
    read: false,
  },
  {
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    pages: "416 pages",
    id: crypto.randomUUID(),
    read: true,
  },
];
const container = document.querySelector(".card-container");
const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".addBookBtn");
const closeBtn = document.querySelector(".closeBtn");
const form = document.querySelector("form");
const checkbox = document.querySelector(".checkbox");
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
function displayBook() {
  container.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookContainer = document.createElement("div");
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");
    bookContainer.classList.add("bookContainer");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const removeBook = document.createElement("button");
    removeBook.classList.add("removeButton");
    const readBook = document.createElement("button");
    readBook.classList.add("readButton");
    const isRead = document.createElement("p");
    title.textContent = `Title: ${book.title}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;
    isRead.textContent = book.read ? "Read: Yes" : "Read: No";
    removeBook.textContent = "Remove";
    readBook.textContent = "Read";
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(isRead);
    buttonContainer.appendChild(removeBook);
    buttonContainer.appendChild(readBook);
    container.appendChild(bookContainer);
    bookContainer.appendChild(buttonContainer);
  });
}
displayBook();
