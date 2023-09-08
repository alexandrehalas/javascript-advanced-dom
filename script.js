'use strict';

const header = document.querySelector('.header');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');

const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

// MODAL WINDOW

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// BUTTON SCROLL TO

btnScrollTo.addEventListener('click', () =>
  section1.scrollIntoView({ behavior: 'smooth' })
);

// PAGE NAVIGATION

const navigateSmooth = function (e) {
  e.preventDefault();
  // matching strategy
  if (!e.target.classList.contains('nav__link')) return;
  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
};

// Attached same event for multiples elements
navLinks.addEventListener('click', navigateSmooth);

// TABBED COMPONENT

const tabClick = e => {
  const clickedTab = e.target.closest('.operations__tab');

  // Guard clause
  if (!clickedTab) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedTab.classList.add('operations__tab--active');

  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
};

tabContainer.addEventListener('click', tabClick);

// MENU FADE ANIMATION

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const navLinkSelected = e.target;
    const navLinks = navLinkSelected
      .closest('.nav')
      .querySelectorAll('.nav__link');
    const logo = navLinkSelected.closest('.nav').querySelector('img');

    navLinks.forEach(navLink => {
      if (navLink !== navLinkSelected) {
        navLink.style.opacity = this.opacity;
      }
    });

    logo.style.opacity = this.opacity;
  }
};

nav.addEventListener('mouseover', handleHover.bind({ opacity: 0.5 }));

nav.addEventListener('mouseout', handleHover.bind({ opacity: 1 }));

// STICKY NAVIGATION

const stickNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: `${-nav.getBoundingClientRect().height}px`,
};
const headerObserver = new IntersectionObserver(
  stickNav,
  headerObserverOptions
);
headerObserver.observe(header);
