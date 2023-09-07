'use strict';

// TYPES OF EVENTS AND EVENT HANDLERS

const h1 = document.querySelector('h1');

// old school way
// h1.onmouseenter = function (e) {
//   alert('onmouseenter');
// };

// the best way
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener mouseenter');
// });

const alertH1 = function (e) {
  alert('addEventListener mouseenter');
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);
