// main.js
document.addEventListener('DOMContentLoaded', function () {
  // ---------- Helper: Get scrollbar width ----------
  function getScrollbarWidth() {
    const scrollDiv = document.createElement('div');
    scrollDiv.style.visibility = 'hidden';
    scrollDiv.style.overflow = 'scroll';
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    scrollDiv.style.width = '50px';
    scrollDiv.style.height = '50px';
    document.body.appendChild(scrollDiv);

    const innerDiv = document.createElement('div');
    innerDiv.style.width = '100%';
    scrollDiv.appendChild(innerDiv);

    const scrollbarWidth = scrollDiv.offsetWidth - innerDiv.offsetWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }

  // ---------- GSAP Hero Animations ----------
  gsap.registerPlugin(ScrollTrigger);

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

  // ---------- Navbar Scroll + Mobile Menu ----------
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksEl = document.querySelector('.nav-links');

  // Smooth navbar background + padding transition
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  function openMobileNav() {
    if (!navLinksEl || !menuToggle) return;
    navLinksEl.classList.add('active');
    menuToggle.classList.add('open');

    const scrollbarWidth = getScrollbarWidth();
    document.body.classList.add('modal-open');
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    gsap.fromTo(
      '.nav-links li',
      { y: -8, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.04, duration: 0.35, ease: 'power2.out' }
    );
  }

  function closeMobileNav() {
    if (!navLinksEl || !menuToggle) return;
    navLinksEl.classList.remove('active');
    menuToggle.classList.remove('open');

    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '';
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
    function openPreview(imgSrc) {
      previewImg.src = imgSrc;
      preview.classList.add('show');

      // Lock scroll without flick
      const scrollbarWidth = getScrollbarWidth();
      document.documentElement.style.setProperty(
        '--scrollbar-width',
        `${scrollbarWidth}px`
      );
      document.body.classList.add('modal-open');
    }

    function closePreview() {
      preview.classList.remove('show');
      previewImg.src = '';
      document.body.classList.remove('modal-open');
    }

    // Open preview on image click
    document.querySelectorAll('.gallery-item img').forEach((img) => {
      img.addEventListener('click', () => openPreview(img.src));
    });

    // Close preview on close button
    closeBtn.addEventListener('click', closePreview);

    // Close preview if clicking outside image
    preview.addEventListener('click', (e) => {
      if (e.target === preview) closePreview();
    });

    // Close preview on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && preview.classList.contains('show'))
        closePreview();
    });
  }
});
