/**
 * AI-Prompts Showcase Hub — main.js
 * Universal offline-ready (file:// + http://),
 * Lenis Inertial Smooth Scrolling, Dynamic 3D Perspective Card Tilt & Specular Glare,
 * Cinematic Anime GIF Preloader, Mobile menu, Three.js Luminous Fluid Wave Matrix,
 * stats count-up, project cards render with HTML escaping, search/filter, modal, toast
 */

// Helper to escape HTML characters in dynamic data
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 0. Cinematic Anime Preloader
  initPreloader();

  // 1. Lenis Smooth Inertial Scroll
  initSmoothScroll();

  // 2. Mobile Menu
  initMobileMenu();

  // 3. Three.js Luminous Fluid Energy Waves
  initThreeGalaxy();

  // 4. Stats Count-Up
  initStats();

  // 5. Render 34 Projects & 3D Card Hover
  renderProjects(window.PROJECTS_DATA || []);

  // 6. Search & Filter
  initSearchFilter();

  // 7. Modal
  initModal();

  // 8. Scroll Progress
  initScrollProgress();
});

/* ============================================================
   0. CINEMATIC ANIME PRELOADER
   ============================================================ */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill      = document.getElementById('preloaderFill');
  const percent   = document.getElementById('preloaderPercent');
  const status    = document.getElementById('preloaderStatus');

  if (!preloader) return;

  let progress = 0;
  const duration = 1400; // ms
  const interval = 20;
  const step = 100 / (duration / interval);

  const statuses = [
    { p: 0, text: 'Khởi tạo 34 Không gian UI/UX...' },
    { p: 35, text: 'Nạp đồ họa Three.js & WebGL Shaders...' },
    { p: 70, text: 'Đồng bộ hóa 34 Live Previews...' },
    { p: 95, text: 'Hoàn tất • Chào mừng bạn!' }
  ];

  const timer = setInterval(() => {
    progress += step;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);

      if (fill) fill.style.width = '100%';
      if (percent) percent.textContent = '100%';
      if (status) status.textContent = 'Hoàn tất • Chào mừng bạn!';

      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.remove();
        }, 900);
      }, 350);
    } else {
      const current = Math.floor(progress);
      if (fill) fill.style.width = `${current}%`;
      if (percent) percent.textContent = `${String(current).padStart(2, '0')}%`;

      const match = statuses.filter(s => current >= s.p).pop();
      if (match && status && status.textContent !== match.text) {
        status.textContent = match.text;
      }
    }
  }, interval);
}

/* ============================================================
   1. LENIS SMOOTH INERTIAL SCROLLING
   ============================================================ */
let lenisInstance = null;

function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Intercept internal hash anchor navigation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            lenisInstance.scrollTo(target, { offset: 0, duration: 1.4 });
          }
        }
      });
    });
  }
}

/* ============================================================
   2. MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const burger    = document.getElementById('burgerBtn');
  const overlay   = document.getElementById('menuOverlay');
  const menu      = document.getElementById('mobileMenu');
  const links     = menu ? menu.querySelectorAll('.mobile-link') : [];

  links.forEach((link, i) => link.style.setProperty('--link-index', i));

  const open = () => {
    if (!burger) return;
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    if (overlay) overlay.classList.remove('hidden');
    if (menu) menu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    if (!burger) return;
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.classList.add('hidden');
    if (menu) menu.classList.add('hidden');
    document.body.style.overflow = '';
  };

  if (burger)  burger.addEventListener('click', () => burger.getAttribute('aria-expanded') === 'true' ? close() : open());
  if (overlay) overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 720) close(); });
  links.forEach((link) => link.addEventListener('click', close));

  // Nav link active state sync
  document.querySelectorAll('.nav-link, .mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      const text = link.textContent.trim();
      document.querySelectorAll('.nav-link, .mobile-link').forEach((l) => {
        l.classList.toggle('active', l.textContent.trim() === text);
      });
    });
  });
}

/* ============================================================
   3. THREE.JS LUMINOUS FLUID ENERGY WAVES (Zero Square Blocks)
   ============================================================ */
function initThreeGalaxy() {
  const container = document.getElementById('threeCanvas');
  if (!container || typeof THREE === 'undefined') return;

  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  Object.assign(container.style, { position:'fixed', inset:'0', pointerEvents:'none', zIndex:'1' });
  Object.assign(renderer.domElement.style, { width:'100%', height:'100%' });

  // ── Procedural Circular Glow Particle Texture (Zero hard square edges) ──
  function createGlowSprite() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(56, 189, 248, 0.85)');
    grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }

  const glowTexture = createGlowSprite();

  // ── 1. Undulating Kinetic Energy Wave Grid (55x55 = 3025 nodes) ──
  const gridX = 55;
  const gridZ = 55;
  const numParticles = gridX * gridZ;
  const waveGeo = new THREE.BufferGeometry();
  const wavePos = new Float32Array(numParticles * 3);
  const waveCol = new Float32Array(numParticles * 3);

  const spacing = 0.55;
  const offsetX = (gridX * spacing) / 2;
  const offsetZ = (gridZ * spacing) / 2;

  let idx = 0;
  for (let ix = 0; ix < gridX; ix++) {
    for (let iz = 0; iz < gridZ; iz++) {
      const x = ix * spacing - offsetX;
      const z = iz * spacing - offsetZ;
      wavePos[idx * 3]     = x;
      wavePos[idx * 3 + 1] = 0;
      wavePos[idx * 3 + 2] = z;

      // Vibrant cyber gradient palette
      const ratio = (ix + iz) / (gridX + gridZ);
      waveCol[idx * 3]     = 0.05 + ratio * 0.6;  // R
      waveCol[idx * 3 + 1] = 0.65 - ratio * 0.2;  // G
      waveCol[idx * 3 + 2] = 0.95;                // B
      idx++;
    }
  }

  waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePos, 3));
  waveGeo.setAttribute('color',    new THREE.BufferAttribute(waveCol, 3));

  const waveMat = new THREE.PointsMaterial({
    size: 0.32,
    map: glowTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true
  });

  const waveMesh = new THREE.Points(waveGeo, waveMat);
  waveMesh.position.y = -3.2;
  waveMesh.rotation.x = 0.35;
  scene.add(waveMesh);

  // ── 2. Floating Ambient Stardust Layer ──
  const starCount = 200;
  const starGeo   = new THREE.BufferGeometry();
  const starPos   = new Float32Array(starCount * 3);
  const starCol   = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    starPos[i * 3]     = (Math.random() - 0.5) * 22;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 16;

    const isCyan = Math.random() > 0.5;
    starCol[i * 3]     = isCyan ? 0.2 : 0.7;
    starCol[i * 3 + 1] = isCyan ? 0.8 : 0.3;
    starCol[i * 3 + 2] = isCyan ? 1.0 : 0.9;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('color',    new THREE.BufferAttribute(starCol, 3));

  const starMat = new THREE.PointsMaterial({
    size: 0.45,
    map: glowTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const starMesh = new THREE.Points(starGeo, starMat);
  scene.add(starMesh);

  camera.position.set(0, 1.5, 12);

  // ── 3. Smooth Mouse Parallax Lerping ──
  let targetMouseX = 0, targetMouseY = 0;
  let currentMouseX = 0, currentMouseY = 0;

  document.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── 4. Animation Loop ──
  let clock = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    clock += 0.022;

    currentMouseX += (targetMouseX - currentMouseX) * 0.05;
    currentMouseY += (targetMouseY - currentMouseY) * 0.05;

    const positions = waveGeo.attributes.position.array;
    let pIdx = 0;
    for (let ix = 0; ix < gridX; ix++) {
      for (let iz = 0; iz < gridZ; iz++) {
        const x = ix * spacing - offsetX;
        const z = iz * spacing - offsetZ;
        
        const y = Math.sin(x * 0.3 + clock) * Math.cos(z * 0.3 + clock * 0.8) * 0.95
                + Math.sin((x + z) * 0.18 + clock * 1.2) * 0.55;

        positions[pIdx * 3 + 1] = y;
        pIdx++;
      }
    }
    waveGeo.attributes.position.needsUpdate = true;

    waveMesh.rotation.z = currentMouseX * 0.12;
    waveMesh.rotation.x = 0.35 + currentMouseY * 0.08;

    starMesh.rotation.y = clock * 0.03 + currentMouseX * 0.1;
    starMesh.rotation.x = Math.sin(clock * 0.02) * 0.05 + currentMouseY * 0.06;

    renderer.render(scene, camera);
  };
  animate();
}

/* ============================================================
   4. STATS COUNT-UP (easeOutCubic)
   ============================================================ */
function initStats() {
  const stats = document.querySelectorAll('.stat');
  let triggered = false;
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const run = (el, i) => {
    const target   = parseFloat(el.dataset.target ?? '0');
    const suffix   = el.dataset.suffix ?? '';
    const decimals = parseInt(el.dataset.decimals ?? '0', 10);
    const valueEl  = el.querySelector('.stat-value');
    if (!valueEl) return;
    const dur   = 1500 + i * 80;
    const delay = 480  + i * 90;
    setTimeout(() => {
      let t0 = null;
      const tick = (now) => {
        if (!t0) t0 = now;
        const p = Math.min((now - t0) / dur, 1);
        valueEl.textContent = (easeOutCubic(p) * target).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else valueEl.textContent = target.toFixed(decimals) + suffix;
      };
      requestAnimationFrame(tick);
    }, delay);
  };

  const io = new IntersectionObserver((entries) => {
    if (entries[0] && entries[0].isIntersecting && !triggered) {
      triggered = true;
      stats.forEach((el, i) => run(el, i));
      io.disconnect();
    }
  }, { threshold: 0.25 });

  const footer = document.querySelector('.stats-footer');
  if (footer) io.observe(footer);
  else stats.forEach((el, i) => run(el, i));
}

/* ============================================================
   5. RENDER 34 PROJECT CARDS (With Specular Glare & 3D Tilt)
   ============================================================ */
function renderProjects(projects) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = projects.map((p, idx) => {
    const diff = (p.stats?.difficulty ?? '').toLowerCase();
    const badgeCls = diff === 'expert' ? 'badge-expert'
      : diff === 'advanced' ? 'badge-advanced'
      : diff === 'intermediate' ? 'badge-intermediate'
      : 'badge-default';
    const badgeLabel = escapeHtml(p.stats?.difficulty ?? p.badge ?? 'Standard');

    const tagsHtml = (p.tags ?? []).slice(0, 3).map(t => `<span class="card-tag">${escapeHtml(t)}</span>`).join('');

    const previewHtml = p.preview
      ? `<img src="${p.preview}" alt="${escapeHtml(p.name)} preview" loading="lazy" />`
      : `<div class="card-preview-placeholder">${escapeHtml(p.icon ?? '⚡')}</div>`;

    const safeSlug = escapeHtml(p.slug ?? '');
    const safeName = escapeHtml(p.name ?? '');
    const safeDomain = escapeHtml(p.domain ?? '');
    const safeDesc = escapeHtml(p.desc ?? '');
    const safeCat = escapeHtml(p.category ?? '');
    const searchTags = (p.tags ?? []).join(' ').toLowerCase();

    return `
      <article class="project-card" style="animation-delay:${idx * 0.03}s"
        data-name="${safeName.toLowerCase()}"
        data-tags="${escapeHtml(searchTags)}"
        data-cat="${safeCat}"
        data-domain="${safeDomain.toLowerCase()}">
        <div class="card-glare"></div>
        <div class="card-preview">${previewHtml}</div>
        <div class="card-body">
          <div class="card-top">
            <span class="card-badge ${badgeCls}">${badgeLabel}</span>
            <span class="card-num">#${String(p.id ?? idx+1).padStart(2,'0')}</span>
          </div>
          <div class="card-name">${safeName}</div>
          <div class="card-domain">${safeDomain}</div>
          <div class="card-desc">${safeDesc}</div>
          <div class="card-tags">${tagsHtml}</div>
          <div class="card-footer">
            <button type="button" class="card-prompt-btn" onclick="openPromptModal('${safeSlug}','${safeName.replace(/'/g, "\\'")}')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Prompt
            </button>
            <a href="${safeSlug}/index.html" target="_blank" class="card-demo-btn">
              Live Demo
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Initialize 3D Card Hover after rendering
  init3DCardTilt();
}

/* ============================================================
   6. DYNAMIC 3D CARD PERSPECTIVE TILT & SPECULAR FLARE
   ============================================================ */
function init3DCardTilt() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    let glare = card.querySelector('.card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    let bounds = null;

    const onMouseEnter = () => {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.12s ease-out, border-color 0.4s ease, box-shadow 0.4s ease';
      if (glare) glare.style.opacity = '1';
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const maxTilt = 10; // degrees
      const tiltX = -percentY * maxTilt;
      const tiltY = percentX * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(14px) scale3d(1.025, 1.025, 1.025)`;

      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(56, 189, 248, 0.42) 0%, rgba(168, 85, 247, 0.18) 35%, transparent 65%)`;
      }
    };

    const onMouseLeave = () => {
      bounds = null;
      card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.4s ease, box-shadow 0.4s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) scale3d(1, 1, 1)';
      if (glare) glare.style.opacity = '0';
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}

/* ============================================================
   7. SEARCH & FILTER
   ============================================================ */
function initSearchFilter() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn    = document.getElementById('clearSearchBtn');
  const filterPills = document.getElementById('filterPills');
  let activeCat = 'all';
  let searchTerm = '';

  const filter = () => {
    const cards = document.querySelectorAll('.project-card');
    let shown = 0;
    cards.forEach((card) => {
      const name   = card.dataset.name   ?? '';
      const tags   = card.dataset.tags   ?? '';
      const domain = card.dataset.domain ?? '';
      const cat    = card.dataset.cat    ?? '';
      const matchSearch = !searchTerm || name.includes(searchTerm) || tags.includes(searchTerm) || domain.includes(searchTerm);
      const matchCat    = activeCat === 'all' || cat === activeCat;
      const visible = matchSearch && matchCat;
      card.style.display = visible ? '' : 'none';
      if (visible) shown++;
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      if (clearBtn) clearBtn.classList.toggle('hidden', !searchTerm);
      filter();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchTerm = '';
      clearBtn.classList.add('hidden');
      filter();
    });
  }

  if (filterPills) {
    filterPills.querySelectorAll('.filter-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        filterPills.querySelectorAll('.filter-pill').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        activeCat = pill.dataset.cat ?? 'all';
        filter();
      });
    });
  }

  // Command K shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (searchInput) {
        const target = document.getElementById('showcase');
        if (target && lenisInstance) {
          lenisInstance.scrollTo(target, { offset: 0, duration: 1.2 });
        } else if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => searchInput.focus(), 600);
      }
    }
  });
}

/* ============================================================
   8. PROMPT MODAL (With file:// CORS graceful handling)
   ============================================================ */
let modalSlug = '';

function openPromptModal(slug, name) {
  modalSlug = slug;
  const modal       = document.getElementById('promptModal');
  const titleEl     = document.getElementById('modalTitle');
  const slugEl      = document.getElementById('modalSlug');
  const statsEl     = document.getElementById('modalStats');
  const promptView  = document.getElementById('modalPromptView');
  const sandboxView = document.getElementById('modalSandboxView');
  const iframe      = document.getElementById('sandboxIframe');
  const fullscreenLink = document.getElementById('modalFullscreenLink');
  const tabPromptBtn   = document.getElementById('tabPromptBtn');
  const tabSandboxBtn  = document.getElementById('tabSandboxBtn');

  if (!modal) return;

  titleEl.textContent = name;
  slugEl.textContent  = `${slug}.txt`;
  promptView.textContent = 'Đang tải nội dung prompt...';
  if (sandboxView) sandboxView.classList.add('hidden');
  if (promptView) promptView.classList.remove('hidden');
  if (tabPromptBtn) tabPromptBtn.classList.add('active');
  if (tabSandboxBtn) tabSandboxBtn.classList.remove('active');
  if (iframe) iframe.src = '';
  if (fullscreenLink) fullscreenLink.href = `${slug}/index.html`;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (lenisInstance) lenisInstance.stop();
  if (typeof lucide !== 'undefined') lucide.createIcons();

  fetch(`${slug}.txt`)
    .then(r => r.ok ? r.text() : Promise.reject(r.status))
    .then(text => {
      promptView.textContent = text;
      const lines = text.split('\n').length;
      if (statsEl) statsEl.textContent = `${lines.toLocaleString()} dòng`;
    })
    .catch(() => {
      const isFileProtocol = window.location.protocol === 'file:';
      if (isFileProtocol) {
        promptView.textContent = `[Chế độ Offline (file://)]\n\nDo chính sách bảo mật của trình duyệt khi mở tệp cục bộ (file://), trình duyệt chặn Ajax đọc tệp .txt.\n\n→ Bạn có thể mở trực tiếp tệp "${slug}.txt" trong thư mục dự án.\n→ Hoặc chuyển sang tab "Live Sandbox" / nhấn "Mở tab riêng" ở góc phải để trải nghiệm giao diện!`;
      } else {
        promptView.textContent = `[Không thể tải prompt cho "${name}". Tệp: ${slug}.txt]`;
      }
      if (statsEl) statsEl.textContent = '—';
    });

  if (tabPromptBtn) {
    tabPromptBtn.onclick = () => {
      if (promptView) promptView.classList.remove('hidden');
      if (sandboxView) sandboxView.classList.add('hidden');
      tabPromptBtn.classList.add('active');
      if (tabSandboxBtn) tabSandboxBtn.classList.remove('active');
    };
  }

  if (tabSandboxBtn) {
    tabSandboxBtn.onclick = () => {
      if (sandboxView) sandboxView.classList.remove('hidden');
      if (promptView) promptView.classList.add('hidden');
      tabSandboxBtn.classList.add('active');
      if (tabPromptBtn) tabPromptBtn.classList.remove('active');
      if (iframe && (!iframe.src || iframe.src === window.location.href)) {
        iframe.src = `${slug}/index.html`;
      }
    };
  }
}

function initModal() {
  const modal    = document.getElementById('promptModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('closeModalBtn');
  const copyBtn  = document.getElementById('copyPromptBtn');

  const close = () => {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    if (lenisInstance) lenisInstance.start();
    const iframe = document.getElementById('sandboxIframe');
    if (iframe) iframe.src = '';
  };

  if (backdrop) backdrop.addEventListener('click', close);
  if (closeBtn) closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = document.getElementById('modalPromptView')?.textContent ?? '';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => showToast('Đã sao chép prompt thành công!'));
      }
    });
  }
}

/* ============================================================
   9. RANDOM PROJECT
   ============================================================ */
function openRandomProject() {
  const projects = window.PROJECTS_DATA ?? [];
  if (!projects.length) return;
  const p = projects[Math.floor(Math.random() * projects.length)];
  window.open(`${p.slug}/index.html`, '_blank');
}

/* ============================================================
   10. TOAST
   ============================================================ */
function showToast(msg) {
  const toast   = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast) return;
  if (toastMsg) toastMsg.textContent = msg;
  toast.classList.remove('hidden');
  if (typeof lucide !== 'undefined') lucide.createIcons();
  setTimeout(() => toast.classList.add('hidden'), 2800);
}

/* ============================================================
   11. SCROLL PROGRESS
   ============================================================ */
function initScrollProgress() {
  const header = document.querySelector('.header');
  let scrolled = false;

  window.addEventListener('scroll', () => {
    const now = window.scrollY > 60;
    if (now !== scrolled) {
      scrolled = now;
      header?.classList.toggle('scrolled', scrolled);
    }
  }, { passive: true });
}
