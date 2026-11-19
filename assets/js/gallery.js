/**
 * gallery.js
 * Galería fotográfica interactiva con visor Lightbox accesible,
 * soporte de teclado (Escape, Flechas) y gestos táctiles (swipe).
 */
const GALLERY_ITEMS = [
  {
    src: 'assets/images/galeria/galeria-01.webp',
    alt: 'Ceviche de pescado fresco con cebolla roja, yuca, cancha tostada y bebida refrescante',
    caption: 'Ceviche de Pescado Clásico y Bebida Cítrica — Restaurante M&M'
  },
  {
    src: 'assets/images/galeria/galeria-02.webp',
    alt: 'Comensales compartiendo platos criollos y refrescos en el salón de Restaurante M&M',
    caption: 'Salón Principal — Restaurante M&M «El Templo del Sabor»'
  },
  {
    src: 'assets/images/galeria/galeria-03.webp',
    alt: 'Ceviche Mixto oficial de Restaurante Cevichería M&M con ají limo y cancha crocante',
    caption: 'Ceviche Mixto — Pesca y mariscos frescos en cortes precisos'
  },
  {
    src: 'assets/images/galeria/galeria-04.webp',
    alt: 'Lomo Saltado criollo servido con arroz blanco graneado y papas fritas doradas',
    caption: 'Lomo Saltado Criollo con arroz blanco graneado y papas fritas'
  },
  {
    src: 'assets/images/galeria/galeria-05.webp',
    alt: 'Comensal disfrutando piqueos, papas fritas y ensalada en Restaurante M&M',
    caption: 'Experiencia en Salón — Piqueos y atención acogedora en Sullana'
  },
  {
    src: 'assets/images/galeria/galeria-06.webp',
    alt: 'Pollo dorado acompañado de arroz sazonado y ensalada rusa en Restaurante M&M',
    caption: 'Pollo Dorado con arroz sazonado y ensalada rusa tradicional'
  },
  {
    src: 'assets/images/galeria/galeria-07.webp',
    alt: 'Porción de pizza artesanal con queso derretido de Restaurante M&M',
    caption: 'Pizza Artesanal M&M recién horneada'
  }
];

export function initGallery() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close');
  const backdrop = document.getElementById('lightbox-backdrop');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const triggers = document.querySelectorAll('.gallery-trigger');

  if (!lightbox || !lightboxImg || !triggers.length) return;

  let currentIndex = 0;
  let lastTrigger = null;
  let touchStartX = 0;

  const renderSlide = (index) => {
    currentIndex = (index + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    const item = GALLERY_ITEMS[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
    if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${GALLERY_ITEMS.length}`;
  };

  const openLightbox = (index, triggerEl) => {
    lastTrigger = triggerEl || null;
    renderSlide(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger) lastTrigger.focus();
  };

  triggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index') || '0', 10);
      openLightbox(idx, btn);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => renderSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => renderSlide(currentIndex + 1));

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') renderSlide(currentIndex - 1);
    if (event.key === 'ArrowRight') renderSlide(currentIndex + 1);
  });

  // Touch swipe navigation on mobile
  lightbox.addEventListener(
    'touchstart',
    (event) => {
      if (event.changedTouches.length > 0) {
        touchStartX = event.changedTouches[0].clientX;
      }
    },
    { passive: true }
  );

  lightbox.addEventListener(
    'touchend',
    (event) => {
      if (event.changedTouches.length > 0) {
        const deltaX = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(deltaX) > 45) {
          if (deltaX > 0) {
            renderSlide(currentIndex - 1);
          } else {
            renderSlide(currentIndex + 1);
          }
        }
      }
    },
    { passive: true }
  );
}
