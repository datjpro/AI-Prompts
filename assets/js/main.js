/**
 * AI-Prompts Showcase Hub — main.js
 * Universal offline-ready (file:// + http://),
 * Mobile menu, Three.js galaxy, stats count-up,
 * project cards render with HTML escaping, search/filter, modal, toast
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

  initMobileMenu();
  initThreeGalaxy();
  initStats();
  renderProjects(window.PROJECTS_DATA || []);
  initSearchFilter();
  initModal();
  initScrollProgress();
});

/* ============================================================
   1. MOBILE MENU
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
   2. THREE.JS GALAXY
   ============================================================ */
function initThreeGalaxy() {
  const container = document.getElementById('threeCanvas');
  if (!container || typeof THREE === 'undefined') return;

  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  Object.assign(container.style, { position:'fixed', inset:'0', pointerEvents:'none', zIndex:'1' });
  Object.assign(renderer.domElement.style, { width:'100%', height:'100%' });

  const count = 1200;
  const geo   = new THREE.BufferGeometry();
  const pos   = new Float32Array(count * 3);
  const col   = new Float32Array(count * 3);
  const palettes = [[0.22,0.64,0.91],[0.66,0.33,0.97],[0.93,0.28,0.60],[0.06,0.73,0.51]];

  for (let i = 0; i < count; i++) {
    pos[i*3]   = (Math.random()-0.5)*18;
    pos[i*3+1] = (Math.random()-0.5)*18;
    pos[i*3+2] = (Math.random()-0.5)*14;
    const p = palettes[Math.floor(Math.random()*palettes.length)];
    col[i*3]=p[0]; col[i*3+1]=p[1]; col[i*3+2]=p[2];
  }

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));

  const mat  = new THREE.PointsMaterial({ size:0.06, vertexColors:true, transparent:true, opacity:0.65, sizeAttenuation:true });
  const mesh = new THREE.Points(geo, mat);
  scene.add(mesh);
  camera.position.z = 6;

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.0008 + mouseX * 0.0003;
    mesh.rotation.x += 0.0004 + mouseY * 0.0002;
    renderer.render(scene, camera);
  };
  animate();
}

/* ============================================================
   3. STATS COUNT-UP (easeOutCubic)
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
   4. RENDER PROJECT CARDS (With robust HTML escaping & direct index.html paths)
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
}

/* ============================================================
   5. SEARCH & FILTER
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
        document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => searchInput.focus(), 600);
      }
    }
  });
}

/* ============================================================
   6. PROMPT MODAL (With file:// CORS graceful handling)
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
   7. RANDOM PROJECT
   ============================================================ */
function openRandomProject() {
  const projects = window.PROJECTS_DATA ?? [];
  if (!projects.length) return;
  const p = projects[Math.floor(Math.random() * projects.length)];
  window.open(`${p.slug}/index.html`, '_blank');
}

/* ============================================================
   8. TOAST
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
   9. SCROLL PROGRESS
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
