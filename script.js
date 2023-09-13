'use strict';

const header = document.querySelector('.header');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const allSections = document.querySelectorAll('.section');

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');

const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

const imagesTargets = document.querySelectorAll('img[data-src]');

const slides = document.querySelectorAll('.slide');

const btnSliderLeft = document.querySelector('.slider__btn--left');
const btnSliderRight = document.querySelector('.slider__btn--right');

const dots = document.querySelector('.dots');

// STARTS PAGE ON TOP
window.scrollTo(0, 0);

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

// REVEALING ELEMENTS ON SCROLL

const reviewSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserverOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
  reviewSections,
  sectionObserverOptions
);

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// LAZY LOADING IMAGES

const loadImages = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imagesObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: '200px',
};

const imagesObserver = new IntersectionObserver(
  loadImages,
  imagesObserverOptions
);

imagesTargets.forEach(image => imagesObserver.observe(image));

// SLIDER

let currentSlider = 0;
const maxSlider = slides.length - 1;

slides.forEach(
  (slide, index) => (slide.style.transform = `translateX(${index * 100}%)`)
);

const moveToSlide = function (currentSlider) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${(index - currentSlider) * 100}%)`)
  );
  activateDot(currentSlider);
};

const previousSlide = function () {
  currentSlider <= 0 ? (currentSlider = maxSlider) : currentSlider--;
  moveToSlide(currentSlider);
};

const nextSlide = function () {
  currentSlider >= maxSlider ? (currentSlider = 0) : currentSlider++;
  moveToSlide(currentSlider);
};

const createDots = function () {
  slides.forEach(function (_, index) {
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(slide => slide.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const initSlider = function () {
  createDots();
  activateDot(0);
};

initSlider();

btnSliderRight.addEventListener('click', nextSlide);

btnSliderLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    previousSlide();
  }
  if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    moveToSlide(slide);
  }
});

// LIFECYCLE DOM EVENTS

/**
 * The DOMContentLoaded event fires when the HTML document has been completely parsed,
 * and all deferred scripts (<script defer src="…"> and <script type="module">) have downloaded and executed.
 * It doesn't wait for other things like images, subframes, and async scripts to finish loading.
 */
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree build!');
});

/**
 *  The load event is fired when the whole page has loaded,
 *  including all dependent resources such as stylesheets, scripts, iframes, and images.
 *  This is in contrast to DOMContentLoaded, which is fired as soon as the page DOM has been loaded,
 *  without waiting for resources to finish loading.
 *
 *  This event is not cancelable and does not bubble.
 */
window.addEventListener('load', function (e) {
  console.log('Page fully loaded!');
});

/**
 * The beforeunload event is fired when the window, the document and its resources are about to be unloaded.
 * The document is still visible and the event is still cancelable at this point.
 *
 * This event enables a web page to trigger a confirmation dialog asking the user if they really want to leave the page.
 * If the user confirms, the browser navigates to the new page, otherwise it cancels the navigation.
 */
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});
