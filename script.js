/* WHAT TO DO:
1. receive value from each form inside the modals.
2. store the form values inside the constructors using new keyword 
3. push the book data to the array.
4. create card and the book's elements, give data attributes for each.
5. append each card to container through loops.
features:
- sort (date, read, not read, favorites)
- reset books/container */

/* Book Elements */
const container = document.querySelector('.book-container')
const bTitle = document.querySelector('#book-title')
const bAuthor = document.querySelector('#author')
const bPages = document.querySelector('#pages')
const bStatus = document.querySelector('#status-name')

/* Modal Elements */
const modal = document.querySelector('.modal')
const addBtn = document.querySelector('#addButton')
const closeBtn = document.querySelector('#closeButton')
const submit = document.querySelector('#submit-button')
const reset = document.querySelector('#reset-button')

/* ----- Library Functionalities start here ----- */
let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
};

Book.prototype.titleInfo = function() {
    this.title = bTitle.value;
    return this.title;
};

Book.prototype.authorInfo = function() {
    this.author = bAuthor.value;
    return this.author;
};

Book.prototype.pagesInfo = function() {
    this.pages = bPages.value;
    return this.pages;
}

Book.prototype.readInfo = function() {
    if (bStatus.checked) {
        this.readStatus = "read"
    } else {
        this.readStatus = "not read"
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

// Allow users to close the modal from everywhere: https://stackoverflow.com/questions/37573608/how-to-make-modal-close-on-click-outside 
window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = "none"
    }
}

function addBookToLibrary() {
    const book = new Book(bTitle.value, bAuthor.value, bPages.value, bStatus.value)
    myLibrary.push(book)
}

submit.addEventListener('click', () => {
    addBookToLibrary()
    console.log(myLibrary)
})


