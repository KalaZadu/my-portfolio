document.addEventListener('DOMContentLoaded', () => {
  // ========================================
  // FORCE PAGE TO TOP ON RELOAD / BACK-FORWARD
  // ========================================
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  // Force page to top immediately
  window.scrollTo(0, 0);

  window.addEventListener('pageshow', (event) => {
    if (
      event.persisted ||
      performance.getEntriesByType('navigation')[0]?.type === 'back_forward'
    ) {
      window.scrollTo(0, 0);
    }
  });

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  function openMobileNav() {
    navLinks.classList.add('active');
    menuToggle.classList.add('open');
  }

  function closeMobileNav() {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('open');
  }

  menuToggle?.addEventListener('click', () => {
    navLinks.classList.contains('active') ? closeMobileNav() : openMobileNav();
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) closeMobileNav();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active'))
      closeMobileNav();
  });

  // ========================================
  // GALLERY IMAGE PREVIEW
  // ========================================
  const preview = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-img');
  const closeBtn = document.getElementById('close-preview');
  const galleryItems = document.querySelectorAll('.gallery-item img');

  function openPreview(src) {
    previewImg.src = src;
    preview.classList.add('show');
    document.body.classList.add('scroll-lock'); // Lock scroll
  }

  function closePreview() {
    preview.classList.remove('show');
    document.body.classList.remove('scroll-lock'); // Unlock scroll
  }

  galleryItems.forEach((img) => {
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

  document.addEventListener('wheel', () => {
    if (preview.classList.contains('show')) closePreview();
  });

  // ========================================
  // GSAP ANIMATIONS
  // ========================================
  window.addEventListener('load', () => {
    if (window.gsap) {
      // Smooth hero animation
      gsap.to('.hero-content h1', {
        y: 0,
        opacity: 1,
        duration: 1.5, // longer duration for smoothness
        ease: 'power3.out',
        delay: 0.1, // tiny delay ensures browser paints
      });

      // Gallery items animation
      gsap.from('.gallery-item', {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gallery',
          start: 'top 80%',
        },
      });
    }
  });
});
