/* Book Elements */
const container = document.querySelector('.book-container');
const bTitle = document.querySelector('#book-title');
const bAuthor = document.querySelector('#author');
const bPages = document.querySelector('#pages');
const bStatus = document.querySelector('#status');

/* Modal Elements */
const modal = document.querySelector('.modal');
const addBtn = document.querySelector('#addButton');
const closeBtn = document.querySelector('#closeButton');
const submit = document.querySelector('#submit-button');
const reset = document.querySelector('#reset-button');

/* ----- Library Functionalities start here ----- */
let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
};

Book.prototype.getTitle = function() {
    return this.title;
};

Book.prototype.getAuthor = function() {
    return this.author;
};

Book.prototype.getPage = function() {
    return this.pages + " pages";
};

// display modal
addBtn.addEventListener('click', () => {
    modal.style.display = "block";
});

//close modal
closeBtn.onclick = () => {
    modal.style.display = "none";
};

// Allow users to close the modal from outside
window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    };
};

function addBookToLibrary() {
    let book = new Book(bTitle.value, bAuthor.value, bPages.value, bStatus.checked);
    myLibrary.push(book);
    resetForm();
    displayBooks();
};

function displayBooks() {
    container.innerHTML = '';
    for(let i = 0; i < myLibrary.length; i++) {
        createBookCard(myLibrary[i]);
    };
};

function resetForm() {
    bTitle.value = ''
    bPages.value = ''
    bAuthor.value = ''
    bStatus.checked = false
    modal.style.display = "none"
};

function createBookCard(item) {
    const title = document.createElement('h3');
    title.setAttribute('id', 'b-title');
    title.textContent = item.getTitle();

    const author = document.createElement('p');
    author.setAttribute('id', 'b-author');
    author.textContent = item.getAuthor();

    const pages = document.createElement('p');
    pages.setAttribute('id', 'b-pages');
    pages.textContent = item.getPage();

    const statusBtn = document.createElement('button');
    statusBtn.setAttribute('id', 'b-status');

    if (item.readStatus) {
        statusBtn.textContent = 'read'
        statusBtn.style.backgroundColor = 'var(--bit-green)'
        statusBtn.style.color = 'var(--page)'
    } else {
        statusBtn.textContent = 'not read'
    }

    const cover = document.createElement('img');
    cover.setAttribute('id', 'b-cover');
    cover.src = 'images/41903.jpg';

    const deleteBtn = document.createElement('img');
    deleteBtn.classList.add('deleteButton');
    deleteBtn.src = 'images/bin.png';

    const starBtn = document.createElement('img');
    starBtn.setAttribute('id', 'star');
    starBtn.src = 'images/star.png';

    const bookInfo = document.createElement('div');
    bookInfo.classList.add('bookInfo');

    bookInfo.appendChild(title);
    bookInfo.appendChild(author);
    bookInfo.appendChild(pages);

    const card = document.createElement('div');
    card.classList.add('cardStyle');
    card.appendChild(cover);
    card.appendChild(bookInfo);
    card.appendChild(statusBtn);
    card.appendChild(deleteBtn);
    card.appendChild(starBtn);

    container.appendChild(card);

    /* DELETE FUNCTION */
    deleteBtn.onclick = () => {
        let selectedBook = myLibrary.indexOf(item);

        myLibrary.splice(selectedBook, 1);
        displayBooks();
        console.log(myLibrary);
    }
}

submit.addEventListener('click', () => {
    addBookToLibrary();
    console.log(myLibrary);
});