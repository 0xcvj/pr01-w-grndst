// ===== SERVICE DATA =====
const serviceData = {
  web: {
    title: 'WEB & APP DEVELOPMENT',
    subtitle: 'Digital Experiences, Engineered for Impact',
    description: 'We architect stunning digital platforms that do more than just catch the eye. We build intuitive, high-performance websites and apps that captivate users, drive engagement, and convert your vision into value.'
  },
  system: {
    title: 'SYSTEM INTEGRATION & CLOUD',
    subtitle: 'Future-Ready Infrastructure',
    description: 'We unify your systems into one intelligent ecosystem. From cloud migration to API orchestration, we ensure everything works together smoothly, securely, and at scale\u2014so your business moves faster, smarter, and without friction.'
  },
  maintenance: {
    title: 'MAINTENANCE & SECURITY',
    subtitle: 'Always On. Always Secure.',
    description: 'Your digital assets are your lifeline. Our proactive maintenance, 24/7 monitoring, and threat intelligence services ensure your platforms are not just stable, but fortified against emerging threats. We keep you running, so you can focus on growth.'
  },
  ai: {
    title: 'CUSTOM AI SOLUTIONS & INTEGRATION',
    subtitle: 'AI That Works. For You.',
    description: 'We design and integrate AI tools tailored to your workflow. From automation to decision-making engines, our solutions enhance efficiency, cut manual work, and unlock new capabilities\u2014powered by models that adapt to your business.'
  }
};

// ===== PROJECT DATA =====
const projectData = [
  {
    name: 'WeChange',
    image: 'images/1-wechange.png',
    tags: ['Fintech', 'Crypto', 'On/Off-Ramp'],
    description: 'A fast, user-friendly fiat\u2013crypto exchange'
  },
  {
    name: 'Eneftro',
    image: 'images/2-eneftro.png',
    tags: ['NFT Marketplace', 'Web3', 'RWA/RWS'],
    description: 'NFT marketplace platform'
  },
  {
    name: 'GrowwHub',
    image: 'images/3-growwhub.png',
    tags: ['AI Platform', 'B2B', 'Matching Engine'],
    description: 'An AI-powered B2B partner-matching platform'
  },
  {
    name: 'OtthonZ\u00f3na',
    image: 'images/4-otthonzona.png',
    tags: ['Real Estate', 'AI Chatbot', 'Search Platform'],
    description: 'Real estate search platform'
  },
  {
    name: 'Budai Pr\u00f3baTerem',
    image: 'images/5-budai.png',
    tags: ['Booking System', 'Music Studio', 'Local Business'],
    description: 'Music studio booking system'
  },
  {
    name: 'Evominter',
    image: 'images/6-evominter.png',
    tags: ['Corporate Website', 'Design-Led', 'Brand Presence'],
    description: 'Corporate website with strong brand presence'
  }
];

// ===== RENDER PROJECTS =====
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = projectData.map(project => `
    <div class="project-card animate-on-scroll">
      <img src="${project.image}" alt="${project.name}" loading="lazy">
      <div class="project-card-overlay">
        <div class="project-card-name">${project.name}</div>
        <div class="project-card-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// ===== SERVICE DETAIL PANEL =====
function openServicePanel(serviceKey) {
  const data = serviceData[serviceKey];
  if (!data) return;
  document.getElementById('servicePanelTitle').textContent = data.title;
  document.getElementById('servicePanelSubtitle').textContent = data.subtitle;
  document.getElementById('servicePanelDesc').textContent = data.description;
  document.getElementById('serviceOverlay').classList.add('active');
  document.getElementById('servicePanel').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeServicePanel() {
  document.getElementById('serviceOverlay').classList.remove('active');
  document.getElementById('servicePanel').classList.remove('active');
  document.body.style.overflow = '';
}

// ===== MODAL =====
function openModal() {
  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById('modalScreen1').classList.remove('hidden');
  document.getElementById('modalScreen2').classList.remove('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
  // Reset to screen 1
  setTimeout(() => {
    document.getElementById('modalScreen1').classList.remove('hidden');
    document.getElementById('modalScreen2').classList.remove('active');
  }, 300);
}

function showFormScreen() {
  document.getElementById('modalScreen1').classList.add('hidden');
  document.getElementById('modalScreen2').classList.add('active');
}

function showChoiceScreen() {
  document.getElementById('modalScreen2').classList.remove('active');
  document.getElementById('modalScreen1').classList.remove('hidden');
}

// ===== TOAST =====
function showToast(message, type) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast ' + type;
  // Trigger show
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ===== SCROLL ANIMATIONS =====
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// ===== SMOOTH SCROLL FOR NAV =====
function setupSmoothScroll() {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===== INIT =====
// ===== PAGE LOADER =====
function initLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  const loaderIcons = loader.querySelectorAll('.loader-icon');
  const heroIcons = document.querySelectorAll('.hero-icon');
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

  const MIN_LOADER_TIME = 800;
  const loaderStart = performance.now();

  function startTransition() {
    // Measure target positions
    const targets = [];
    heroIcons.forEach((heroIcon, i) => {
      const heroRect = heroIcon.getBoundingClientRect();
      const loaderRect = loaderIcons[i].getBoundingClientRect();

      targets.push({
        dx: (heroRect.left + heroRect.width / 2) - (loaderRect.left + loaderRect.width / 2),
        dy: (heroRect.top + heroRect.height / 2) - (loaderRect.top + loaderRect.height / 2),
        sx: heroRect.width / loaderRect.width,
        sy: heroRect.height / loaderRect.height,
      });
    });

    // Capture current rotation and freeze icons at current visual state
    const currentRotations = [];
    loaderIcons.forEach(icon => {
      const computed = getComputedStyle(icon).transform;
      let angle = 0;
      if (computed && computed !== 'none') {
        // Set current transform inline BEFORE killing animation to prevent freeze frame
        icon.style.transform = computed;
        const match = computed.match(/matrix\(([^)]+)\)/);
        if (match) {
          const values = match[1].split(',').map(Number);
          angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
        }
      }
      currentRotations.push(angle);
      icon.classList.add('transitioning');
    });

    const DURATION = 1000;
    const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const animations = [];

    loaderIcons.forEach((icon, i) => {
      const { dx, dy, sx, sy } = targets[i];
      const startRot = currentRotations[i];
      const s = Math.min(sx, sy); // uniform scale to prevent distortion
      const anim = icon.animate([
        { transform: `translate(0, 0) scale(1) rotate(${startRot}deg)`, offset: 0 },
        { transform: `translate(${dx * 0.5}px, ${dy * 0.3}px) scale(${1 + (s - 1) * 0.5}) rotate(${startRot * 0.3}deg)`, offset: 0.4 },
        { transform: `translate(${dx}px, ${dy}px) scale(${s}) rotate(0deg)`, offset: 1 }
      ], {
        duration: DURATION,
        delay: i * 100,
        easing: EASING,
        fill: 'forwards'
      });
      animations.push(anim.finished);
    });

    Promise.all(animations).then(() => {
      // Use rAF to ensure hero icon swap happens in a single paint frame
      requestAnimationFrame(() => {
        // Make real hero icons visible
        heroContent.classList.add('hero-icons-visible');

        // Hide loader icons
        loaderIcons.forEach(icon => { icon.style.visibility = 'hidden'; });

        // Trigger hero text animations
        hero.classList.add('hero-animate');

        // Fade out loader overlay
        loader.classList.add('fade-out');

        // Restore scrolling
        document.body.classList.remove('loading');

        // Remove loader from DOM after fade
        loader.addEventListener('transitionend', () => {
          loader.remove();
        }, { once: true });
      });
    });
  }

  window.addEventListener('load', () => {
    const elapsed = performance.now() - loaderStart;
    const remaining = Math.max(0, MIN_LOADER_TIME - elapsed);
    setTimeout(startTransition, remaining);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  renderProjects();
  handleScrollAnimations();
  setupSmoothScroll();

  // Service card clicks — mobile: first tap reveals hover, second tap opens panel
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const isTouchDevice = 'ontouchstart' in window;
      if (isTouchDevice && !card.classList.contains('touch-active')) {
        e.preventDefault();
        document.querySelectorAll('.service-card.touch-active').forEach(c => c.classList.remove('touch-active'));
        card.classList.add('touch-active');
        return;
      }
      const serviceKey = card.dataset.service;
      if (serviceKey) openServicePanel(serviceKey);
    });
  });

  // Close touch-active when tapping outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.service-card')) {
      document.querySelectorAll('.service-card.touch-active').forEach(c => c.classList.remove('touch-active'));
    }
  });

  // Service panel close
  document.getElementById('serviceClose').addEventListener('click', closeServicePanel);
  document.getElementById('serviceOverlay').addEventListener('click', closeServicePanel);

  // Modal close
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) {
      closeModal();
    }
  });

  // Modal screens
  document.getElementById('btnShowForm').addEventListener('click', showFormScreen);
  document.getElementById('btnBackToChoice').addEventListener('click', showChoiceScreen);

  // Contact form — submit to Formspree via fetch
  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showToast('Message sent! We\'ll be in touch within one business day.', 'success');
        closeModal();
        form.reset();
      } else {
        const data = await response.json();
        const msg = data.errors ? data.errors.map(err => err.message).join(', ') : 'Something went wrong. Please try again.';
        showToast(msg, 'error');
      }
    } catch {
      showToast('Network error. Please check your connection and try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeServicePanel();
    }
  });

  // Remove entry animations after they finish so scroll-spread transform takes over
  document.querySelectorAll('.hero-text-left, .hero-text-right').forEach(el => {
    el.addEventListener('animationend', () => {
      el.classList.add('animation-done');
    });
  });

  // Hero scroll-spread animation
  const heroContent = document.querySelector('.hero-content');
  const hero = document.querySelector('.hero');

  function handleHeroScroll() {
    const scrollY = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const progress = Math.min(Math.max(scrollY / (heroBottom * 0.5), 0), 1);
    const spread = progress * 15; // 15vw max spread
    heroContent.style.setProperty('--scroll-spread', spread + 'vw');
  }

  window.addEventListener('scroll', handleHeroScroll, { passive: true });
  handleHeroScroll();

  // Nav background on scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.backgroundColor = 'rgba(217, 217, 217, 0.95)';
      nav.style.backdropFilter = 'blur(10px)';
    } else {
      nav.style.backgroundColor = 'transparent';
      nav.style.backdropFilter = 'none';
    }
  });
});
