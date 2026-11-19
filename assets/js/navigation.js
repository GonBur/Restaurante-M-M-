/**
 * navigation.js
 * Controla el header dinámico al hacer scroll, el scroll-spy de secciones
 * y el menú móvil accesible con gestión de foco y teclado.
 */
export function initNavigation() {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  // Header scroll state
  const updateHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  updateHeaderScroll();
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });

  // Active nav link via IntersectionObserver
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const isMatch = link.getAttribute('href') === `#${id}`;
              link.classList.toggle('active', isMatch);
            });
          }
        });
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => spyObserver.observe(section));
  }

  // Mobile Drawer Controls
  if (!menuToggle || !mobileDrawer) return;

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (drawerClose) drawerClose.focus();
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuToggle.focus();
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}
