'use strict';

// DOM TRAVERSING -> select elements relative of another elements

const h1 = document.querySelector('h1');
console.log(h1);

// Going downwards: select children
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'gray';

// Going upwards: select parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Going sidways: select siblings
console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(child => {
  if (child !== h1) {
    child.style.transform = 'scale(0.5)';
  }
});
