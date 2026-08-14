const slides = [...document.querySelectorAll('.hero-slide')];
const dots = document.querySelector('.dots');
const indexEl = document.querySelector('.hero-index span');
let current = 0;
let timer;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `切换到第 ${i + 1} 张`);
  dot.addEventListener('click', () => showSlide(i));
  dots.appendChild(dot);
});

function showSlide(next) {
  current = (next + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
  [...dots.children].forEach((dot, i) => dot.classList.toggle('active', i === current));
  indexEl.textContent = String(current + 1).padStart(2, '0');
  clearInterval(timer);
  timer = setInterval(() => showSlide(current + 1), 6500);
}
document.querySelector('.prev').addEventListener('click', () => showSlide(current - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(current + 1));
showSlide(0);

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menu.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open'); nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.filter-tabs button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-tabs button').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
  });
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('revealed');
}), { threshold: .12 });
document.querySelectorAll('section:not(.hero), .project-card').forEach(el => { el.classList.add('reveal'); observer.observe(el); });
