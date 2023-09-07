'use strict';

// SELECTING, CREATING AND DELETING ELEMENTS

// Selecting Elements

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
console.log(header);

const allSections = document.querySelectorAll('.section');
console.log(allSections);

console.log(document.getElementById('section--1'));
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating Elements

/*
document
  .querySelector('.section__description')
  .insertAdjacentHTML('afterend', '<h2 class="section__description">:)</h2>');
*/

const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent('We use cookied to improved functionality and analytics.');
message.innerHTML =
  'We use cookied to improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//header.prepend(message);
header.append(message);
//header.append(message.cloneNode(true));

//header.before(message);
header.after(message);

// Deleting Elements

const btnCloseCookie = document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    //message.remove();
    message.parentElement.removeChild(message);
  });
