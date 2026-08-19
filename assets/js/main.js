/**
 * AI-Prompts Masterpiece Hub — Main Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cinematic Intro Preloader
  initIntroPreloader();

  // 2. Three.js Interactive 3D Nebula Galaxy
  initThreeGalaxy();

  // 3. Render 32 Showcase Cards
  renderProjects(window.PROJECTS_DATA || []);

  // 4. Initialize Event Listeners & Search
  initEventListeners();
});

/* ==========================================================================
   1. CINEMATIC INTRO PRELOADER
   ========================================================================== */
function initIntroPreloader() {
  const preloader = document.getElementById('introPreloader');
  const percentText = document.getElementById('introPercent');
  const progressBar = document.getElementById('introProgressBar');

  if (!preloader || !percentText || !progressBar) return;

  let progress = 0;
  const duration = 1200; // ms
  const intervalTime = 20;
  const increment = 100 / (duration / intervalTime);

  const timer = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);

      percentText.innerText = '100%';
      progressBar.style.width = '100%';

      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.remove();
        }, 900);
      }, 300);
    } else {
      const current = Math.floor(progress);
      percentText.innerText = `${String(current).padStart(2, '0')}%`;
      progressBar.style.width = `${current}%`;
    }
  }, intervalTime);
}

/* ==========================================================================
   2. THREE.JS 3D INTERACTIVE PARTICLE GALAXY
   ========================================================================== */
function initThreeGalaxy() {
  const container = document.getElementById('threeCanvas');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 300;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const particleCount = 1400;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color('#38bdf8');
  const color2 = new THREE.Color('#a855f7');
  const color3 = new THREE.Color('#ec4899');

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 850;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 850;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 650;

    const mixed = color1.clone().lerp(color2, Math.random()).lerp(color3, Math.random() * 0.35);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 2.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.04;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.04;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0004;

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();
}

/* ==========================================================================
   3. RENDER CARDS & 3D TILT
   ========================================================================== */
function renderProjects(list) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-24 text-center text-slate-500">
        <div class="w-16 h-16 rounded-2xl bg-slate-900 border border-white/5 mx-auto mb-4 flex items-center justify-center text-slate-400">
          <i data-lucide="search-x" class="w-8 h-8 opacity-60"></i>
        </div>
        <h4 class="text-base font-semibold text-slate-300 mb-1">Không tìm thấy dự án nào</h4>
        <p class="text-xs text-slate-500 max-w-sm mx-auto">Vui lòng thử tìm kiếm với từ khóa khác hoặc chuyển sang danh mục khác.</p>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  grid.innerHTML = list.map((p) => `
    <div class="glass-card-3d rounded-3xl p-6 flex flex-col justify-between group relative overflow-hidden" data-tilt>
      <!-- Dynamic Theme Ambient Glow -->
      <div class="absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div class="relative z-10">
        <!-- Animated GIF Preview -->
        <div class="relative w-full h-48 rounded-2xl overflow-hidden mb-5 border border-white/10 shadow-2xl group/preview bg-black">
          <img src="${p.preview}" alt="${p.name} Live Demo Preview" loading="lazy" class="w-full h-full object-cover group-hover/preview:scale-108 transition-transform duration-700">
          <div class="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-[10px] font-mono font-bold text-cyan-300 border border-white/15 flex items-center gap-1.5 shadow-xl">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>LIVE UI GIF</span>
          </div>
          <div class="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-0 group-hover/preview:opacity-100 transition-all duration-300">
            <button onclick="openPromptModal('${p.slug}', '${p.name}', true)" class="px-3 py-1.5 rounded-lg bg-slate-950/90 backdrop-blur-md text-[11px] font-bold text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950 flex items-center gap-1 shadow-xl transition">
              <i data-lucide="play" class="w-3 h-3"></i> Sandbox
            </button>
          </div>
        </div>

        <!-- Meta Row -->
        <div class="flex items-center justify-between mb-3.5">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-500 shadow-xl">
              <i data-lucide="${p.icon}" class="w-5 h-5"></i>
            </div>
            <span class="text-[11px] font-mono font-bold text-slate-500">#${String(p.id).padStart(2, '0')}</span>
          </div>
          <span class="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 text-cyan-300 border border-slate-700/60 shadow-inner">${p.badge}</span>
        </div>

        <!-- Domain & Title -->
        <div class="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">${p.domain}</div>
        <h3 class="font-display text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">${p.name}</h3>
        <p class="text-xs text-slate-400 leading-relaxed font-light mb-6 line-clamp-3">${p.desc}</p>
      </div>

      <!-- Action Footer -->
      <div class="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-2.5">
        <button onclick="openPromptModal('${p.slug}', '${p.name}')" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 transition">
          <i data-lucide="file-text" class="w-3.5 h-3.5 text-cyan-400"></i> Prompt
        </button>
        <a href="${p.slug}/" target="_blank" class="btn-text-roll bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4.5 py-2 rounded-xl text-xs font-extrabold transition shadow-lg shadow-cyan-500/20">
          <div class="roll-inner">
            <span class="flex items-center gap-1">Live Demo <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i></span>
            <span class="flex items-center gap-1">Trải Nghiệm <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i></span>
          </div>
        </a>
      </div>
    </div>
  `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
  attachCardTilt();
}

function attachCardTilt() {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   4. FILTER & SEARCH LOGIC
   ========================================================================== */
let activeCategory = 'all';
let searchQuery = '';

function filterAndRender() {
  const allProjects = window.PROJECTS_DATA || [];
  const filtered = allProjects.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchQuery =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery) ||
      p.domain.toLowerCase().includes(searchQuery) ||
      p.desc.toLowerCase().includes(searchQuery) ||
      p.badge.toLowerCase().includes(searchQuery) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery)));
    return matchCat && matchQuery;
  });
  renderProjects(filtered);
}

function initEventListeners() {
  // Category Pills
  document.querySelectorAll('.filter-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach((b) => {
        b.classList.remove('bg-cyan-500', 'text-slate-950', 'border-cyan-400', 'shadow-lg', 'shadow-cyan-500/20');
        b.classList.add('bg-slate-900/80', 'text-slate-300', 'border-slate-800');
      });
      btn.classList.remove('bg-slate-900/80', 'text-slate-300', 'border-slate-800');
      btn.classList.add('bg-cyan-500', 'text-slate-950', 'border-cyan-400', 'shadow-lg', 'shadow-cyan-500/20');

      activeCategory = btn.dataset.cat;
      filterAndRender();
    });
  });

  // Search Input
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);
      }
      filterAndRender();
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      filterAndRender();
      searchInput.focus();
    });
  }

  // Keyboard Shortcuts (Cmd+K / Ctrl+K)
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput?.focus();
      searchInput?.select();
    }
    if (e.key === 'Escape') {
      closePromptModal();
    }
  });

  document.getElementById('quickSearchBtn')?.addEventListener('click', () => {
    searchInput?.focus();
    searchInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Modal Tab Controls
  document.getElementById('tabPromptBtn')?.addEventListener('click', () => switchTab('prompt'));
  document.getElementById('tabSandboxBtn')?.addEventListener('click', () => switchTab('sandbox'));
  document.getElementById('closeModalBtn')?.addEventListener('click', closePromptModal);
  document.getElementById('modalBackdrop')?.addEventListener('click', closePromptModal);

  // Copy Prompt
  document.getElementById('copyPromptBtn')?.addEventListener('click', () => {
    if (!currentPromptText) return;
    navigator.clipboard.writeText(currentPromptText).then(() => {
      showToast('Đã sao chép toàn bộ Prompt vào Clipboard!');
      if (typeof confetti === 'function') {
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.85 } });
        } catch (e) {}
      }
    });
  });
}

/* ==========================================================================
   5. PROMPT MODAL & LIVE SANDBOX
   ========================================================================== */
const promptModal = document.getElementById('promptModal');
const modalPromptView = document.getElementById('modalPromptView');
const modalSandboxView = document.getElementById('modalSandboxView');
const sandboxIframe = document.getElementById('sandboxIframe');
const modalTitle = document.getElementById('modalTitle');
const modalSlug = document.getElementById('modalSlug');
const modalStats = document.getElementById('modalStats');
const modalFullscreenLink = document.getElementById('modalFullscreenLink');
const tabPromptBtn = document.getElementById('tabPromptBtn');
const tabSandboxBtn = document.getElementById('tabSandboxBtn');
let currentPromptText = '';

window.openPromptModal = async function (slug, name, showSandbox = false) {
  if (!promptModal) return;

  promptModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (modalTitle) modalTitle.innerText = `${name} — AI Prompt Studio`;
  if (modalSlug) modalSlug.innerText = `${slug}.txt`;
  if (modalFullscreenLink) modalFullscreenLink.href = `${slug}/`;
  if (sandboxIframe) sandboxIframe.src = `${slug}/`;
  if (modalPromptView) modalPromptView.innerText = 'Đang tải nội dung prompt...';

  if (showSandbox) {
    switchTab('sandbox');
  } else {
    switchTab('prompt');
  }

  try {
    const res = await fetch(`${slug}.txt`);
    if (!res.ok) throw new Error('Không thể tải prompt');
    const text = await res.text();
    currentPromptText = text;
    if (modalPromptView) modalPromptView.innerText = text;
    const lines = text.split('\n').length;
    const chars = text.length;
    if (modalStats) modalStats.innerText = `${lines} dòng • ${chars.toLocaleString()} ký tự`;
  } catch (err) {
    if (modalPromptView) {
      modalPromptView.innerText = `Lỗi khi tải file prompt: ${slug}.txt\nBạn có thể xem trực tiếp tại tệp ${slug}.txt trong repository.`;
    }
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
};

function switchTab(tab) {
  if (tab === 'prompt') {
    modalPromptView?.classList.remove('hidden');
    modalSandboxView?.classList.add('hidden');
    tabPromptBtn?.classList.add('bg-cyan-500', 'text-slate-950', 'font-bold');
    tabPromptBtn?.classList.remove('text-slate-400');
    tabSandboxBtn?.classList.remove('bg-cyan-500', 'text-slate-950', 'font-bold');
    tabSandboxBtn?.classList.add('text-slate-400');
  } else {
    modalPromptView?.classList.add('hidden');
    modalSandboxView?.classList.remove('hidden');
    tabSandboxBtn?.classList.add('bg-cyan-500', 'text-slate-950', 'font-bold');
    tabSandboxBtn?.classList.remove('text-slate-400');
    tabPromptBtn?.classList.remove('bg-cyan-500', 'text-slate-950', 'font-bold');
    tabPromptBtn?.classList.add('text-slate-400');
  }
}

function closePromptModal() {
  if (!promptModal) return;
  promptModal.classList.add('hidden');
  if (sandboxIframe) sandboxIframe.src = '';
  document.body.style.overflow = '';
}

window.openRandomProject = function () {
  const allProjects = window.PROJECTS_DATA || [];
  if (allProjects.length === 0) return;
  const randomIndex = Math.floor(Math.random() * allProjects.length);
  const randomProj = allProjects[randomIndex];
  openPromptModal(randomProj.slug, randomProj.name, true);
};

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;
  toastMsg.innerText = msg;
  toast.classList.remove('hidden', 'toast-anim');
  void toast.offsetWidth;
  toast.classList.add('toast-anim');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2800);
}
