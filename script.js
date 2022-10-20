const modal = document.querySelector('.modal')
const addBtn = document.querySelector('#addButton')
const closeBtn = document.querySelector('#closeButton')

addBtn.addEventListener('click', () => {
    modal.style.display = "block"
})

function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove('modal')
}

closeBtn.onclick = () => {
    closeModal()
}

