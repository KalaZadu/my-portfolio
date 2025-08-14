// Wait for DOM content loaded
document.addEventListener('DOMContentLoaded', function () {
  // Helper: Calculate scrollbar width (used for locking scroll on modal/menu)
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

  // GSAP Animation Setup
  gsap.registerPlugin(ScrollTrigger);

  // Animate hero title
  gsap.from('.hero-title', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
  });

  // Animate hero subtitle with delay
  gsap.from('.hero-subtitle', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out',
  });

  // Navbar scroll background change
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksEl = document.querySelector('.nav-links');

  function openMobileNav() {
    if (!navLinksEl || !menuToggle) return;
    navLinksEl.classList.add('active');
    menuToggle.classList.add('open');

    // Lock scroll and compensate for scrollbar
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // Animate nav links fade in
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

    // Restore scroll
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  // Toggle mobile menu on button click
  if (menuToggle && navLinksEl) {
    menuToggle.addEventListener('click', () => {
      if (navLinksEl.classList.contains('active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  // Close mobile nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      navLinksEl &&
      navLinksEl.classList.contains('active')
    ) {
      closeMobileNav();
    }
  });

  // Close mobile nav when clicking a nav link
  if (navLinksEl) {
    navLinksEl.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        if (navLinksEl.classList.contains('active')) closeMobileNav();
      });
    });
  }

  // Image Preview Modal Logic
  const preview = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-img');
  const closeBtn = document.getElementById('close-preview');

  if (preview && previewImg) {
    // Open image preview on gallery image click
    document.querySelectorAll('.gallery-item img').forEach((img) => {
      img.addEventListener('click', () => {
        previewImg.src = img.src;
        preview.classList.add('show');

        // Lock scroll & compensate for scrollbar
        const scrollbarWidth = getScrollbarWidth();
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      });
    });

    // Close preview on close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        preview.classList.remove('show');
        setTimeout(() => {
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
        }, 500); // Match CSS fade duration
      });
    }

    // Close preview when clicking outside the image
    preview.addEventListener('click', (e) => {
      if (e.target === preview) {
        preview.classList.remove('show');
        setTimeout(() => {
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
        }, 500);
      }
    });
  }
});
