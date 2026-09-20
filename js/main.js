// ============================================================
// DEEVYANSHU SAHU PORTFOLIO — Main JS (Luxury Edition)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── LOADING SCREEN WITH DYNAMIC DS FONT MORPH ──────────────
  const loadingScreen = document.getElementById('loading-screen');
  const monogram = document.querySelector('.loader__monogram');

  const dsFonts = [
    "'Orbitron', sans-serif",
    "'Cinzel', serif",
    "'Major Mono Display', monospace",
    "'Playfair Display', serif",
    "'Press Start 2P', monospace",
    "'Righteous', cursive",
    "'Fira Code', monospace",
    "'Pacifico', cursive",
    "'Bebas Neue', sans-serif",
    "'Syne', sans-serif",
    "'Monoton', cursive",
    "'Comfortaa', cursive",
    "'Rubik Glitch', sans-serif",
    "'Space Grotesk', sans-serif",
    "'Inter', sans-serif"
  ];

  let fontIndex = 0;
  const fontMorphInterval = setInterval(() => {
    if (monogram && (!loadingScreen || !loadingScreen.classList.contains('hidden'))) {
      fontIndex = (fontIndex + 1) % dsFonts.length;
      monogram.style.fontFamily = dsFonts[fontIndex];
    } else {
      clearInterval(fontMorphInterval);
    }
  }, 110);

  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
    clearInterval(fontMorphInterval);
  }, 2300);

  // ── CUSTOM MAGNETIC CURSOR ───────────────────────────────────
  const cursor       = document.getElementById('cursor');
  const cursorFollow = document.getElementById('cursor-follower');
  let   mX = 0, mY = 0, fX = 0, fY = 0;

  document.addEventListener('mousemove', (e) => {
    mX = e.clientX; mY = e.clientY;
    cursor.style.left = mX + 'px';
    cursor.style.top  = mY + 'px';
  });

  (function trackFollower() {
    fX += (mX - fX) * 0.1;
    fY += (mY - fY) * 0.1;
    cursorFollow.style.left = fX + 'px';
    cursorFollow.style.top  = fY + 'px';
    requestAnimationFrame(trackFollower);
  })();

  // Cursor states
  document.querySelectorAll('a, button, .filter-btn, .social-link, .chip, .skill-tag, .cert-item, .achieve-item, .project-card, canvas#globe-canvas').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width        = '32px';
      cursor.style.height       = '32px';
      cursor.style.opacity      = '0.5';
      cursor.style.borderRadius = '4px';
      cursorFollow.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width        = '10px';
      cursor.style.height       = '10px';
      cursor.style.opacity      = '1';
      cursor.style.borderRadius = '50%';
      cursorFollow.style.opacity = '0.6';
    });
  });

  // ── 3D HOLOGRAPHIC AVATAR PARALLAX TILT ───────────────────────
  const aboutCutoutWrap = document.getElementById('aboutCutoutWrap');
  const aboutGlare      = document.getElementById('aboutGlare');
  if (aboutCutoutWrap) {
    let wrapRect = null;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let isHovering = false;
    let animFrame = null;

    function updateRect() {
      wrapRect = aboutCutoutWrap.getBoundingClientRect();
    }

    window.addEventListener('scroll', updateRect, { passive: true });
    window.addEventListener('resize', updateRect);

    aboutCutoutWrap.addEventListener('mouseenter', () => {
      isHovering = true;
      updateRect();
      if (!animFrame) {
        animFrame = requestAnimationFrame(renderTilt);
      }
    });

    aboutCutoutWrap.addEventListener('mousemove', (e) => {
      if (!wrapRect) updateRect();
      const x = e.clientX - wrapRect.left;
      const y = e.clientY - wrapRect.top;
      const centerX = wrapRect.width / 2;
      const centerY = wrapRect.height / 2;

      // Smooth 3D tilt calculations: max 11 degrees
      targetRotateY = ((x - centerX) / centerX) * 11;
      targetRotateX = -((y - centerY) / centerY) * 11;

      if (aboutGlare) {
        const glareX = (x / wrapRect.width) * 100;
        const glareY = (y / wrapRect.height) * 100;
        aboutGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.18) 0%, rgba(0, 240, 255, 0.08) 35%, transparent 65%)`;
      }
    });

    aboutCutoutWrap.addEventListener('mouseleave', () => {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;
    });

    function renderTilt() {
      currentRotateX += (targetRotateX - currentRotateX) * 0.12;
      currentRotateY += (targetRotateY - currentRotateY) * 0.12;

      aboutCutoutWrap.style.transform = `perspective(1200px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) scale3d(${isHovering ? 1.03 : 1}, ${isHovering ? 1.03 : 1}, 1)`;

      if (isHovering || Math.abs(currentRotateX) > 0.05 || Math.abs(currentRotateY) > 0.05) {
        animFrame = requestAnimationFrame(renderTilt);
      } else {
        aboutCutoutWrap.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        animFrame = null;
      }
    }
  }

  // ── NAVBAR ───────────────────────────────────────────────────
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav__link[data-section]');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const btt       = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    btt.classList.toggle('visible', window.scrollY > 600);
    updateActiveNav();
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('open'));
  });
  navMenu.querySelectorAll('a').forEach(l => {
    l.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 130) current = s.id;
    });
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === current));
  }

  // ── SMOOTH SCROLL ────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── TYPEWRITER ───────────────────────────────────────────────
  const roles = ['Flutter & Mobile Architect', 'AI/ML & NLP Developer', 'Full-Stack Engineer', 'IoT & Embedded Builder', 'BCA @ CHRIST Univ.'];
  const tw = document.getElementById('typewriter');
  if (tw) {
    let ri = 0, ci = 0, deleting = false;
    const type = () => {
      const word = roles[ri];
      tw.textContent = deleting ? word.substring(0, ci--) : word.substring(0, ci++);
      if (!deleting && ci > word.length) { setTimeout(() => { deleting = true; type(); }, 2000); return; }
      if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; }
      setTimeout(type, deleting ? 45 : 95);
    };
    type();
  }

  // ── SCROLL REVEAL ────────────────────────────────────────────
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ── WORD REVEAL (clip-path) ───────────────────────────────────
  document.querySelectorAll('.word-reveal').forEach(el => {
    // Wrap each word in a span if not already done
    if (!el.querySelector('span')) {
      const words = el.textContent.split(' ');
      el.innerHTML = words.map((w, i) =>
        `<span style="transition-delay:${i * 0.08}s">${w}&nbsp;</span>`
      ).join('');
    }
  });
  const wordRevealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.3 });
  document.querySelectorAll('.word-reveal').forEach(el => wordRevealObs.observe(el));

  // ── SKILL BAR ANIMATION ───────────────────────────────────────
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar__fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.width; }, 100);
        });
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.skill-card').forEach(c => skillObs.observe(c));

  // ── COUNTER ANIMATION ─────────────────────────────────────────
  function animateCount(el, target, dur = 2000) {
    let start = 0;
    const step = target / (dur / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); return; }
      el.textContent = Math.floor(start).toLocaleString();
    }, 16);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('[data-count]').forEach(el => {
          animateCount(el, parseInt(el.dataset.count));
        });
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.achieve__stats, .hero__stats').forEach(s => counterObs.observe(s));

  // ── PROJECT FILTER ────────────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      document.querySelectorAll('.projects__grid .project-card').forEach(card => {
        const cat = card.dataset.category || '';
        const show = filter === 'all' || cat.includes(filter);
        card.style.transition = 'opacity 0.35s, transform 0.35s';
        if (!show) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.97)';
          setTimeout(() => { card.style.display = 'none'; }, 350);
        } else {
          card.style.display = 'grid';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        }
      });
    });
  });

  // ── TECH CYAN CURSOR TRAIL ──────────────────────────────────
  const trail = [];
  const TRAIL_LEN = 8;
  for (let i = 0; i < TRAIL_LEN; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed; pointer-events: none; z-index: 9990;
      width: ${5 - i * 0.4}px; height: ${5 - i * 0.4}px;
      border-radius: 50%;
      background: rgba(0, 240, 255, ${0.55 - i * 0.06});
      box-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
      transform: translate(-50%,-50%);
      opacity: 0;
      transition: left ${0.04 + i * 0.025}s ease, top ${0.04 + i * 0.025}s ease, opacity 0.3s ease;
    `;
    document.body.appendChild(dot);
    trail.push(dot);
  }
  let trailActive = false;
  document.addEventListener('mousemove', (e) => {
    if (!trailActive) {
      trail.forEach(d => { d.style.opacity = '1'; });
      trailActive = true;
    }
    trail.forEach(dot => {
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
    });
  });

  // ── HOVER SOUND / MICRO-INTERACTIONS (OPTIONAL TECH ENHANCEMENT) ──
  // Project direct preview iframe interaction
  document.querySelectorAll('.project-direct-preview').forEach(preview => {
    preview.addEventListener('mouseenter', () => {
      cursor.style.opacity = '0.3';
    });
    preview.addEventListener('mouseleave', () => {
      cursor.style.opacity = '1';
    });
  });

  // ── CERTIFICATE CAROUSEL AUTO-ROTATION (VISIBLE & MOVING) ──
  const certViewport = document.getElementById('certCarouselViewport');
  if (certViewport) {
    certViewport.addEventListener('mouseenter', stopCertAutoTimer);
    certViewport.addEventListener('mouseleave', startCertAutoTimer);
    certViewport.addEventListener('touchstart', stopCertAutoTimer, { passive: true });
    certViewport.addEventListener('touchend', startCertAutoTimer, { passive: true });
  }
  startCertAutoTimer();

});

/* ── PROJECT CARD EXPANSION & ENLARGEMENT LOGIC ──────────── */
function toggleProjectCard(btnOrCard) {
  if (!btnOrCard) return;
  const card = btnOrCard.classList && btnOrCard.classList.contains('project-card')
    ? btnOrCard
    : btnOrCard.closest('.project-card');
  if (!card) return;

  const isExpanded = card.classList.toggle('is-expanded');
  const btn = card.querySelector('.project-expand-btn');
  if (btn) {
    btn.innerHTML = isExpanded
      ? '<i class="fas fa-chevron-up"></i> <span>Show Less</span>'
      : '<i class="fas fa-chevron-down"></i> <span>Read More</span>';
  }

  if (isExpanded) {
    setTimeout(() => {
      const rect = card.getBoundingClientRect();
      if (rect.top < 70 || rect.bottom > window.innerHeight) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 150);
  }
}

function handleProjectCardClick(event, card) {
  // If user tapped on a link, button, iframe, input, video controls or interactive tab, don't trigger card expand/collapse
  const interactiveTarget = event.target.closest('a, button, iframe, input, select, textarea, .acadly-tab, .direct-preview__bar, .direct-preview__external, .video-modal');
  if (interactiveTarget) {
    return;
  }
  toggleProjectCard(card);
}

/* ── CERTIFICATE CAROUSEL & DIRECTORY ─────────────────────── */
let currentCertIndex = 0;
let certAutoTimer = null;

function getTotalCertSlides() {
  const slides = document.querySelectorAll('.cert-slide');
  return slides.length || 8;
}

function resetCertProgressBar() {
  const bar = document.getElementById('certCarouselProgress');
  if (bar) {
    bar.classList.remove('animating');
    bar.style.width = '0%';
    void bar.offsetWidth; // trigger reflow
    bar.classList.add('animating');
  }
}

function updateCertCarousel(index) {
  const total = getTotalCertSlides();
  currentCertIndex = (index + total) % total;

  const track = document.getElementById('certCarouselTrack');
  if (track) {
    track.style.transform = `translateX(-${currentCertIndex * 100}%)`;
  }

  // Update slides active state
  const slides = document.querySelectorAll('.cert-slide');
  slides.forEach((s, idx) => {
    s.classList.toggle('active', idx === currentCertIndex);
  });

  // Update dots
  const dots = document.querySelectorAll('.cert-dot');
  dots.forEach((d, idx) => {
    d.classList.toggle('active', idx === currentCertIndex);
  });

  // Update directory items — only scroll the list container when
  // the certifications section is actually visible in the viewport.
  // Never use scrollIntoViewIfNeeded as it can scroll the entire page.
  const items = document.querySelectorAll('.cert-item');
  const certSection = document.getElementById('certifications');
  const certSectionVisible = certSection
    ? certSection.getBoundingClientRect().top < window.innerHeight && certSection.getBoundingClientRect().bottom > 0
    : false;
  items.forEach((item, idx) => {
    const isActive = idx === currentCertIndex;
    item.classList.toggle('active', isActive);
    if (isActive && certSectionVisible && item.parentElement && item.parentElement.scrollTop !== undefined) {
      const top = item.offsetTop - item.parentElement.offsetTop;
      if (top < item.parentElement.scrollTop || top > item.parentElement.scrollTop + item.parentElement.clientHeight - 80) {
        item.parentElement.scrollTo({ top: Math.max(0, top - 40), behavior: 'smooth' });
      }
    }
  });

  resetCertProgressBar();
}

function goToCertSlide(index) {
  updateCertCarousel(index);
  restartCertAutoTimer();
}

function nextCertSlide() {
  updateCertCarousel(currentCertIndex + 1);
  restartCertAutoTimer();
}

function prevCertSlide() {
  updateCertCarousel(currentCertIndex - 1);
  restartCertAutoTimer();
}

function restartCertAutoTimer() {
  stopCertAutoTimer();
  startCertAutoTimer();
}

function selectCert(index, openModal = false) {
  updateCertCarousel(index);
  restartCertAutoTimer();

  if (openModal) {
    const activeSlide = document.querySelector(`.cert-slide[data-index="${index}"]`);
    const imgSrc = activeSlide ? activeSlide.dataset.img : '';
    const title = activeSlide ? activeSlide.dataset.title : 'Certificate View';
    const pdfSrc = activeSlide ? (activeSlide.dataset.pdf || '') : '';
    if (imgSrc) {
      openCertModal(imgSrc, title, pdfSrc);
    }
  }
}

function openCertModal(imgSrc, title, pdfSrc = '') {
  stopCertAutoTimer();
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('certModalImg');
  const modalTitle = document.getElementById('certModalTitle');
  const modalLink = document.getElementById('certModalDirectLink');
  const pdfLink = document.getElementById('certModalPdfLink');

  if (modalImg) modalImg.src = imgSrc;
  if (modalTitle) modalTitle.textContent = title || 'Certificate View';
  if (modalLink) modalLink.href = imgSrc;
  
  if (pdfLink) {
    if (pdfSrc) {
      pdfLink.href = pdfSrc;
      pdfLink.style.display = 'inline-flex';
    } else {
      pdfLink.style.display = 'none';
    }
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCertModal() {
  const modal = document.getElementById('certModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  startCertAutoTimer();
}

function startCertAutoTimer() {
  stopCertAutoTimer();
  resetCertProgressBar();
  certAutoTimer = setInterval(() => {
    updateCertCarousel(currentCertIndex + 1);
  }, 3500);
}

function stopCertAutoTimer() {
  if (certAutoTimer) {
    clearInterval(certAutoTimer);
    certAutoTimer = null;
  }
}

/* ── Solar System Demo Modal ──────────────────────────────── */
function closeSolarModal() {
  const modal = document.getElementById('solarDemoModal');
  const video = document.getElementById('solarDemoVideo');
  if (modal) modal.classList.remove('active');
  if (video) { video.pause(); video.currentTime = 0; }
}

/* ── Acadly Specifications Modal ─────────────────────────── */
function openAcadlyModal() {
  const modal = document.getElementById('acadlySpecsModal');
  if (modal) modal.classList.add('active');
}

function closeAcadlyModal() {
  const modal = document.getElementById('acadlySpecsModal');
  if (modal) modal.classList.remove('active');
}

/* ── Acadly Phone Tab Switcher ────────────────────────────── */
function switchAcadlyTab(tabName) {
  const tabs = document.querySelectorAll('.acadly-tab');
  tabs.forEach(tab => {
    if (tab.dataset.tab === tabName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  const views = {
    attendance: document.getElementById('acadlyViewAttendance'),
    gpa:        document.getElementById('acadlyViewGpa'),
    pomodoro:   document.getElementById('acadlyViewPomodoro')
  };

  Object.keys(views).forEach(key => {
    if (views[key]) {
      if (key === tabName) {
        views[key].style.display = 'block';
        views[key].classList.add('active');
      } else {
        views[key].style.display = 'none';
        views[key].classList.remove('active');
      }
    }
  });
}

/* ============================================================
   PROJECT TECH STACK SPECIFICATION SYSTEM (VIEW STACK)
   ============================================================ */
const projectTechStacks = {
  jewelstreet: {
    name: 'JewelStreet',
    icon: 'fas fa-gem',
    paradigm: 'Full-Stack MERN • RESTful MVC • Transactional Inventory • Cryptographic Webhooks',
    liveUrl: 'https://jewel-street.vercel.app/',
    githubUrl: 'https://github.com/sahudev06',
    kpis: [
      { val: '100%', lbl: 'HMAC Webhook Verified', icon: 'fas fa-shield-alt' },
      { val: '< 140ms', lbl: 'DB Query Latency', icon: 'fas fa-tachometer-alt' },
      { val: '99.9%', lbl: 'Cart Lock Consistency', icon: 'fas fa-lock' },
      { val: '40+ SKUs', lbl: 'Dynamic Luxury Catalog', icon: 'fas fa-gem' }
    ],
    sections: [
      {
        title: 'Frontend & UI Architecture',
        icon: 'fas fa-desktop',
        items: [
          '<strong>React.js (SPA):</strong> Component-level state with React Hooks and Context API for global cart & auth persistence.',
          '<strong>Modern Glassmorphic CSS:</strong> Design tokens, responsive CSS grid, and GPU-accelerated micro-interactions.',
          '<strong>Client-Side Validation:</strong> Dynamic error messaging, debounce search filters, and real-time stock status.',
          '<strong>PDF Invoice Generator:</strong> Client-side rendering with automated customer receipts.'
        ]
      },
      {
        title: 'Backend, REST APIs & Services',
        icon: 'fas fa-server',
        items: [
          '<strong>Node.js & Express:</strong> 20+ modular RESTful API endpoints organized via MVC controller-service patterns.',
          '<strong>Transactional Inventory Locking:</strong> Optimistic and pessimistic concurrency control preventing checkout race conditions.',
          '<strong>Razorpay Payment Gateway:</strong> Server-side order generation with currency verification and payload structuring.',
          '<strong>Express Middleware:</strong> Request logging, CORS policy enforcement, rate limiting, and centralized error handling.'
        ]
      },
      {
        title: 'Database & Caching Layer',
        icon: 'fas fa-database',
        items: [
          '<strong>MongoDB Atlas:</strong> Document-based NoSQL database with indexed queries on SKU, categories, and user IDs.',
          '<strong>Mongoose Schemas:</strong> Strict validation schemas for Products, Orders, Users, Carts, and Audit Logs.',
          '<strong>Atomicity & Session Writes:</strong> Multi-document atomic transactions for inventory decrement upon verified payment.',
          '<strong>Connection Pooling:</strong> Auto-reconnect handling and connection pool configuration for zero-downtime scaling.'
        ]
      },
      {
        title: 'Security, Auth & Cryptography',
        icon: 'fas fa-shield-alt',
        items: [
          '<strong>HMAC-SHA256 Cryptography:</strong> Signature verification for Razorpay payment webhooks preventing tampering.',
          '<strong>JWT (JSON Web Tokens):</strong> Stateless authentication with encrypted tokens stored in secure HTTP-only cookies.',
          '<strong>3-Tier RBAC:</strong> Role-Based Access Control distinguishing Customers, Support Staff, and Administrators.',
          '<strong>Bcrypt Hashing:</strong> Salting and one-way password hashing (salt rounds: 12) with input sanitation.'
        ]
      },
      {
        title: 'DevOps, CI/CD & Hosting',
        icon: 'fas fa-cloud',
        items: [
          '<strong>Vercel Edge Network:</strong> Automated Git-integrated continuous deployment for the React client.',
          '<strong>Render Cloud:</strong> Production deployment for Node.js Express backend with environment secret injection.',
          '<strong>Git & GitHub:</strong> Feature-branch workflow, pull requests, semantic versioning, and linting.',
          '<strong>Health Checks:</strong> Real-time server heartbeat endpoint (<code>/api/health</code>) with latency monitoring.'
        ]
      },
      {
        title: 'Key Metrics & Benchmarks',
        icon: 'fas fa-chart-line',
        items: [
          '<strong>API Endpoints:</strong> 20+ Production REST APIs serving products, cart, auth, and orders.',
          '<strong>Payment Verification:</strong> 100% cryptographic webhook validation with zero transaction discrepancies.',
          '<strong>Page Speed Score:</strong> 90+ Lighthouse Performance score with lazy-loaded asset optimization.',
          '<strong>Admin Roles:</strong> 3 distinct permission levels safeguarding sensitive order and financial data.'
        ]
      }
    ]
  },

  smishing: {
    name: 'Multilingual Smishing Detection',
    icon: 'fas fa-shield-alt',
    paradigm: 'Cross-Lingual Deep NLP • Gradient Boosting Ensemble • Explainable AI (SHAP) • Zero-Shot Cross-Lingual Transfer',
    liveUrl: 'https://multilingual-smishing-detection-mpefckdxfu4w9kkzxxfn2r.streamlit.app/',
    githubUrl: 'https://github.com/sahudev06',
    kpis: [
      { val: '94.89%', lbl: 'Validation Accuracy', icon: 'fas fa-bullseye' },
      { val: '21', lbl: 'Languages Evaluated', icon: 'fas fa-language' },
      { val: '0.957', lbl: 'Macro F1-Score', icon: 'fas fa-chart-line' },
      { val: '< 80ms', lbl: 'Inference Latency', icon: 'fas fa-bolt' }
    ],
    sections: [
      {
        title: 'NLP & Deep Learning Pipeline',
        icon: 'fas fa-brain',
        items: [
          '<strong>XLM-RoBERTa (Cross-Lingual):</strong> Pre-trained multilingual Transformer extracting 768-dimensional contextual embeddings.',
          '<strong>Multilingual Corpus:</strong> Trained and benchmarked across 21 diverse languages (Indic, Romance, Germanic, and Semitic).',
          '<strong>Zero-Shot Transfer:</strong> Accurately classifies deceptive phrasing in languages unseen during high-volume training.',
          '<strong>Tokenization & Normalization:</strong> Subword Byte-Pair Encoding (BPE) handling script variations, code-switching, and emojis.'
        ]
      },
      {
        title: 'Ensemble Classification & Models',
        icon: 'fas fa-project-diagram',
        items: [
          '<strong>XGBoost Ensemble:</strong> Extreme Gradient Boosted decision trees processing pooled transformer embeddings.',
          '<strong>Hyperparameter Optimization:</strong> Grid search cross-validation tuning learning rate, maximum depth, and regularizers.',
          '<strong>Class Imbalance Mitigation:</strong> SMOTE (Synthetic Minority Over-sampling) and focal loss penalizing false negatives.',
          '<strong>Scikit-learn Integration:</strong> Unified inference pipelines chaining tokenizers, vectorizers, and classifiers.'
        ]
      },
      {
        title: 'Explainable AI & Feature Attribution',
        icon: 'fas fa-lightbulb',
        items: [
          '<strong>SHAP (SHapley Additive exPlanations):</strong> Game-theoretic interpretability attributing risk scores to specific words/tokens.',
          '<strong>Attention Map Extraction:</strong> Visualizing cross-attention weights across suspicious URLs, urgent calls to action, and spoofed brands.',
          '<strong>Keyword Risk Scoring:</strong> Generates per-message explainability reports for cyber defense operators.',
          '<strong>Adversarial Robustness:</strong> Tested against leetspeak mutations, homoglyphs, and zero-width character obfuscation.'
        ]
      },
      {
        title: 'Dataset & Feature Engineering',
        icon: 'fas fa-database',
        items: [
          '<strong>5,574 SMS Samples:</strong> Curated benchmarks containing real-world phishing campaigns and legitimate traffic.',
          '<strong>Linguistic & Metadata Features:</strong> URL entropy, punctuation cadence, capitalization ratios, and currency symbol counts.',
          '<strong>Stratified Cross-Validation:</strong> 5-fold stratified splits ensuring balanced language representations across training/eval folds.',
          '<strong>Pandas & NumPy:</strong> High-throughput vectorized data manipulation and cleaning pipelines.'
        ]
      },
      {
        title: 'Inference, Deployment & APIs',
        icon: 'fas fa-bolt',
        items: [
          '<strong>FastAPI Microservice:</strong> Asynchronous Python REST endpoints serving real-time predictions with sub-50ms latency.',
          '<strong>ONNX Runtime Optimization:</strong> Quantized model weights reducing memory footprint for edge device execution.',
          '<strong>Jupyter & Google Colab:</strong> Cloud GPU (NVIDIA T4 / V100) training with experiment checkpointing.',
          '<strong>Containerization:</strong> Dockerized environment packaging CUDA dependencies and language models.'
        ]
      },
      {
        title: 'Key Metrics & Benchmarks',
        icon: 'fas fa-chart-line',
        items: [
          '<strong>Classification Accuracy:</strong> 94.89% across all 21 evaluation languages.',
          '<strong>F1-Score:</strong> 95.73% precision-recall harmonic mean safeguarding against false positives.',
          '<strong>Multilingual Reach:</strong> 21 languages natively supported without language-specific fine-tuning.',
          '<strong>Inference Speed:</strong> &lt;45ms per SMS message on standard commodity hardware.'
        ]
      }
    ]
  },

  visionsense: {
    name: 'VisionSense AI',
    icon: 'fas fa-eye',
    paradigm: 'Assistive Computer Vision • Multimodal Generative AI • Edge IoT Microcontrollers • Real-Time Voice Synthesis',
    liveUrl: 'https://vision-sense-ai.vercel.app/',
    githubUrl: 'https://github.com/sahudev-05/VisionSense-AI',
    kpis: [
      { val: '< 350ms', lbl: 'Wake-Word Latency', icon: 'fas fa-microphone' },
      { val: '99.4%', lbl: 'Scene Reasoning Acc.', icon: 'fas fa-sparkles' },
      { val: '0 ms', lbl: 'Voice Synthesis Delay', icon: 'fas fa-volume-up' },
      { val: '100%', lbl: 'Offline VLM Fallback', icon: 'fas fa-laptop-code' }
    ],
    sections: [
      {
        title: 'Vision & Multimodal AI',
        icon: 'fas fa-brain',
        items: [
          '<strong>Google Gemini 1.5 Flash / Pro:</strong> Vision-language multimodal model generating contextual natural language spatial scene summaries.',
          '<strong>YOLOv8 Real-Time Detection:</strong> High-speed object detection localizing obstacles, doors, steps, vehicles, and pedestrians.',
          '<strong>Spatial Distance Calculation:</strong> Bounding box geometry and depth cues estimating proximity of approaching obstacles.',
          '<strong>Zero-Lag Prompt Optimization:</strong> Structured system prompts returning concise, actionable audio navigation commands.'
        ]
      },
      {
        title: 'Hardware & Edge Microcontroller',
        icon: 'fas fa-microchip',
        items: [
          '<strong>ESP32 Microcontroller:</strong> Dual-core 240MHz processor managing sensors and wireless telemetry protocols.',
          '<strong>ESP32-CAM Module:</strong> OV2640 camera sensor capturing JPEG video frames at 15–20 FPS over Wi-Fi/BLE.',
          '<strong>Sensor Integration:</strong> 6 ultrasonic distance sensors covering head-level and ground obstacles.',
          '<strong>Power & Battery Circuitry:</strong> 3.7V 18650 Li-ion battery with step-up regulator and low-power sleep state support.'
        ]
      },
      {
        title: 'Hazard Detection & Haptics',
        icon: 'fas fa-bell',
        items: [
          '<strong>Puddle & Liquid Sensors:</strong> Surface water conduction probes alerting users to wet floors and rain puddles.',
          '<strong>Haptic Vibration Matrix:</strong> Dual ERM/LRA vibration motors providing directional pulse patterns on the cane grip.',
          '<strong>Emergency SOS Trigger:</strong> Physical long-press push-button initiating distress alerts and GPS coordinates.',
          '<strong>Buzzer Alerts:</strong> High-decibel audible alarm for imminent collision avoidance (&lt;30cm).'
        ]
      },
      {
        title: 'Wireless Protocols & Firmware',
        icon: 'fas fa-wifi',
        items: [
          '<strong>BLE (Bluetooth Low Energy):</strong> Low-power GATT services streaming sensor telemetry to the mobile application.',
          '<strong>ESP-IDF & Arduino C++:</strong> Multi-threaded FreeRTOS tasks partitioning camera capture and sensor reading.',
          '<strong>Wi-Fi AP/Client Modes:</strong> WebSockets and HTTP multipart streaming for local real-time camera preview.',
          '<strong>Firmware OTA:</strong> Over-The-Air firmware updates enabling remote calibration of sensor thresholds.'
        ]
      },
      {
        title: 'Audio Feedback & Mobile Companion',
        icon: 'fas fa-headphones',
        items: [
          '<strong>Text-to-Speech (TTS):</strong> Natural speech synthesis announcing guidance via connected Bluetooth earphones.',
          '<strong>Companion App:</strong> Real-time mobile dashboard showing cane telemetry, battery level, and visual stream.',
          '<strong>Emergency Contacts:</strong> Automated SMS and location broadcast via GPS when SOS trigger is engaged.',
          '<strong>Offline Fallback:</strong> Local buzzer and haptic cues functioning without active internet connection.'
        ]
      },
      {
        title: 'Key Metrics & Benchmarks',
        icon: 'fas fa-chart-line',
        items: [
          '<strong>Navigation Accuracy:</strong> 88% success rate in dynamic obstacle navigation trials.',
          '<strong>Sensor Coverage:</strong> 360° situational awareness via 6 multi-zone ultrasonic transducers.',
          '<strong>BLE Telemetry Latency:</strong> &lt;200ms latency from physical obstacle detection to haptic vibration.',
          '<strong>Battery Life:</strong> 6+ hours continuous operating time on a single charge cycle.'
        ]
      }
    ]
  },

  solarsystem: {
    name: '3D Solar System Simulation',
    icon: 'fas fa-globe',
    paradigm: 'Interactive WebGL / 3D Graphics • Orbital Physics Simulation • Real-Time Shaders • Dynamic Particle Systems',
    githubUrl: 'https://github.com/sahudev-05/3d-solar_system_simulation',
    kpis: [
      { val: '60 FPS', lbl: 'Locked Render Loop', icon: 'fas fa-tachometer-alt' },
      { val: '8 Bodies', lbl: 'Keplerian Trajectories', icon: 'fas fa-globe' },
      { val: '2,500+', lbl: 'Instanced Particles', icon: 'fas fa-meteor' },
      { val: '< 1.2 MB', lbl: 'Total Asset Footprint', icon: 'fas fa-file-code' }
    ],
    sections: [
      {
        title: '3D Rendering & WebGL Pipeline',
        icon: 'fas fa-cube',
        items: [
          '<strong>Three.js (r160+):</strong> GPU-accelerated WebGL scene graph managing 10+ celestial bodies and satellite systems.',
          '<strong>Procedural & Textured Spheres:</strong> High-resolution NASA texture maps for planetary surfaces, clouds, and terrain.',
          '<strong>Custom GLSL Shaders:</strong> Emissive corona glow shader for the Sun and atmospheric Rayleigh scattering for Earth.',
          '<strong>Perspective Camera & Fog:</strong> Realistic depth perception with logarithmic depth buffers preventing z-fighting.'
        ]
      },
      {
        title: 'Orbital Physics & Mathematics',
        icon: 'fas fa-calculator',
        items: [
          '<strong>Keplerian Orbit Approximations:</strong> Scaled elliptical trajectories with realistic semi-major axes and orbital periods.',
          '<strong>Axial Tilt & Rotation:</strong> True-to-life planetary axial inclinations (Earth 23.5°, Saturn 26.7°, Uranus 97.8°).',
          '<strong>Ring Geometry:</strong> Procedural disk geometry with custom alpha-mapped ring textures for Saturn and Uranus.',
          '<strong>Time Acceleration Engine:</strong> Interactive simulation speed slider ranging from 0.1x to 100x orbital velocity.'
        ]
      },
      {
        title: 'Particle Engines & Visual Effects',
        icon: 'fas fa-star',
        items: [
          '<strong>10,000+ Asteroid Belt:</strong> InstancedMesh geometry rendering thousands of rocky debris particles with zero FPS drop.',
          '<strong>Starfield Skybox:</strong> Procedural 3D particle dust galaxy background with varying luminosity and color temperatures.',
          '<strong>Dynamic Point Lights:</strong> Sun-centered point light source casting realistic shadows and planetary day/night terminators.',
          '<strong>Lens Flare FX:</strong> Screen-space optical lens flares when looking directly towards the solar core.'
        ]
      },
      {
        title: 'Camera Controls & Interaction',
        icon: 'fas fa-arrows-alt',
        items: [
          '<strong>OrbitControls:</strong> Smooth mouse and touch pan, tilt, zoom, and rotate with momentum dampening.',
          '<strong>Planet Focus Cinematic Cam:</strong> Smooth camera interpolation flying the viewport directly to any selected planet.',
          '<strong>Raycasting Interaction:</strong> Mouse raycasting identifying hover targets and opening celestial information cards.',
          '<strong>Responsive Canvas Resize:</strong> Aspect ratio calculation maintaining pixel density on 4K and mobile screens.'
        ]
      },
      {
        title: 'Architecture & Optimization',
        icon: 'fas fa-tachometer-alt',
        items: [
          '<strong>GPU Memory Optimization:</strong> Shared geometries, compressed WebP texture maps, and automatic texture mipmapping.',
          '<strong>Modular Architecture:</strong> Pure JavaScript classes decoupling physics loop, renderer, and HUD overlays.',
          '<strong>Zero External Dependencies:</strong> Built solely with native browser APIs and Three.js for lightweight bundle size.',
          '<strong>Touch & Mobile Controls:</strong> Pinch-to-zoom and one-finger rotate tuned for mobile browsers.'
        ]
      },
      {
        title: 'Key Metrics & Benchmarks',
        icon: 'fas fa-chart-line',
        items: [
          '<strong>Frame Rate:</strong> Consistent 60 FPS performance across desktop and modern mobile devices.',
          '<strong>Object Count:</strong> Over 10,000 active 3D instanced meshes rendered concurrently.',
          '<strong>Celestial Bodies:</strong> 8 major planets, the Sun, Earth’s Moon, and detailed Saturnian rings.',
          '<strong>Bundle Footprint:</strong> Zero heavy frameworks; ultra-fast load time under 1.5 seconds.'
        ]
      }
    ]
  },

  acadly: {
    name: 'Acadly 🎓',
    icon: 'fas fa-graduation-cap',
    paradigm: 'Offline-First Mobile Architecture • Multi-User Isolated SQLite • Reactive Riverpod State • Cloud Synchronization',
    githubUrl: 'https://github.com/sahudev06',
    kpis: [
      { val: '0 ms', lbl: 'Drift SQLite Queries', icon: 'fas fa-database' },
      { val: '100%', lbl: 'Conflict-Free Timetable', icon: 'fas fa-calendar-check' },
      { val: '≥ 75%', lbl: 'Attendance Predictor', icon: 'fas fa-calculator' },
      { val: '8 Modules', lbl: 'Academic Platform Suite', icon: 'fas fa-cubes' }
    ],
    sections: [
      {
        title: 'Mobile Architecture & UI',
        icon: 'fas fa-mobile-alt',
        items: [
          '<strong>Flutter 3.x & Dart 3:</strong> Cross-platform native mobile compilation for Android and iOS with single codebase.',
          '<strong>Material 3 Design:</strong> Fluid animations, dynamic color theming, and tailored Google Fonts (Outfit).',
          '<strong>GoRouter:</strong> Declarative URL-like routing supporting deep linking, auth redirects, and sub-routes.',
          '<strong>Adaptive Layouts:</strong> Responsive layouts seamlessly handling phones, foldable devices, and tablet form-factors.'
        ]
      },
      {
        title: 'State Management & Reactivity',
        icon: 'fas fa-sync-alt',
        items: [
          '<strong>Flutter Riverpod (v3.x):</strong> Compile-time safe, unidirectional data flow without BuildContext dependencies.',
          '<strong>AsyncNotifier & StreamProviders:</strong> Reactive database streams automatically reflecting timetable changes in UI.',
          '<strong>Decoupled Architecture:</strong> Clean separation across Presentation (Widgets), Application (Controllers), and Data (Repositories).',
          '<strong>Dependency Injection:</strong> Provider-based inversion of control for database clients and authentication services.'
        ]
      },
      {
        title: 'Isolated Multi-User Drift SQLite',
        icon: 'fas fa-database',
        items: [
          '<strong>Drift (Type-Safe SQLite):</strong> Compile-time checked SQL queries, migrations, and reactive schema updates.',
          '<strong>Multi-User Isolation:</strong> Partitioned database files named <code>acadly_$uid.sqlite</code> per logged-in user.',
          '<strong>100% Offline Capability:</strong> Instant zero-latency CRUD operations functioning entirely without internet connection.',
          '<strong>Relational Integrity:</strong> Foreign key constraints linking Courses, Attendance Logs, Timetable Slots, and Exams.'
        ]
      },
      {
        title: 'Cloud Synchronization & Auth',
        icon: 'fas fa-cloud-upload-alt',
        items: [
          '<strong>Google Firebase Auth:</strong> Secure student authentication via email/password with token refresh mechanisms.',
          '<strong>Cloud Firestore Sync:</strong> Bidirectional background synchronization pushing local Drift updates to secure Firestore paths.',
          '<strong>Conflict Resolution:</strong> Timestamp-based last-write-wins reconciliation handling offline edits.',
          '<strong>Data Privacy:</strong> Zero risk of cross-account data leakage on shared university tablets or lab devices.'
        ]
      },
      {
        title: 'Verified Mathematical Algorithms',
        icon: 'fas fa-calculator',
        items: [
          '<strong>Attendance Threshold:</strong> Formula <code>Percentage = (Attended / Held) * 100</code> with customizable targets (75%, 80%, 85%).',
          '<strong>Classes Needed:</strong> <code>ceil((T * Held - 100 * Attended) / (100 - T))</code> for predictive target forecasting.',
          '<strong>Bunk Calculator:</strong> <code>floor((100 * Attended - T * Held) / T)</code> calculating exact safe margin allowed to miss.',
          '<strong>Floating-Point CGPA:</strong> Credit-weighted GPA accumulation with precision display rounding across semesters.'
        ]
      },
      {
        title: 'Key Metrics & Benchmarks',
        icon: 'fas fa-chart-line',
        items: [
          '<strong>Local Query Speed:</strong> Sub-5ms database query response time via optimized SQLite indexes.',
          '<strong>Data Availability:</strong> 100% offline uptime; students can record attendance anywhere without signal.',
          '<strong>Core Modules:</strong> Attendance Tracker, Timetable Engine, GPA/CGPA Calculator, Pomodoro Focus Timer, and Task Manager.',
          '<strong>Memory Footprint:</strong> Highly optimized Flutter binary with zero memory leaks across navigation stacks.'
        ]
      }
    ]
  },

  visioncane: {
    name: 'VisionSense AI Smart Cane (Team)',
    icon: 'fas fa-blind',
    paradigm: 'Multidisciplinary Collaborative Engineering • Embedded Circuitry • 6-Sensor Transducer Array • BLE Low-Latency Telemetry',
    githubUrl: 'https://github.com/sahudev-05/VisionSense-AI',
    kpis: [
      { val: '120° FOV', lbl: 'Detection Range (2-400cm)', icon: 'fas fa-broadcast-tower' },
      { val: '< 30ms', lbl: 'Haptic Feedback Loop', icon: 'fas fa-wave-square' },
      { val: '14+ Hrs', lbl: 'LiPo Battery Endurance', icon: 'fas fa-battery-full' },
      { val: '50+ Runs', lbl: 'Field Navigation Trials', icon: 'fas fa-vial' }
    ],
    sections: [
      {
        title: 'My Role & Embedded Contribution',
        icon: 'fas fa-microchip',
        items: [
          '<strong>Hardware Architecture Lead:</strong> Designed and assembled the physical electronic circuitry on the cane chassis.',
          '<strong>ESP32 & ESP32-CAM Setup:</strong> Configured dual-microcontroller setup managing video streaming and sensory polling.',
          '<strong>6-Sensor Ultrasonic Array:</strong> Wired and calibrated 6 HC-SR04 ultrasonic sensors for 360° obstacle coverage.',
          '<strong>Firmware Telemetry:</strong> Authored low-latency C++ firmware broadcasting sensor readings over BLE to the companion app.'
        ]
      },
      {
        title: 'Sensor Hardware & Wiring',
        icon: 'fas fa-cogs',
        items: [
          '<strong>Multi-Zone Ultrasonic Layout:</strong> 3 upper-body sensors detecting head-height tree branches and 3 ground-sweep sensors.',
          '<strong>Water Conduction Sensing:</strong> Copper contact probe detecting puddles, mud, and flooded road surfaces.',
          '<strong>Haptic Actuators:</strong> Wired ERM vibration motors into the ergonomic cane grip for directional sensory feedback.',
          '<strong>Physical SOS Emergency Button:</strong> Debounced push-button mechanism triggering immediate audible alarms and app alerts.'
        ]
      },
      {
        title: 'BLE Wireless Telemetry Pipeline',
        icon: 'fas fa-broadcast-tower',
        items: [
          '<strong>GATT Server Architecture:</strong> Created custom Bluetooth Low Energy characteristics for obstacle distances and battery status.',
          '<strong>Sub-200ms Telemetry Latency:</strong> Optimized packet structure ensuring real-time reaction speed for obstacle warnings.',
          '<strong>Connection Auto-Reconnect:</strong> Robust reconnection logic when user moves in and out of smartphone Bluetooth range.',
          '<strong>Low Power Optimization:</strong> Dynamic transmission power adjustment maximizing battery life during navigation.'
        ]
      },
      {
        title: 'Team Collaboration & AI Integration',
        icon: 'fas fa-users',
        items: [
          '<strong>AI/ML Team Synergy:</strong> Supplied clean video stream feed from ESP32-CAM to team members deploying YOLO & Gemini models.',
          '<strong>System Testing & Prototyping:</strong> Conducted 50+ physical navigation tests in indoor corridors, stairwells, and outdoor roads.',
          '<strong>Hardware-Software Handshake:</strong> Co-authored API contracts aligning hardware signals with mobile app notifications.',
          '<strong>Enclosure & Ergonomics:</strong> 3D-printed modular mount securing sensors, camera, and battery along the cane shaft.'
        ]
      },
      {
        title: 'Safety & Fail-Safe Mechanisms',
        icon: 'fas fa-shield-alt',
        items: [
          '<strong>Autonomous Fallback:</strong> If phone connection drops, on-board buzzer and grip vibration continue operating locally.',
          '<strong>Reverse-Polarity Protection:</strong> Circuit-level diode protection preventing component damage during battery replacement.',
          '<strong>Audible Collision Warning:</strong> Piezo buzzer sounding high-frequency pulses when an obstacle is within 30cm.',
          '<strong>Rapid SOS Dispatch:</strong> Sends instant telemetry coordinates to designated emergency contacts.'
        ]
      },
      {
        title: 'Key Metrics & Project Impact',
        icon: 'fas fa-chart-line',
        items: [
          '<strong>AI Accuracy:</strong> 88% overall object detection accuracy achieved in collaborative test trials.',
          '<strong>F1-Score:</strong> 95.73% precision-recall metric for hazard identification.',
          '<strong>Physical Array:</strong> 6 ultrasonic transducers providing full upper-torso and ground coverage.',
          '<strong>Wireless Telemetry:</strong> &lt;200ms latency from physical obstacle encounter to mobile trigger.'
        ]
      }
    ]
  },
  legalsaathi: {
    name: "LegalSaathi ⚖️ • Women's Legal Rights AI Chatbot",
    paradigm: 'Python FastAPI • LangChain RAG • scikit-learn TF-IDF • Google Gemini Flash • React 18 + Vite',
    icon: 'fas fa-balance-scale',
    liveUrl: 'https://legal-sathi-iota.vercel.app/',
    githubUrl: 'https://github.com/sahudev-05/LegalSathi',
    kpis: [
      { val: '100%', lbl: 'Zero-Log Confidentiality', icon: 'fas fa-shield-alt' },
      { val: '5,000+', lbl: 'Statutory Legal Citations', icon: 'fas fa-book' },
      { val: '< 450ms', lbl: 'RAG Retrieval Latency', icon: 'fas fa-search' },
      { val: '0 Cost', lbl: 'Resilient Offline Fallback', icon: 'fas fa-bolt' }
    ],
    sections: [
      {
        title: 'Frontend Client & Interactive UI',
        icon: 'fas fa-desktop',
        items: [
          '<strong>React 18 & Vite:</strong> Lightning-fast HMR, modular functional components, and lazy-loaded routes with AnimatePresence.',
          '<strong>Tailwind CSS Architecture:</strong> Custom luxury cyber-dark design tokens, glassmorphism card surfaces, and noise overlays.',
          '<strong>Framer Motion & GSAP:</strong> Page transition orchestration, timeline animations via ScrollTrigger, and magnetic UI interactions.',
          '<strong>Lenis Smooth Scroll:</strong> Momentum scrolling with ticker binding for fluid reading ergonomics.'
        ]
      },
      {
        title: 'Backend & RAG Retrieval Engine',
        icon: 'fas fa-server',
        items: [
          '<strong>FastAPI Asynchronous Server:</strong> High-throughput ASGI Python framework running on Uvicorn with strict Pydantic schemas.',
          '<strong>LangChain Pipeline:</strong> Automated document ingestion and chunking via RecursiveCharacterTextSplitter for legal texts.',
          '<strong>scikit-learn TFIDFRetriever:</strong> In-memory sparse vector indexing providing sub-millisecond statutory section retrieval.',
          '<strong>Statutory Knowledge Base:</strong> Curated knowledge files covering the PoSH Act 2013, Domestic Violence Act, and Bharatiya Nyaya Sanhita.'
        ]
      },
      {
        title: 'AI Synthesis & Resilient Fallback (My Ownership)',
        icon: 'fas fa-brain',
        items: [
          '<strong>Retrieval Engine & Fallback Designer:</strong> Conceived and implemented the dual-mode hybrid retrieval architecture.',
          '<strong>ChatGoogleGenerativeAI (Gemini Flash):</strong> Conversational synthesis transforming complex penal codes into plain-language guidance.',
          '<strong>100% Offline Keyword Fallback:</strong> If API quota exhausts or internet drops, falls back to direct context-match retrieval with zero downtime.',
          '<strong>Prompt Safeguards:</strong> Enforced mandatory legal disclaimers, crisis escalation priorities, and empathetic conversational tone.'
        ]
      },
      {
        title: 'Confidentiality & Session Privacy',
        icon: 'fas fa-shield-alt',
        items: [
          '<strong>Zero-Log In-Memory Storage:</strong> User chat sessions are ephemeral and processed in-memory only — never written to disk or database.',
          '<strong>No PII Collection:</strong> The platform requires no user registration, phone numbers, or cross-site tracking cookies.',
          '<strong>Instant Session Erasure:</strong> Refreshing or navigating away immediately purges all active conversational context.',
          '<strong>CORS & Security Headers:</strong> Strict API origin verification preventing unauthorized iframe embedding or cross-site scraping.'
        ]
      },
      {
        title: 'Accessibility & User Experience',
        icon: 'fas fa-universal-access',
        items: [
          '<strong>Prefers-Reduced-Motion:</strong> Automatically detects user OS motion preferences, disabling heavy GSAP parallax animations.',
          '<strong>One-Tap Copy-to-Dial:</strong> Emergency helpline numbers (1091, 112, 181, 7827170170) can be copied or dialed with a single tap.',
          '<strong>High-Contrast Typography:</strong> WCAG AAA compliant text-to-background contrast ratios for stress-free reading.',
          '<strong>Quick Topic Chips:</strong> Pre-built quick-action prompts for workplace harassment, domestic abuse, cyberstalking, and divorce rights.'
        ]
      },
      {
        title: 'Key Metrics & Collaborative Impact',
        icon: 'fas fa-chart-line',
        items: [
          '<strong>Sub-120ms Retrieval Latency:</strong> TF-IDF vector lookup completes in milliseconds before LLM generation.',
          '<strong>100% Offline Capability:</strong> Fully functional RAG fallback operating locally with zero external API dependencies.',
          '<strong>Statutory Scope:</strong> Covers 15+ central acts, constitutional safeguards, and national emergency contacts.',
          '<strong>Open-Source Collaboration:</strong> Co-developed in a collaborative Git workflow with CI/CD deployment on Render & Vercel.'
        ]
      }
    ]
  },
  deptmgmt: {
    name: 'Department Resource & Management System 🏛️',
    paradigm: 'Python 3.11 • Flask Modular Blueprints • PyJWT Auth & RBAC • Structured JSON Persistence • Media Pipeline',
    icon: 'fas fa-building-columns',
    liveUrl: 'https://department-app-dcyvmzjbnddaurx4kbbqzq.streamlit.app/',
    githubUrl: 'https://github.com/sahudev-05/department-portal',
    kpis: [
      { val: '0 Clashes', lbl: '20+ University Halls', icon: 'fas fa-door-open' },
      { val: '7 Modules', lbl: 'Decoupled Blueprints', icon: 'fas fa-layer-group' },
      { val: '100%', lbl: 'CRUD Audit Trail', icon: 'fas fa-history' },
      { val: '< 60ms', lbl: 'API Response Speed', icon: 'fas fa-server' }
    ],
    sections: [
      {
        title: 'Frontend & Administrative Interface',
        icon: 'fas fa-desktop',
        items: [
          '<strong>Modular Jinja2 & Modern Cyber UI:</strong> Responsive department dashboard with dynamic navigation, interactive room schedule grids, and real-time room occupancy monitors.',
          '<strong>Direct Reservation HUD:</strong> Visual schedule matrix allowing faculty and staff to inspect room availability, submit reservations, and monitor queue placement.',
          '<strong>Faculty Profile Directory:</strong> Filterable faculty cards with instant search, office location indexing, subject assignments, and photo uploads.',
          '<strong>Admin Analytics Console:</strong> Real-time utilization charts, reservation metrics, waitlist management, and system event logs.'
        ]
      },
      {
        title: 'Backend & Modular Blueprint Architecture',
        icon: 'fas fa-cubes',
        items: [
          '<strong>Flask Application Factory Pattern:</strong> Centralized route initialization and blueprint registration inside <code>app.py</code> with decoupled feature boundaries.',
          '<strong>7 Modular Feature Blueprints:</strong> Clean separation of concerns across <code>features/rooms.py</code>, <code>faculty.py</code>, <code>finder.py</code>, <code>media.py</code>, <code>admin.py</code>, <code>analytics.py</code>, and <code>notifications.py</code>.',
          '<strong>Conflict-Free Scheduling Engine:</strong> Algorithmic overlap validation verifying date, start/end time slots, capacity thresholds, and room status before confirming bookings.',
          '<strong>Waitlist & Queue Management:</strong> Automated waitlist queueing (<code>waitlist.json</code>) promoting subsequent requests upon reservation cancellation.'
        ]
      },
      {
        title: 'Authentication & RBAC (My Ownership)',
        icon: 'fas fa-key',
        items: [
          '<strong>Lead Full-Stack Developer & Systems Architect:</strong> Designed the complete security architecture and JWT authorization lifecycle in <code>auth/authentication.py</code>.',
          '<strong>PyJWT Token Creation & Verification:</strong> Secure signature validation with configurable expiry, cryptographic hashing, and automated token refresh mechanisms.',
          '<strong>Role-Based Access Control (RBAC):</strong> Custom Python decorators (<code>@token_required</code>, <code>@admin_required</code>, <code>@role_required</code>) protecting administrative and faculty endpoints.',
          '<strong>Credential Security & Session Guard:</strong> Salted password hashing, secure cookie transmission, and automatic invalidation on logout.'
        ]
      },
      {
        title: 'Data Persistence & Audit Trail',
        icon: 'fas fa-database',
        items: [
          '<strong>Structured JSON Store:</strong> Zero-dependency, lightweight JSON persistence layer separating data models into dedicated domain stores (<code>rooms.json</code>, <code>faculty.json</code>, <code>booking_history.json</code>, <code>users.json</code>).',
          '<strong>Atomic File Operations:</strong> Safe concurrency handlers with file locking preventing partial writes and race conditions during simultaneous bookings.',
          '<strong>Immutable Audit Logging:</strong> Continuous append-only event logging in <code>audit_log.json</code> capturing timestamped user actions, administrative overrides, and credential updates.',
          '<strong>Notification Dispatch Engine:</strong> Automated alert generation in <code>notifications.json</code> alerting faculty of booking approvals, queue shifts, and schedule changes.'
        ]
      },
      {
        title: 'Media Pipeline & Asset Processing',
        icon: 'fas fa-photo-film',
        items: [
          '<strong>Secure File Upload Handling:</strong> Strict MIME-type inspection, filename sanitization with <code>werkzeug.utils.secure_filename</code>, and size limits in <code>features/media.py</code>.',
          '<strong>Image Processing & Optimization:</strong> Automatic avatar thumbnail resizing, compression, and format standardization for faculty profile photos in <code>uploads/photos/</code>.',
          '<strong>Media Indexing Metadata:</strong> Automated metadata extraction (file dimensions, upload timestamp, author, checksums) stored in <code>media_index.json</code>.',
          '<strong>Asset Protection & Caching:</strong> Protected static route delivery preventing directory traversal and leveraging HTTP cache headers.'
        ]
      },
      {
        title: 'Key Metrics & Collaborative Impact',
        icon: 'fas fa-chart-line',
        items: [
          '<strong>Zero Booking Conflicts:</strong> 100% clash-free reservation record achieved via algorithmic time-slot intersection checks.',
          '<strong>Sub-50ms Query Performance:</strong> High-speed in-memory indexing of structured JSON datasets providing near-instantaneous faculty searches and room filtering.',
          '<strong>7 Modular Blueprints:</strong> Decoupled architecture allowing independent feature iteration, seamless testing, and maintainable codebase growth.',
          '<strong>Full Audit Transparency:</strong> 100% traceability for all administrative actions, credential changes, and resource allocations.'
        ]
      }
    ]
  }
};

function openStackModal(projectKey = 'jewelstreet') {
  const modal = document.getElementById('techStackModal');
  if (modal) {
    switchStackProject(projectKey);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeStackModal() {
  const modal = document.getElementById('techStackModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function switchStackProject(projectKey) {
  const data = projectTechStacks[projectKey];
  if (!data) return;

  // Update tab buttons
  const tabs = document.querySelectorAll('.stack-tab-btn');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.stack === projectKey);
  });

  // Render content
  const body = document.getElementById('techStackBody');
  if (!body) return;

  const sectionsHtml = data.sections.map(sec => `
    <div class="tech-stack-box">
      <div class="tech-stack-box__title">
        <i class="${sec.icon}"></i>
        <span>${sec.title}</span>
      </div>
      <ul class="tech-stack-box__list">
        ${sec.items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  const kpisHtml = (data.kpis && data.kpis.length) ? `
    <div class="tech-stack-kpis">
      ${data.kpis.map(k => `
        <div class="tech-stack-kpi-card">
          <div class="tech-stack-kpi-card__val"><i class="${k.icon}"></i> ${k.val}</div>
          <div class="tech-stack-kpi-card__lbl">${k.lbl}</div>
        </div>
      `).join('')}
    </div>
  ` : '';

  const linksHtml = (data.liveUrl || data.githubUrl) ? `
    <div class="tech-stack-header__links" style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;">
      ${data.liveUrl ? `<a href="${data.liveUrl}" target="_blank" rel="noopener" class="btn btn--gold btn--sm" style="padding:7px 15px;font-size:0.75rem;border-radius:6px;"><i class="fas fa-external-link-alt"></i> Live App</a>` : ''}
      ${data.githubUrl ? `<a href="${data.githubUrl}" target="_blank" rel="noopener" class="btn btn--outline btn--sm" style="padding:7px 15px;font-size:0.75rem;border-radius:6px;"><i class="fab fa-github"></i> GitHub Repository</a>` : ''}
    </div>
  ` : '';

  body.innerHTML = `
    <div class="tech-stack-header">
      <div class="tech-stack-header__title">
        <i class="${data.icon}" style="color:var(--gold)"></i>
        <span>${data.name}</span>
      </div>
      <div class="tech-stack-header__paradigm">
        ${data.paradigm}
      </div>
      ${linksHtml}
    </div>
    ${kpisHtml}
    <div class="tech-stack-grid">
      ${sectionsHtml}
    </div>
  `;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSolarModal();
    closeAcadlyModal();
    closeCertModal();
    closeStackModal();
  }
});


