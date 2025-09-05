document.addEventListener('DOMContentLoaded', () => {
  // ==========================
  // FORCE PAGE TO TOP
  // ==========================
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  window.addEventListener('pageshow', (e) => {
    if (
      e.persisted ||
      performance.getEntriesByType('navigation')[0]?.type === 'back_forward'
    ) {
      window.scrollTo(0, 0);
    }
  });

  // ==========================
  // HERO ANIMATION
  // ==========================
  gsap.set('.hero-content h1', { opacity: 0, y: 50 });
  gsap.to('.hero-content h1', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.2,
  });

  // ==========================
  // NAVBAR TOGGLE
  // ==========================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () =>
      navLinks.classList.toggle('active')
    );
  }

  // ==========================
  // PREVIEW MODAL
  // ==========================
  const preview = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-img');
  const closeBtn = document.getElementById('close-preview');
  const galleryItems = document.querySelectorAll('.gallery-item img');
  let activeImage = null;

  function openPreview(img) {
    activeImage = img;

    // Capture grid image rect
    const rect = img.getBoundingClientRect();

    // Set previewImg initial state
    previewImg.src = img.src;
    previewImg.style.position = 'fixed';
    previewImg.style.top = rect.top + 'px';
    previewImg.style.left = rect.left + 'px';
    previewImg.style.width = rect.width + 'px';
    previewImg.style.height = rect.height + 'px';
    previewImg.style.opacity = 1;
    previewImg.style.xPercent = 0;
    previewImg.style.yPercent = 0;
    previewImg.style.objectFit = 'contain';
    previewImg.style.borderRadius = '8px';

    // Show overlay
    preview.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Calculate modal target size (90% of viewport)
    const viewportW = window.innerWidth * 0.9;
    const viewportH = window.innerHeight * 0.9;
    const aspect = img.naturalWidth / img.naturalHeight;
    let targetW, targetH;
    if (viewportW / viewportH > aspect) {
      targetH = viewportH;
      targetW = targetH * aspect;
    } else {
      targetW = viewportW;
      targetH = targetW / aspect;
    }

    // Animate overlay fade in
    gsap.to(preview, { duration: 0.3, backgroundColor: 'rgba(0,0,0,0.9)' });

    // Animate image from grid to modal
    gsap.to(previewImg, {
      duration: 0.4,
      top: window.innerHeight / 2,
      left: window.innerWidth / 2,
      xPercent: -50,
      yPercent: -50,
      width: targetW,
      height: targetH,
      ease: 'power4.out',
    });
  }

  function closePreview() {
    if (!activeImage) return;

    // Animate image back to grid position
    const rect = activeImage.getBoundingClientRect();
    gsap.to(previewImg, {
      duration: 0.4,
      top: rect.top,
      left: rect.left,
      xPercent: 0,
      yPercent: 0,
      width: rect.width,
      height: rect.height,
      ease: 'power4.out',
      onComplete: () => {
        preview.classList.remove('active');
        previewImg.src = '';
        document.body.style.overflow = '';
        activeImage = null;
      },
    });

    // Animate overlay fade out
    gsap.to(preview, { duration: 0.6, backgroundColor: 'rgba(0,0,0,0)' });
  }

  // ==========================
  // EVENTS
  // ==========================
  galleryItems.forEach((img) =>
    img.addEventListener('click', () => openPreview(img))
  );
  closeBtn.addEventListener('click', closePreview);
  preview.addEventListener('click', (e) => {
    if (e.target === preview) closePreview();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePreview();
  });

  // Close modal on scroll
  window.addEventListener(
    'wheel',
    (e) => {
      if (preview.classList.contains('active')) {
        e.preventDefault();
        closePreview();
      }
    },
    { passive: false }
  );

  // ==========================
  // GALLERY ANIMATION
  // ==========================
  gsap.from('.gallery-item', {
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.gallery', start: 'top 80%' },
  });
});
