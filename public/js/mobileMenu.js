const burger = document.querySelector('.bi');
const menu = document.querySelector('nav');

burger.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('menu-show');
    burger.classList.toggle('bi-list');
    burger.classList.toggle('bi-x-lg');
});

document.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.remove('menu-show');
    burger.classList.remove('bi-x-lg');
    burger.classList.add('bi-list');
});