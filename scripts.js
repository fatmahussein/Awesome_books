/* eslint-disable max-classes-per-file */
// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;/* eslint-disable no-use-before-define */
    // JavaScript code for BookStore class and related functionality
    class BookStore {
      constructor() {
        this.titleInput = document.getElementById('title');
        this.authorInput = document.getElementById('author');
        this.addBtn = document.getElementById('add');
        this.books = [];
    
        this.addBtn.addEventListener('click', () => this.addNewBook());
        this.displayBooks();
    
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.showSection('list'); // Show the initial section
    
        this.navLinks.forEach((navLink) => {
          navLink.addEventListener('click', (event) => {
            event.preventDefault();
            const section = event.target.getAttribute('data-section');
            this.showSection(section);
          });
        });
      }
    
      displayBooks() {
        const booksList = document.getElementById('books');
        booksList.innerHTML = '';
        this.books.forEach((book, index) => {
          const row = document.createElement('tr');
    
          const titleCell = document.createElement('td');
          titleCell.textContent = `"${book.title}" by ${book.author}`;
          row.appendChild(titleCell);
    
          const removeCell = document.createElement('td');
          const removeBtn = document.createElement('button');
          removeBtn.textContent = 'Remove';
          removeBtn.classList.add('remove');
          removeCell.appendChild(removeBtn);
          row.appendChild(removeCell);
    
          booksList.appendChild(row);
    
          removeBtn.addEventListener('click', () => this.removeBook(index));
        });
      }
    
      addNewBook() {
        const title = this.titleInput.value;
        const author = this.authorInput.value;
    
        if (title && author) {
          const book = { title, author };
          this.books.push(book);
          localStorage.setItem('books', JSON.stringify(this.books));
          this.displayBooks();
          this.titleInput.value = '';
          this.authorInput.value = '';
        }
      }
    
      removeBook(index) {
        if (index >= 0 && index < this.books.length) {
          this.books.splice(index, 1);
          localStorage.setItem('books', JSON.stringify(this.books));
          this.displayBooks();
        }
      }
    
      showSection(sectionName) {
        this.sections.forEach((section) => {
          if (section.id === `${sectionName}-section`) {
            section.style.display = 'block';
          } else {
            section.style.display = 'none';
          }
        });
      }
    }
    
    const bookStore = new BookStore();
    
    // Retrieve books from local storage on page load
    window.addEventListener('load', () => {
      const storage = localStorage.getItem('books');
      if (storage) {
        bookStore.books = JSON.parse(storage);
        bookStore.displayBooks();
      }
    });
    
    // JavaScript code for date and time
    function formatDate(date) {
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      const formattedDate = date.toLocaleDateString(undefined, options);
    
      // Add ordinal indicator for the day
      const day = date.getDate();
      const ordinalIndicator = getOrdinalIndicator(day);
      const formattedDay = formattedDate.replace(/\b(\d+)\b/, `$1${ordinalIndicator}`);
    
      const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
    
      return `${formattedDay} ${time}`;
    }
    
    function getOrdinalIndicator(day) {
      if (day >= 11 && day <= 13) {
        return 'th';
      }
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }
    
    function updateTime() {
      const currentTimeElement = document.getElementById('current-time');
      const currentTime = new Date();
      currentTimeElement.textContent = formatDate(currentTime);
    }
    
    // Update the time every second
    setInterval(updateTime, 1000);
    
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Book Removed', 'success');
});