'use strict';

// STYLES, ATTRIBUTES AND CLASSES

//
// Styles

// inline styles -> setted directly in DOM
message.style.backgroundColor = '#37383D';
message.style.width = '120%';

// only read setted inline styles
console.log(message.style.color); // defined into style sheet but not be found
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseInt(getComputedStyle(message).height, 10) + 30 + 'px';
console.log(getComputedStyle(message).height);

//changing style page setting property
document.documentElement.style.setProperty('--color-primary', 'orangered');

//
// Attributes

const logo = document.querySelector('.nav__logo');
//just work with html attributes, not custom attributes
console.log(logo.alt);
console.log('absolute path', logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// non standard
console.log(logo.myCustomAttribute);
console.log(logo.getAttribute('myCustomAttribute'));
console.log('relative path', logo.getAttribute('src'));
logo.setAttribute('myCustomAttribute2', 'Alexandre Halas programmatically way');

const link = document.querySelector('.nav__link--btn');
console.log('absolute path', link.href);
console.log('relative path', link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

//
// Classes

logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use -> this will override all the existing classes and just allow us to put only one class on element
//logo.className = 'halas';
