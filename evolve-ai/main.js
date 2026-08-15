document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu State & Controls
  const burgerBtn = document.querySelector('.burger-btn');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-signin');

  function openMenu() {
    if (!burgerBtn || !mobileMenu || !mobileOverlay) return;
    burgerBtn.setAttribute('aria-expanded', 'true');
    mobileOverlay.removeAttribute('hidden');
    mobileMenu.removeAttribute('hidden');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!burgerBtn || !mobileMenu || !mobileOverlay) return;
    burgerBtn.setAttribute('aria-expanded', 'false');
    mobileOverlay.setAttribute('hidden', '');
    mobileMenu.setAttribute('hidden', '');
    document.body.classList.remove('menu-open');
  }

  function toggleMenu() {
    const isExpanded = burgerBtn?.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', toggleMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) {
      closeMenu();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // 2. Active Nav Link Interaction
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-link');
  allNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetHref = link.getAttribute('href');
      if (targetHref && targetHref.startsWith('#')) {
        document.querySelectorAll(`.nav-link, .mobile-link`).forEach((l) => {
          if (l.getAttribute('href') === targetHref) {
            l.classList.add('active');
          } else {
            l.classList.remove('active');
          }
        });
      }
    });
  });

  // 3. Stats Count-Up Animation (easeOutCubic)
  const statElements = document.querySelectorAll('.stat-item');
  let animated = false;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateStat(statEl, index) {
    const target = parseFloat(statEl.getAttribute('data-target') || '0');
    const suffix = statEl.getAttribute('data-suffix') || '';
    const decimals = parseInt(statEl.getAttribute('data-decimals') || '0', 10);
    const valueEl = statEl.querySelector('.stat-value');

    if (!valueEl) return;

    const duration = 1500 + index * 80;
    const startDelay = 480 + index * 90;

    setTimeout(() => {
      let startTime = null;

      function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);

        const currentValue = easedProgress * target;
        valueEl.textContent = currentValue.toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          valueEl.textContent = target.toFixed(decimals) + suffix;
        }
      }

      requestAnimationFrame(step);
    }, startDelay);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statElements.forEach((el, idx) => {
            animateStat(el, idx);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );

  const footer = document.querySelector('.stats-footer');
  if (footer) {
    observer.observe(footer);
  } else {
    statElements.forEach((el, idx) => animateStat(el, idx));
  }
});
