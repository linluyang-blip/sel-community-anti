import './style.css';

// Intersection Observer for scroll animations (fade in elements smoothly)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Calculate delay if assigned (for staggered grid items)
      const delay = entry.target.dataset.delay || 0;
      entry.target.style.transitionDelay = `${delay}ms`;
      observer.unobserve(entry.target); 
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  // Select cards and timeline items for staggered animation
  const cards = document.querySelectorAll('.card');
  cards.forEach((el, index) => {
    el.dataset.delay = (index % 3) * 150; 
    observer.observe(el);
  });

  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((el, index) => {
    el.dataset.delay = 100;
    observer.observe(el);
  });

  const memberCards = document.querySelectorAll('.member-card');
  memberCards.forEach((el, index) => {
    el.dataset.delay = (index % 4) * 150;
    observer.observe(el);
  });
});
