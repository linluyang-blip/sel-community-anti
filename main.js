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
  const animatedElements = document.querySelectorAll('.card, .timeline-item, .member-card');
  
  animatedElements.forEach((el, index) => {
    el.dataset.delay = (index % 3) * 150; 
    observer.observe(el);
  });
});

window.addEventListener('scroll', () => {
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
  }
});

// 使用 AJAX 背景送出表單，避免跳轉到 FormSubmit 預設的英文感謝畫面
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = '傳送中...';
    btn.disabled = true;

    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        alert('表單已成功送出！我們會盡快與您聯繫。');
        contactForm.reset();
      } else {
        alert('發生錯誤，請稍後再試。');
      }
    })
    .catch(error => {
      alert('發生錯誤，請稍後再試。');
    })
    .finally(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    });
  });
}

// Lightbox 展示邏輯
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

if (lightbox) {
  document.querySelectorAll('.timeline-img').forEach(img => {
    img.addEventListener('click', function() {
      lightbox.style.display = 'flex';
      // 延遲一點點讓 DOM 更新後再加 class 才能觸發漸變動畫
      setTimeout(() => lightbox.classList.add('show'), 10);
      lightboxImg.src = this.src;
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('show');
    // 動畫跑完再把 display 設為 none
    setTimeout(() => { lightbox.style.display = 'none'; }, 300);
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      closeLightbox();
    }
  });
}
