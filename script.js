document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slider .slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const nextBtn = document.querySelector('.slider-control.next');
  const prevBtn = document.querySelector('.slider-control.prev');
  let currentSlide = 0;

  function showSlide(index) {
  const slider = document.querySelector('.hero-slider');
  const slide = document.querySelector('.hero-slider .slide');

  if (!slide || !slider) return;

  const slideWidth = slide.offsetWidth;
  slider.style.transform = `translateX(-${index * slideWidth}px)`;

  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}



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

  // ✅ Swipe logic (INSIDE DOMContentLoaded)
  let startX = 0;
  let endX = 0;
  const heroSection = document.querySelector('.hero-slider');

  if (heroSection) {
    heroSection.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    heroSection.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const threshold = 50; // minimum px to consider swipe
    if (startX - endX > threshold) {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    } else if (endX - startX > threshold) {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
  }

  // Favorite toggle
  const favToggles = document.querySelectorAll('.fav-toggle');
  favToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      btn.innerHTML = btn.classList.contains('active') ? '♥' : '♡';
    });
  });

  // Drawer toggle
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

  // Fade-in animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  });

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
});
