/* ═══════════════════════════════════════════════════
   CONFIGURAÇÃO — edite os valores abaixo
═══════════════════════════════════════════════════ */
const CONFIG = {
  // Data e hora de início do namoro (formato ISO 8601)
  // Exemplo: '2025-04-09T18:30:00'
  START_DATE: new Date('2025-04-11T00:00:00-03:00'), // 11/04/2025 meia-noite, horário de Brasília

  // Duração de cada foto no slideshow (em ms)
  SLIDE_DURATION: 95,

  // Duração da animação do contador 1→365 (em ms)
  COUNTER_DURATION: 3200,
};

/* ═══════════════════════════════════════════════════
   FOTOS (ordem cronológica)
═══════════════════════════════════════════════════ */
const ALL_PHOTOS = [
  'photos/IMG-20250412-WA0005.jpg',
  'photos/IMG-20250419-WA0077(4).jpg',
  'photos/IMG-20250419-WA0079.jpg',
  'photos/IMG-20250215-WA0134(1).jpg',
  'photos/IMG-20250215-WA0141.jpg',
  'photos/IMG-20250221-WA0074(1).jpg',
  'photos/IMG-20250222-WA0072(1).jpg',
  'photos/IMG-20250222-WA0082(1).jpg',
  'photos/IMG-20250222-WA0121(1).jpg',
  'photos/IMG-20250222-WA0139(1).jpg',
  'photos/IMG-20250222-WA0141(1).jpg',
  'photos/IMG-20250222-WA0146.jpg',
  'photos/IMG-20250301-WA0077(1).jpg',
  'photos/IMG-20250302-WA0033(2).jpg',
  'photos/IMG-20250302-WA0042(2).jpg',
  'photos/IMG-20250302-WA0043(1).jpg',
  'photos/IMG-20250321-WA0021(2).jpg',
  'photos/IMG-20250406-WA0018(1).jpg',
  'photos/IMG-20250424-WA0092.jpg',
  'photos/IMG-20250504-WA0024(2).jpg',
  'photos/IMG-20250504-WA0032.jpg',
  'photos/IMG-20250504-WA0033(1).jpg',
  'photos/IMG-20250504-WA0042.jpg',
  'photos/IMG-20250504-WA0045.jpg',
  'photos/IMG-20250504-WA0052.jpg',
  'photos/IMG-20250504-WA0058(2).jpg',
  'photos/IMG-20250505-WA0029.jpg',
  'photos/IMG-20250505-WA0033(3).jpg',
  'photos/IMG-20250506-WA0071(1).jpg',
  'photos/IMG-20250608-WA0058(1).jpg',
  'photos/IMG-20250608-WA0061(3).jpg',
  'photos/IMG-20250615-WA0001.jpg',
  'photos/IMG-20250615-WA0050.jpg',
  'photos/IMG-20250619-WA0060.jpg',
  'photos/IMG-20250720-WA0032(1).jpg',
  'photos/IMG-20250720-WA0033.jpg',
  'photos/IMG-20250820-WA0019(2).jpg',
  'photos/IMG-20250824-WA0057(2).jpg',
  'photos/IMG-20251118-WA0091(2).jpg',
  'photos/IMG-20251118-WA0093(2).jpg',
  'photos/IMG-20251118-WA0095(2).jpg',
  'photos/IMG-20251118-WA0098(2).jpg',
  'photos/IMG-20260118-WA0274.jpg',
  'photos/IMG-20260118-WA0318.jpg',
  'photos/IMG-20260118-WA0345(1).jpg',
  'photos/IMG-20260118-WA0379.jpg',
  'photos/IMG-20260222-WA0125.jpg',
  'photos/IMG-20260222-WA0188.jpg',
  'photos/IMG-20260222-WA0198.jpg',
  'photos/IMG-20260222-WA0200.jpg',
  'photos/IMG-20260222-WA0201.jpg',
  'photos/IMG-20260222-WA0209.jpg',
  'photos/IMG-20260222-WA0219.jpg',
  'photos/IMG-20260329-WA0081.jpg',
  'photos/IMG-20260408-WA0075.jpg',
  'photos/IMG-20260408-WA0077.jpg',
  'photos/IMG-20260408-WA0098.jpg',
  'photos/IMG-20260408-WA0111.jpg',
  'photos/IMG-20260408-WA0112.jpg',
  'photos/IMG-20260408-WA0113.jpg',
  'photos/IMG-20260408-WA0114.jpg',
];

/* ═══════════════════════════════════════════════════
   UTILITÁRIOS
═══════════════════════════════════════════════════ */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Easing dramático: arranca devagar, acelera no meio, desacelera no final
function easeInOutQuint(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function pad(n) {
  return String(Math.floor(n)).padStart(2, '0');
}

/* ═══════════════════════════════════════════════════
   INTRO
═══════════════════════════════════════════════════ */
const introEl      = document.getElementById('intro');
const mainSiteEl   = document.getElementById('main-site');
const slideshowEl  = document.getElementById('intro-slideshow');
const slideshowImg = document.getElementById('slideshow-img');
const counterWrap  = document.getElementById('intro-counter');
const counterNum   = document.getElementById('counter-num');
const finalWrap    = document.getElementById('intro-final');
const introTitle   = document.getElementById('intro-title');
const introNames   = document.getElementById('intro-names');
const introBtn     = document.getElementById('intro-btn');
const introOrnament = document.querySelector('.intro-ornament');
const introTagline  = document.querySelector('.intro-tagline');

function showMainSite() {
  introEl.classList.add('fade-out');
  mainSiteEl.classList.add('visible');
  mainSiteEl.removeAttribute('style');
  setTimeout(() => {
    introEl.style.display = 'none';
  }, 900);
  startMainSite();
}

function initIntro() {
  // Pre-load images then run slideshow
  preloadPhotos(ALL_PHOTOS).then(() => {
    runSlideshow()
      .then(() => runCounter())
      .then(() => showFinalMessage());
  });

  introBtn.addEventListener('click', showMainSite);
  initMusic();
}

function preloadPhotos(photos) {
  return new Promise(resolve => {
    let loaded = 0;
    const total = photos.length;
    const timeout = setTimeout(resolve, 3500); // max 3.5s wait

    photos.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded >= total) {
          clearTimeout(timeout);
          resolve();
        }
      };
      img.src = src;
    });
  });
}

function runSlideshow() {
  return new Promise(resolve => {
    let index = 0;
    const total = ALL_PHOTOS.length;

    function showNext() {
      if (index >= total) {
        // Fade out slideshow
        slideshowEl.style.transition = 'opacity 0.5s ease';
        slideshowEl.style.opacity = '0';
        setTimeout(resolve, 550);
        return;
      }

      slideshowImg.style.opacity = '0';
      slideshowImg.src = ALL_PHOTOS[index];
      index++;

      // Brief crossfade
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          slideshowImg.style.opacity = '1';
          setTimeout(showNext, CONFIG.SLIDE_DURATION);
        });
      });
    }

    showNext();
  });
}

function runCounter() {
  return new Promise(resolve => {
    // Show counter panel
    counterWrap.style.transition = 'opacity 0.5s ease';
    counterWrap.style.opacity = '1';

    const start = performance.now();
    const duration = CONFIG.COUNTER_DURATION;

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuint(progress);
      const value = Math.round(1 + eased * 364);
      counterNum.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Hold 365 for a beat, then fade out
        setTimeout(() => {
          counterWrap.style.transition = 'opacity 0.6s ease';
          counterWrap.style.opacity = '0';
          setTimeout(resolve, 650);
        }, 600);
      }
    }

    requestAnimationFrame(tick);
  });
}

function showFinalMessage() {
  finalWrap.style.opacity = '1';
  finalWrap.style.pointerEvents = 'auto';

  // Stagger: ornament → title → tagline → names → button
  requestAnimationFrame(() => {
    if (introOrnament) introOrnament.classList.add('visible');
    introTitle.classList.add('visible');

    setTimeout(() => {
      if (introTagline) introTagline.classList.add('visible');
    }, 800);

    setTimeout(() => {
      introNames.classList.add('visible');
    }, 1500);

    setTimeout(() => {
      introBtn.classList.add('visible');
    }, 3200);
  });
}

/* ═══════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════ */
function initCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mx = -100, my = -100;
  let cx = -100, cy = -100;
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  function updateCursor() {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    raf = requestAnimationFrame(updateCursor);
  }

  updateCursor();
}

/* ═══════════════════════════════════════════════════
   PARALLAX HERO
═══════════════════════════════════════════════════ */
function initParallax() {
  const wrap = document.getElementById('hero-bg-wrap');
  if (!wrap) return;

  function onScroll() {
    const scrollY = window.scrollY;
    const speed = 0.35;
    wrap.style.transform = `translateY(${scrollY * speed}px)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ═══════════════════════════════════════════════════
   PÉTALAS — CANVAS
═══════════════════════════════════════════════════ */
function initPetals() {
  const canvas = document.getElementById('canvas-petals');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, petals, raf;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createPetal() {
    return {
      x:    Math.random() * W,
      y:    Math.random() * H - H,
      size: Math.random() * 5 + 3,
      speedY: Math.random() * 0.6 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      rot:   Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.025,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5
        ? `rgba(201,132,138,`
        : `rgba(201,168,76,`,
    };
  }

  function init() {
    resize();
    petals = Array.from({ length: 28 }, createPetal);
    // Scatter initial positions
    petals.forEach(p => { p.y = Math.random() * H; });
    animate();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    petals.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.y * 0.008) * 0.3;
      p.rot += p.rotSpeed;

      if (p.y > H + 20) {
        p.y = -20;
        p.x = Math.random() * W;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.opacity;

      // Heart shape (small)
      const s = p.size;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo( s * 0.5, -s * 0.5,  s,        s * 0.25, 0, s);
      ctx.bezierCurveTo(-s,        s * 0.25, -s * 0.5, -s * 0.5,  0, 0);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();

      ctx.restore();
    });

    raf = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize, { passive: true });
  init();
}

/* ═══════════════════════════════════════════════════
   TIMER AO VIVO
═══════════════════════════════════════════════════ */
function initLiveTimer() {
  const startDate = CONFIG.START_DATE;

  // Fallback if date is invalid
  if (isNaN(startDate.getTime())) {
    console.warn('DATA_INÍCIO inválida. Configure CONFIG.START_DATE em script.js');
    return;
  }

  const heroD  = document.getElementById('hc-days');
  const heroH  = document.getElementById('hc-hours');
  const heroM  = document.getElementById('hc-mins');
  const heroS  = document.getElementById('hc-secs');
  const bigD   = document.getElementById('bc-days');
  const bigH   = document.getElementById('bc-hours');
  const bigM   = document.getElementById('bc-mins');
  const bigS   = document.getElementById('bc-secs');

  let prevBigS = '';

  function update() {
    const now    = new Date();
    const diff   = now - startDate;
    const totalS = Math.floor(diff / 1000);
    const days   = Math.floor(totalS / 86400);
    const hours  = Math.floor((totalS % 86400) / 3600);
    const mins   = Math.floor((totalS % 3600) / 60);
    const secs   = totalS % 60;

    const dStr = String(days);
    const hStr = pad(hours);
    const mStr = pad(mins);
    const sStr = pad(secs);

    if (heroD) heroD.textContent = dStr;
    if (heroH) heroH.textContent = hStr;
    if (heroM) heroM.textContent = mStr;
    if (heroS) heroS.textContent = sStr;

    if (bigD) bigD.textContent = dStr;
    if (bigH) bigH.textContent = hStr;
    if (bigM) bigM.textContent = mStr;
    if (bigS) {
      if (bigS.textContent !== sStr) {
        // "tick" animation
        bigS.style.transform = 'translateY(-6px)';
        bigS.style.opacity   = '0.4';
        setTimeout(() => {
          bigS.textContent = sStr;
          bigS.style.transform = 'translateY(0)';
          bigS.style.opacity   = '1';
        }, 80);
      }
    }
  }

  update();
  setInterval(update, 1000);
}

/* ═══════════════════════════════════════════════════
   REVEAL — INTERSECTION OBSERVER
═══════════════════════════════════════════════════ */
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  revealEls.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════
   CARTA — STAGGER DE LINHAS
═══════════════════════════════════════════════════ */
function initLetter() {
  const letterSection = document.getElementById('letter');
  if (!letterSection) return;

  const lines = letterSection.querySelectorAll('.letter-line');

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      letterSection.classList.add('in-view');
      lines.forEach((line, i) => {
        setTimeout(() => {
          line.classList.add('visible');
        }, i * 120);
      });
      observer.unobserve(letterSection);
    }
  }, { threshold: 0.15 });

  observer.observe(letterSection);
}

/* ═══════════════════════════════════════════════════
   CONTADOR GRANDE — ODÔMETRO AO ENTRAR NA TELA
═══════════════════════════════════════════════════ */
function initBigCounter() {
  const bigCounter = document.getElementById('big-counter');
  if (!bigCounter) return;

  let triggered = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      animateBigCounter();
      observer.unobserve(bigCounter);
    }
  }, { threshold: 0.3 });

  observer.observe(bigCounter);
}

function animateBigCounter() {
  const startDate = CONFIG.START_DATE;
  if (isNaN(startDate.getTime())) return;

  const now    = new Date();
  const diff   = now - startDate;
  const totalS = Math.floor(diff / 1000);
  const days   = Math.floor(totalS / 86400);
  const hours  = Math.floor((totalS % 86400) / 3600);
  const mins   = Math.floor((totalS % 3600) / 60);
  const secs   = totalS % 60;

  const targets = [
    { el: document.getElementById('bc-days'),  target: days,  padded: false },
    { el: document.getElementById('bc-hours'), target: hours, padded: true  },
    { el: document.getElementById('bc-mins'),  target: mins,  padded: true  },
    { el: document.getElementById('bc-secs'),  target: secs,  padded: true  },
  ];

  const duration = 2200;
  const start = performance.now();

  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeOutExpo(progress);

    targets.forEach(({ el, target, padded }) => {
      if (!el) return;
      const val = Math.round(eased * target);
      el.textContent = padded ? pad(val) : String(val);
    });

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/* ═══════════════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════════════ */
let galleryImages = [];
let currentLbIdx  = 0;

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lb-img');
  const lbClose  = document.getElementById('lb-close');
  const lbPrev   = document.getElementById('lb-prev');
  const lbNext   = document.getElementById('lb-next');
  const lbBd     = document.getElementById('lb-backdrop');
  const lbCount  = document.getElementById('lb-counter');

  if (!lightbox) return;

  // Collect all gallery images
  const items = document.querySelectorAll('.gallery-item');
  galleryImages = Array.from(items).map(item => ({
    src: item.dataset.src,
    alt: item.querySelector('img').alt,
  }));

  function openLightbox(index) {
    currentLbIdx = index;
    const { src, alt } = galleryImages[index];
    lbImg.src = src;
    lbImg.alt = alt;
    if (lbCount) lbCount.textContent = `${index + 1} / ${galleryImages.length}`;
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    lbImg.focus?.();
  }

  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function prevImage() {
    currentLbIdx = (currentLbIdx - 1 + galleryImages.length) % galleryImages.length;
    const { src, alt } = galleryImages[currentLbIdx];
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = src;
      lbImg.alt = alt;
      lbImg.style.opacity = '1';
      if (lbCount) lbCount.textContent = `${currentLbIdx + 1} / ${galleryImages.length}`;
    }, 150);
  }

  function nextImage() {
    currentLbIdx = (currentLbIdx + 1) % galleryImages.length;
    const { src, alt } = galleryImages[currentLbIdx];
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = src;
      lbImg.alt = alt;
      lbImg.style.opacity = '1';
      if (lbCount) lbCount.textContent = `${currentLbIdx + 1} / ${galleryImages.length}`;
    }, 150);
  }

  // Smooth opacity transition on img
  lbImg.style.transition = 'opacity 0.15s ease';

  // Bind gallery items
  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(i);
    });
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Abrir foto ${i + 1}`);
  });

  lbClose.addEventListener('click', closeLightbox);
  lbBd.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', prevImage);
  lbNext.addEventListener('click', nextImage);

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (lightbox.hasAttribute('hidden')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   prevImage();
    if (e.key === 'ArrowRight')  nextImage();
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      dx < 0 ? nextImage() : prevImage();
    }
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════
   HERO SCROLL HINT HIDE
═══════════════════════════════════════════════════ */
function initScrollHintFade() {
  const hint = document.querySelector('.hero-scroll');
  if (!hint) return;
  window.addEventListener('scroll', () => {
    hint.style.opacity = window.scrollY > 60 ? '0' : '';
    hint.style.transition = 'opacity 0.4s ease';
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════
   MÚSICA
═══════════════════════════════════════════════════ */
function initMusic() {
  const audio = document.getElementById('bg-music');
  const btn   = document.getElementById('music-btn');
  if (!audio || !btn) return;

  audio.volume = 0;
  let started = false;

  function startMusic() {
    if (started) return;
    started = true;
    audio.play().then(() => {
      btn.classList.add('visible');
      let v = 0;
      const fade = setInterval(() => {
        v = Math.min(v + 0.02, 0.5);
        audio.volume = v;
        if (v >= 0.5) clearInterval(fade);
      }, 120);
    }).catch(() => {});
  }

  // Inicia no primeiro toque/clique do usuário
  ['touchstart', 'mousedown', 'keydown'].forEach(evt => {
    document.addEventListener(evt, startMusic, { once: true });
  });

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      audio.volume = 0.5;
      btn.classList.remove('muted');
    } else {
      audio.pause();
      btn.classList.add('muted');
    }
  });
}

/* ═══════════════════════════════════════════════════
   INICIALIZAÇÃO
═══════════════════════════════════════════════════ */
function startMainSite() {
  initCursor();
  initParallax();
  initPetals();
  initLiveTimer();
  initReveal();
  initLetter();
  initBigCounter();
  initLightbox();
  initScrollHintFade();
}

document.addEventListener('DOMContentLoaded', () => {
  initIntro();
});
