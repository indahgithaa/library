/* Page Elements */
const container = document.querySelector('.book-container');
const addBtn = document.querySelector('#addButton');
const allBtn = document.querySelector('#all-filter')
const favBtn = document.querySelector('#favorite-filter');

/* Book Form Elements */
const bTitle = document.querySelector('#book-title');
const bAuthor = document.querySelector('#author');
const bPages = document.querySelector('#pages');
const bStatus = document.querySelector('#status');

/* Modal Elements */
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('#closeButton');
const submit = document.querySelector('#submit-button');
const reset = document.querySelector('#reset-button');

/* ----- Library Functionalities start here ----- */
let myLibrary = [];

let favoriteBooks = [];

function Book(title, author, pages, readStatus, favorites) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.favorites = favorites;
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

function addBookToLibrary() {
    let book = new Book(bTitle.value, bAuthor.value, bPages.value, bStatus.checked);
    myLibrary.push(book);
    resetForm();
    displayBooks();
};

function resetForm() {
    bTitle.value = '';
    bPages.value = '';
    bAuthor.value = '';
    bStatus.checked = false;
    modal.style.display = "none";
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
        statusBtn.textContent = 'read';
        statusBtn.style.backgroundColor = 'var(--bit-green)';
        statusBtn.style.color = 'var(--page)';
    } else {
        statusBtn.textContent = 'not read';
    };

    const cover = document.createElement('img');
    cover.setAttribute('id', 'b-cover');
    cover.src = 'images/41903.jpg';

    const deleteBtn = document.createElement('img');
    deleteBtn.classList.add('deleteButton');
    deleteBtn.src = 'images/bin.png';

    const starBtn = document.createElement('img');
    starBtn.setAttribute('id', 'star');
    starBtn.src = item.favorites ? 'images/starred.png' : 'images/unstarred.png'

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

    /* FAVORITES FUNCTION */
    if (item.favorites == undefined || item.favorites == false) {
        item.favorites = false;
        starBtn.src = 'images/unstarred.png';
    };
 
     starBtn.onclick = () => {
        if (item.favorites == false) {
             starBtn.src = 'images/starred.png';
             item.favorites = true;
         } else {
             starBtn.src = 'images/unstarred.png';
             item.favorites = false;
         }

         item.favorites ? favoriteBooks.push(item) : favoriteBooks.splice(favoriteBooks.indexOf(item),  1);
    };

    /* DELETE FUNCTION */
    // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/hasFocus 
    // hasFocus() doesnt work.. let's use background color to indicate the focused section instead

    deleteBtn.addEventListener('click', () => {
        if (allBtn.style.backgroundColor == 'var(--other-font)') {
            console.log('delete activated in all books section');
            if (item.favorites) {
                favoriteBooks.splice(favoriteBooks.indexOf(item), 1);
                myLibrary.splice(myLibrary.indexOf(item), 1);
            } else {
                myLibrary.splice(myLibrary.indexOf(item), 1);
            };
            displayBooks();
        } else if (favBtn.style.backgroundColor == 'var(--other-font)') {
            console.log('delete activated in fav section');
            favoriteBooks.splice(favoriteBooks.indexOf(item), 1);
            myLibrary.splice(myLibrary.indexOf(item), 1);
            displayFavBooks();
        };
    });
};

function displayBooks() {
    container.innerHTML = '';
    for(let i = 0; i < myLibrary.length; i++) {
        createBookCard(myLibrary[i]);
    };
};

function displayFavBooks() {
    container.innerHTML = ''
    for(let i = 0; i < favoriteBooks.length; i++) {
        createBookCard(favoriteBooks[i]);
    };
};

/* MODAL INTERACTIONS */
addBtn.addEventListener('click', () => {
    modal.style.display = "block";
});

closeBtn.onclick = () => {
    modal.style.display = "none";
};

// https://stackoverflow.com/questions/37573608/how-to-make-modal-close-on-click-outside
window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    };
};

/* BUTTON INTERACTIONS */
function allFocus() {
    allBtn.style.backgroundColor = 'var(--other-font)';
    favBtn.style.backgroundColor = 'var(--bit-green)';
};

function favFocus() {
    favBtn.style.backgroundColor = 'var(--other-font)';
    allBtn.style.backgroundColor = 'var(--bit-green)';
};

submit.addEventListener('click', () => {
    addBookToLibrary();
});

allBtn.addEventListener('click', () => {
    displayBooks();
    allFocus();
});

favBtn.addEventListener('click', () => {
    displayFavBooks();
    favFocus();
});
