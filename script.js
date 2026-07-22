const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const propertyMain = document.querySelector('#property-main');
document.querySelectorAll('.thumbnails button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.thumbnails button').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  propertyMain.src = button.dataset.image;
  propertyMain.alt = button.dataset.alt;
}));

document.querySelectorAll('.accordions article button').forEach(button => button.addEventListener('click', () => {
  const item = button.closest('article');
  const willOpen = !item.classList.contains('open');
  document.querySelectorAll('.accordions article').forEach(article => article.classList.remove('open'));
  item.classList.toggle('open', willOpen);
}));

const galleryImages = [...document.querySelectorAll('.gallery-stage img')];
let galleryIndex = 0;
function showGallery(index) {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  galleryImages.forEach((image, i) => image.classList.toggle('active', i === galleryIndex));
  document.querySelector('.gallery-controls span').textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(galleryImages.length).padStart(2, '0')}`;
}
document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => showGallery(galleryIndex + (button.dataset.gallery === 'next' ? 1 : -1))));

const testimonials = [...document.querySelectorAll('.testimonial-track blockquote')];
let testimonialIndex = 0;
function showTestimonial(index) {
  testimonialIndex = (index + testimonials.length) % testimonials.length;
  testimonials.forEach((quote, i) => quote.classList.toggle('active', i === testimonialIndex));
}
document.querySelectorAll('[data-testimonial]').forEach(button => button.addEventListener('click', () => showTestimonial(testimonialIndex + (button.dataset.testimonial === 'next' ? 1 : -1))));

document.querySelector('#visit-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Apex Studio visit request from ${data.get('name')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nPhone: ${data.get('phone')}\n\nMessage: ${data.get('message') || 'I would like to schedule a visit.'}`);
  document.querySelector('.form-note').textContent = 'Opening your email app with the visit details…';
  window.location.href = `mailto:contact@projectmonet.space?subject=${subject}&body=${body}`;
});
