// main.js
document.addEventListener('DOMContentLoaded', function () {
  // ---------- Helpers ----------
  function getRuntimeScrollbarWidth() {
    // Measures current scrollbar width
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function setScrollLock(lock) {
    // Write CSS variable first (prevents flick)
    const w = getRuntimeScrollbarWidth();
    document.documentElement.style.setProperty('--scrollbar-w', w + 'px');

    if (lock) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      document.documentElement.style.removeProperty('--scrollbar-w');
    }
  }

  // ---------- GSAP Hero Animations ----------
  if (window.gsap) {
    try {
      if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
      gsap.from('.hero-title', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
      });
      gsap.from('.hero-subtitle', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out',
      });
    } catch (e) {}
  }

  // ---------- Navbar scroll state ----------
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ---------- Mobile menu ----------
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksEl = document.querySelector('.nav-links');

  function openMobileNav() {
    if (!navLinksEl || !menuToggle) return;
    navLinksEl.classList.add('active');
    menuToggle.classList.add('open');
    setScrollLock(true);
    if (window.gsap) {
      gsap.fromTo(
        '.nav-links li',
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.35, ease: 'power2.out' }
      );
    }
  }
  function closeMobileNav() {
    if (!navLinksEl || !menuToggle) return;
    navLinksEl.classList.remove('active');
    menuToggle.classList.remove('open');
    setScrollLock(false);
  }

  if (menuToggle && navLinksEl) {
    menuToggle.addEventListener('click', () => {
      navLinksEl.classList.contains('active')
        ? closeMobileNav()
        : openMobileNav();
    });
    navLinksEl.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        if (navLinksEl.classList.contains('active')) closeMobileNav();
      });
    });
  }
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      navLinksEl &&
      navLinksEl.classList.contains('active')
    ) {
      closeMobileNav();
    }
  });

  // ---------- Image Preview Modal ----------
  const preview = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-img');
  const closeBtn = document.getElementById('close-preview');

  if (preview && previewImg && closeBtn) {
    preview.classList.remove('hidden');

    function openPreview(src) {
      previewImg.src = src;
      setScrollLock(true);
      preview.classList.add('show');
    }

    function closePreview() {
      preview.classList.remove('show');
      setTimeout(() => {
        setScrollLock(false);
        previewImg.src = '';
      }, 300); // match CSS transition duration
    }

    document.querySelectorAll('.gallery-item img').forEach((img) => {
      img.addEventListener('click', () => openPreview(img.src));
    });

    closeBtn.addEventListener('click', closePreview);

    preview.addEventListener('click', (e) => {
      if (e.target === preview) closePreview();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && preview.classList.contains('show'))
        closePreview();
    });
  }
  // ---------- Dynamic top shadow ----------
  const maxShadow = 1.0; // max opacity
  const fadeHeight = 150; // pixels scrolled before full fade

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    let opacity = Math.min(scrollY / fadeHeight, 1) * maxShadow;
    document.documentElement.style.setProperty('--top-shadow-opacity', opacity);
  });
});
