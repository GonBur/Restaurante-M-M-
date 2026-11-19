/**
 * main.js
 * Punto de entrada modular para Restaurante Cevichería M&M.
 * Inicializa navegación, animaciones, galería, filtros gastronómicos y asistente WhatsApp.
 */
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initGallery } from './gallery.js';

function initDishFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const dishCards = document.querySelectorAll('.dish-card');

  if (!filterButtons.length || !dishCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedCategory = btn.getAttribute('data-filter') || 'todos';

      filterButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      dishCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = selectedCategory === 'todos' || cardCategory === selectedCategory;
        card.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });
}

function initWhatsAppBuilder() {
  const form = document.getElementById('wa-builder');
  const motivoSelect = document.getElementById('wa-motivo');
  const detalleInput = document.getElementById('wa-detalle');

  if (!form || !motivoSelect) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const motivo = motivoSelect.value.trim();
    const detalle = detalleInput ? detalleInput.value.trim() : '';

    let message = `Hola Restaurante Cevichería M&M, ${motivo}`;
    if (detalle) {
      message += ` Detalle: ${detalle}.`;
    }

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/51983985387?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initGallery();
  initDishFilters();
  initWhatsAppBuilder();
  initCurrentYear();
});
