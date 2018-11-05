'use strict';
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    navToggle.classList.add('main-nav__toggle--open');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    navToggle.classList.remove('main-nav__toggle--open');
  }
});
