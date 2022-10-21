/* WHAT TO DO:
1. receive value from each form inside the modals.
2. store the form values inside the constructors using new keyword 
3. create card and the book's elements, give data attributes for each.
4. append each card to container through loops.
features:
- sort (date, read, not read, favorites)
- reset books/container */


/* Book Elements */
const container = document.querySelector('.book-container')
const bookTitle = document.querySelector('#book-title')
const bookAuthor = document.querySelector('#author')
const bookPages = document.querySelector('#pages')
const bookStatus = document.querySelector('#status-name')

/* Modal Elements */
const modal = document.querySelector('.modal')
const addBtn = document.querySelector('#addButton')
const closeBtn = document.querySelector('#closeButton')
const submit = document.querySelector('#submit-button')
const reset = document.querySelector('#reset-button')

/* ----- Library Functionalities start here ----- */
let myLibrary = []

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.read = function() {
    if (this.status === "read") {
        this.status = "read"
    } else if (this.status === "unread") {
        this.status = "not read"
    }
}

// display modal
addBtn.addEventListener('click', () => {
    modal.style.display = "block"
})

//close modal

closeBtn.onclick = () => {
    modal.style.display = "none"
}

/* Allow users to close the modal from everywhere: https://stackoverflow.com/questions/37573608/how-to-make-modal-close-on-click-outside */
window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = "none"
    }
}


