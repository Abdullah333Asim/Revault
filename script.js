// =========================
// Hero Slider Functionality
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slider .slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  const nextBtn = document.querySelector('.slider-control.next');
  const prevBtn = document.querySelector('.slider-control.prev');

  if (nextBtn && prevBtn && slides.length && dots.length) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(index);
      });
    });
  }

  // ===============================
  // Testimonials Slider Functionality
  // ===============================
  const testimonials = document.querySelectorAll('.testimonial');
  const nextTest = document.querySelector('.testi-control.next');
  const prevTest = document.querySelector('.testi-control.prev');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((testi) => testi.classList.remove('active'));
    testimonials[index].classList.add('active');
  }

  if (nextTest && prevTest && testimonials.length) {
    nextTest.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    });

    prevTest.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
    });
  }

  // ==========================
  // Favorite Heart Toggle
  // ==========================
  const favToggles = document.querySelectorAll('.fav-toggle');
  favToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      btn.innerHTML = btn.classList.contains('active') ? '♥' : '♡';
    });
  });

  // ==========================
  // Mobile Navigation Drawer
  // ==========================
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.overlay');
  const openBtn = document.querySelector('.nav-toggle');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-nav a');

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
  }

  if (openBtn && closeBtn && drawer && overlay) {
    openBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      overlay.classList.add('show');
      drawer.setAttribute('aria-hidden', 'false');
      overlay.setAttribute('aria-hidden', 'false');
    });

    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
  }
});

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

// Touch/swipe logic
let startX = 0;
let endX = 0;

const heroSection = document.querySelector('.hero');

heroSection.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

heroSection.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50; // minimum px to consider swipe
  if (startX - endX > threshold) {
    // Swipe left
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  } else if (endX - startX > threshold) {
    // Swipe right
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
}

// fade-in animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  });

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));