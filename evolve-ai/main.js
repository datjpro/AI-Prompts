/**
 * Evolve AI - main.js
 * Mobile menu, active nav, stats count-up (easeOutCubic + IntersectionObserver)
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Menu ---
  const burgerBtn   = document.getElementById('burgerBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Apply stagger delay CSS vars to links
  mobileLinks.forEach((link, i) => {
    link.style.setProperty('--link-index', i);
  });

  function openMenu() {
    if (!burgerBtn) return;
    burgerBtn.setAttribute('aria-expanded', 'true');
    burgerBtn.setAttribute('aria-label', 'Close menu');
    burgerBtn.classList.add('open');
    if (menuOverlay) { menuOverlay.classList.remove('hidden'); menuOverlay.removeAttribute('aria-hidden'); }
    if (mobileMenu)  mobileMenu.classList.remove('hidden');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!burgerBtn) return;
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.setAttribute('aria-label', 'Open menu');
    burgerBtn.classList.remove('open');
    if (menuOverlay) { menuOverlay.classList.add('hidden'); menuOverlay.setAttribute('aria-hidden', 'true'); }
    if (mobileMenu)  mobileMenu.classList.add('hidden');
    document.body.classList.remove('menu-open');
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
    });
  }
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 720) closeMenu(); });
  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

  // --- 2. Active Nav Link ---
  document.querySelectorAll('.nav-link, .mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      const text = link.textContent.trim();
      document.querySelectorAll('.nav-link').forEach((l) => l.classList.toggle('active', l.textContent.trim() === text));
      document.querySelectorAll('.mobile-link').forEach((l) => l.classList.toggle('active', l.textContent.trim() === text));
    });
  });

  // --- 3. Stats Count-Up (easeOutCubic + IntersectionObserver) ---
  const stats = document.querySelectorAll('.stat');
  let statsTriggered = false;

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function animateStat(el, index) {
    const target   = parseFloat(el.dataset.target ?? '0');
    const suffix   = el.dataset.suffix ?? '';
    const decimals = parseInt(el.dataset.decimals ?? '0', 10);
    const valueEl  = el.querySelector('.stat-value');
    if (!valueEl) return;

    const duration   = 1500 + index * 80;
    const startDelay = 480  + index * 90;

    setTimeout(() => {
      let t0 = null;
      const tick = (now) => {
        if (!t0) t0 = now;
        const progress = Math.min((now - t0) / duration, 1);
        valueEl.textContent = (easeOutCubic(progress) * target).toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else valueEl.textContent = target.toFixed(decimals) + suffix;
      };
      requestAnimationFrame(tick);
    }, startDelay);
  }

  const footer = document.querySelector('.stats-footer');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsTriggered) {
        statsTriggered = true;
        stats.forEach((el, i) => animateStat(el, i));
        io.disconnect();
      }
    });
  }, { threshold: 0.25 });

  if (footer) io.observe(footer);
  else stats.forEach((el, i) => animateStat(el, i));
});
