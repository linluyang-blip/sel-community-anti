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
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  
  if (scrollProgress) {
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
  }

  // Back to Top Button visibility
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    if (winScroll > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
});

// Toast Notification System
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.dataset.type = type;
  toast.innerText = message;
  container.appendChild(toast);
  
  // Trigger reflow for animation
  toast.offsetHeight;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400); // Wait for transition
  }, 3500);
}

// Back to Top functionality
document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// 使用 AJAX 背景送出表單，避免跳轉到 FormSubmit 預設的英文感謝畫面
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic Client-side Validation Checks
    if (!contactForm.checkValidity()) {
      showToast('請正確填寫所有必填欄位', 'error');
      return;
    }

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
        showToast('表單已成功送出！我們會盡快與您聯繫。', 'success');
        contactForm.reset();
      } else {
        showToast('發生錯誤，請重新確認後再試。', 'error');
      }
    })
    .catch(error => {
      showToast('發生錯誤，請檢查網路連線。', 'error');
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
  let images = [];
  let currentIndex = 0;

  const timelineImages = document.querySelectorAll('.timeline-img');
  timelineImages.forEach((img, index) => {
    images.push(img.src);
    img.addEventListener('click', function() {
      currentIndex = index;
      lightbox.style.display = 'flex';
      // 延遲一點點讓 DOM 更新後再加 class 才能觸發漸變動畫
      setTimeout(() => lightbox.classList.add('show'), 10);
      lightboxImg.src = this.src;
      updateLightboxNav();
    });
  });

  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  const updateLightboxNav = () => {
    if (images.length <= 1) {
      if(prevBtn) prevBtn.style.display = 'none';
      if(nextBtn) nextBtn.style.display = 'none';
      return;
    }
    if(prevBtn) prevBtn.style.display = 'flex';
    if(nextBtn) nextBtn.style.display = 'flex';
  };

  if(prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (images.length > 0) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
      }
    });
  }

  if(nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (images.length > 0) {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
      }
    });
  }

  const closeLightbox = () => {
    lightbox.classList.remove('show');
    // 動畫跑完再把 display 設為 none
    setTimeout(() => { lightbox.style.display = 'none'; }, 300);
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn && !(prevBtn && prevBtn.contains(e.target)) && !(nextBtn && nextBtn.contains(e.target))) {
      closeLightbox();
    }
  });
}
