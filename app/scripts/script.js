
//mini-dropdown
const icon = document.querySelector('.box__wrapper .input-dropdowns .right-inner .init_icon.active');
console.log(icon);
const block = document.querySelector('.box__wrapper__input');
console.log(block);


icon.addEventListener('click', () => {
    block.classList.toggle('d-none');
})

