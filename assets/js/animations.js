/**
 * animations.js
 * Gestiona la aparición progresiva de elementos al hacer scroll mediante
 * IntersectionObserver y un efecto parallax sutil respetando prefers-reduced-motion.
 */
export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Subtle GPU-accelerated parallax on desktop only
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length && window.innerWidth >= 1024) {
    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax') || '0.04');
        const offset = Math.min(scrollY * speed, 28);
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
  }
}
