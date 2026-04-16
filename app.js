// nav scroll state
const nav = document.getElementById('nav');
const setNav = () => nav.classList.toggle('scrolled', window.scrollY > 30);
setNav();
window.addEventListener('scroll', setNav, { passive: true });

// mobile menu
const burger = document.getElementById('burger');
const overlay = document.getElementById('overlay');

const openMenu = () => {
  overlay.classList.add('open');
  document.body.classList.add('menu-open');
};
const closeMenu = () => {
  overlay.classList.remove('open');
  document.body.classList.remove('menu-open');
};

burger.addEventListener('click', () => {
  overlay.classList.contains('open') ? closeMenu() : openMenu();
});
overlay
  .querySelectorAll('[data-close]')
  .forEach((a) => a.addEventListener('click', closeMenu));

// закриваємо меню при зміні вьюпорта на десктоп
window.addEventListener('resize', () => {
  if (window.innerWidth > 1000 && overlay.classList.contains('open')) {
    closeMenu();
  }
});

// esc теж закриває
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
});

// FAQ accordion
document.querySelectorAll('.faq-item__q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-item__a');
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-item').forEach((i) => {
      i.classList.remove('open');
      i.querySelector('.faq-item__a').style.maxHeight = null;
    });
    // open clicked
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// smooth scroll for anchor links (native works, but add offset for sticky nav)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      const el = document.querySelector(id);
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
