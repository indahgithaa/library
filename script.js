/* WHAT TO DO:
1. receive value from each form inside the modals.
2. store the form values inside the constructors using new keyword 
3. push the book data to the array.
4. create card and the book's elements, give data attributes for each.
5. append each card to container.
features:
- sort (date, read, not read, favorites)
- delete book
- reset books/container */

/* Book Elements */
const container = document.querySelector('.book-container')
const bTitle = document.querySelector('#book-title')
const bAuthor = document.querySelector('#author')
const bPages = document.querySelector('#pages')
const bStatus = document.querySelector('#status')

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

Book.prototype.getTitle = function() {
    return this.title
}

Book.prototype.getAuthor = function() {
    return this.author
}

Book.prototype.getPage = function() {
    return this.pages + " pages"
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
    let book = new Book(bTitle.value, bAuthor.value, bPages.value, bStatus.checked)
    myLibrary.push(book)
    createCard(book)
}

function createCard(item) {
    const title = document.createElement('h3')
    title.setAttribute('id', 'b-title')
    title.textContent = item.getTitle()

    const author = document.createElement('p')
    author.setAttribute('id', 'b-author')
    author.textContent = item.getAuthor()

    const pages = document.createElement('p')
    pages.setAttribute('id', 'b-pages')
    pages.textContent = item.getPage()

    const statusBtn = document.createElement('button')
    statusBtn.setAttribute('id', 'b-status')
    statusBtn.textContent = bStatus.checked ? 'read' : 'not read'

    if (statusBtn.textContent == "read") {
        statusBtn.style.backgroundColor = 'var(--bit-green)'
        statusBtn.style.color = 'var(--page)'
    } else {
        statusBtn.style.backgroundColor = 'var(--page)'
        statusBtn.style.color = 'var(--other-font)'
    }

    const cover = document.createElement('img')
    cover.setAttribute('id', 'b-cover')
    cover.src = 'images/41903.jpg'

    const bookInfo = document.createElement('div')
    bookInfo.classList.add('bookInfo')

    bookInfo.appendChild(title)
    bookInfo.appendChild(author)
    bookInfo.appendChild(pages)


    const card = document.createElement('div')
    card.classList.add('card')
    card.appendChild(cover)
    card.appendChild(bookInfo)
    card.appendChild(statusBtn)

    container.appendChild(card)
}

submit.addEventListener('click', () => {
    addBookToLibrary()
    console.log(myLibrary)
    console.log(bStatus.checked)
    bTitle.value = ''
    bPages.value = ''
    bAuthor.value = ''
    bStatus.checked =  false
    modal.style.display = "none"
})