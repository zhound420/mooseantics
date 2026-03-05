/* ============================================================
   MOOSE ANTICS — script.js
   Every reload is a new encounter.
   ============================================================ */

'use strict';

// ---- QUOTES -------------------------------------------------------
// Philosophical, absurdist, poetic. Forest philosopher energy.
const QUOTES = [
  "The forest does not ask permission to grow.",
  "You only become lost when you believed you knew the way.",
  "A moose does not explain itself to the river.",
  "The wilderness does not negotiate.",
  "Most cages are decorated so well we call them home.",
  "What you cannot name, you cannot tame.",
  "The antlers know something the crown never will.",
  "Wild things die when you try to understand them.",
  "Some instincts are older than language.",
  "The ones who vanish into the woods — they were not lost.",
  "Every animal knows when the seasons change before you do.",
  "What the wilderness refuses to give, it keeps forever.",
  "There is a particular kind of stillness that only the hunted understand.",
  "The map is always wrong about the territory that matters.",
  "The deep woods have no opinion of you.",
  "Solitude is not the absence of company. It is the presence of yourself.",
  "The untamed thing in you knows before you do.",
  "Some trails only appear when you stop looking for them.",
  "The only path through is through.",
  "The forest keeps its own hours.",
  "What cannot be caught cannot be owned.",
  "Even the shadows move in the right direction.",
  "The ones who appear suddenly — they were always there.",
  "A thing wild enough will not be remembered — it will be felt.",
  "The river doesn't ask if you're ready.",
  "Where civilization ends, something else begins.",
  "Some wisdom only comes in the company of cold.",
  "The beast does not aspire. It simply is.",
  "Silence has more languages than speech.",
  "What the night takes, it sometimes returns transformed.",
  "Not all that is untouchable is fragile.",
  "The strange thing about wilderness — it doesn't know you're afraid.",
  "The most honest conversation you'll have is with something that cannot speak.",
  "There are places where the rules are not suspended — they simply never arrived.",
  "The trail you didn't take is still waiting.",
  "Whatever is watching you from the trees — it knew you were coming.",
  "You cannot fake your way through the wild.",
  "Everything returns to something eventually.",
  "The moment you think you understand the forest, it laughs.",
  "Some freedoms require forgetting the door exists.",
  "A body in motion through wilderness learns a different grammar.",
  "The cold doesn't care if you believe in it.",
  "Instinct is just memory you haven't lived yet.",
  "The territory has never heard of the map.",
  "What the wolves know, they do not tell.",
  "Distance is only frightening to those who measure it.",
  "You were already gone before you left.",
  "The thing about the horizon — it moves when you do.",
  "Not all silences are empty. Some are full of everything you haven't said.",
];

// ---- ACCENT COLORS ------------------------------------------------
// Curated dark palette. One per visit.
const ACCENT_COLORS = [
  { hex: '#C8973A', rgb: [200, 151,  58] },  // warm amber
  { hex: '#4A7B6F', rgb: [ 74, 123, 111] },  // slate teal
  { hex: '#8B6A7A', rgb: [139, 106, 122] },  // dusty mauve
  { hex: '#5C8DAE', rgb: [ 92, 141, 174] },  // steel blue
  { hex: '#D4B483', rgb: [212, 180, 131] },  // pale gold
  { hex: '#7B8C5C', rgb: [123, 140,  92] },  // sage olive
  { hex: '#C4654A', rgb: [196, 101,  74] },  // burnt sienna
  { hex: '#7A7A9D', rgb: [122, 122, 157] },  // lavender slate
  { hex: '#A67B5B', rgb: [166, 123,  91] },  // warm bark
  { hex: '#5B7A6B', rgb: [ 91, 122, 107] },  // forest green
];

// ---- EASTER EGG MESSAGES ------------------------------------------
const EGG_MESSAGES = [
  "The moose sees you.",
  "You found the gap in the trees.\nDon't tell anyone.",
  "The antlers remember\nwhat the mind forgets.",
  "You were not supposed to find this.\nAnd yet.",
  "Five knocks on the old wood.\nSomething answers.",
];

// ---- STATE --------------------------------------------------------
let mouse    = { x: -9999, y: -9999 };
let particles = [];
let accentRGB = [200, 151, 58];
let logoClickCount = 0;
let logoClickTimer = null;
let eggOpen = false;
let isRareEvent = false;

// ---- INIT ---------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  applyAccentColor();
  setQuote();
  generateGrain();
  initCanvas();
  bindEvents();
  scheduleEntry();
  checkRareEvent();
});

// ---- ACCENT COLOR -------------------------------------------------

function applyAccentColor() {
  const choice = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
  accentRGB = choice.rgb;
  const root = document.documentElement;
  root.style.setProperty('--accent',     choice.hex);
  root.style.setProperty('--accent-rgb', choice.rgb.join(', '));
}

// ---- QUOTE --------------------------------------------------------

function setQuote() {
  const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  document.getElementById('quote').textContent = q;
}

// ---- GRAIN TEXTURE ------------------------------------------------

function generateGrain() {
  const size = 200;
  const c    = document.createElement('canvas');
  c.width    = size;
  c.height   = size;
  const ctx  = c.getContext('2d');
  const img  = ctx.createImageData(size, size);
  const d    = img.data;

  for (let i = 0; i < d.length; i += 4) {
    const v   = (Math.random() * 255) | 0;
    d[i]      = v;
    d[i + 1]  = v;
    d[i + 2]  = v;
    d[i + 3]  = 255;
  }

  ctx.putImageData(img, 0, 0);
  document.getElementById('grain-overlay').style.backgroundImage =
    `url(${c.toDataURL()})`;
}

// ---- CANVAS PARTICLE CONSTELLATION --------------------------------

function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    spawnParticles();
  }

  function spawnParticles() {
    const count = Math.min(Math.floor((W * H) / 14000), 80);
    particles = Array.from({ length: count }, () => ({
      x:       Math.random() * W,
      y:       Math.random() * H,
      vx:      (Math.random() - 0.5) * 0.25,
      vy:      (Math.random() - 0.5) * 0.25,
      size:    Math.random() * 1.5 + 0.4,
      opacity: Math.random() * 0.35 + 0.08,
    }));
  }

  resize();
  window.addEventListener('resize', resize);

  // Slow ambient light that drifts
  let lightAngle = Math.random() * Math.PI * 2;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Ambient gradient — slow drifting orb
    lightAngle += 0.0004;
    const lx   = W * 0.5 + Math.cos(lightAngle) * W * 0.25;
    const ly   = H * 0.5 + Math.sin(lightAngle * 0.7) * H * 0.2;
    const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, Math.max(W, H) * 0.6);
    const [r, g, b] = accentRGB;
    grad.addColorStop(0,   `rgba(${r}, ${g}, ${b}, 0.04)`);
    grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.015)`);
    grad.addColorStop(1,   `rgba(${r}, ${g}, ${b}, 0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Update + draw particles
    for (let i = 0; i < particles.length; i++) {
      const p  = particles[i];

      // Mouse attraction — gentle pull
      const dx   = mouse.x - p.x;
      const dy   = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 180 && dist > 0) {
        const force = (1 - dist / 180) * 0.00025;
        p.vx += dx * force;
        p.vy += dy * force;
      }

      // Damping
      p.vx *= 0.975;
      p.vy *= 0.975;

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < -2)  p.x = W + 2;
      if (p.x > W + 2) p.x = -2;
      if (p.y < -2)  p.y = H + 2;
      if (p.y > H + 2) p.y = -2;

      // Draw connection lines to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q   = particles[j];
        const cdx = p.x - q.x;
        const cdy = p.y - q.y;
        const cd  = Math.hypot(cdx, cdy);

        if (cd < 120) {
          const alpha = (1 - cd / 120) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
}

// ---- ENTRY ANIMATION ----------------------------------------------

function scheduleEntry() {
  const steps = [
    { sel: '.logo-mark',   delay: 180 },
    { sel: '.brand',       delay: 420 },
    { sel: '.rule',        delay: 640 },
    { sel: '.quote-block', delay: 860 },
  ];

  for (const { sel, delay } of steps) {
    setTimeout(() => {
      document.querySelector(sel)?.classList.add('visible');
    }, delay);
  }
}

// ---- RARE EVENTS (10% chance) ------------------------------------

function checkRareEvent() {
  if (Math.random() > 0.1) return;
  isRareEvent = true;

  const events = ['glitch', 'white', 'alt'];
  const chosen  = events[Math.floor(Math.random() * events.length)];

  setTimeout(() => {
    document.body.classList.add(`rare-${chosen}`);

    if (chosen === 'glitch') {
      // Occasionally scramble text for drama
      startTextScramble();
    }
  }, 1200);
}

// ---- TEXT SCRAMBLE (for glitch mode) -----------------------------

const SCRAMBLE_CHARS = '!@#$%—×÷±∞≠≈∂∑∏√∫Ω◆●■▲';

function startTextScramble() {
  const el       = document.querySelector('.brand-name');
  const original = 'MOOSE ANTICS';
  let active = false;

  // Trigger a brief scramble every ~8s
  setInterval(() => {
    if (active) return;
    active = true;
    scrambleElement(el, original, 800, () => { active = false; });
  }, 7000 + Math.random() * 4000);
}

function scrambleElement(el, target, duration, onDone) {
  const start = Date.now();

  function tick() {
    const elapsed  = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    let result     = '';

    for (let i = 0; i < target.length; i++) {
      if (target[i] === ' ') {
        result += ' ';
      } else if (i < Math.floor(progress * target.length)) {
        result += target[i];
      } else {
        result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }

    el.textContent = result;
    el.setAttribute('data-text', result);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
      el.setAttribute('data-text', target);
      onDone?.();
    }
  }

  tick();
}

// ---- EVENTS -------------------------------------------------------

function bindEvents() {
  // Mouse tracking
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Touch tracking
  window.addEventListener('touchmove', e => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  // Logo easter egg (5 rapid clicks / taps)
  const logo = document.getElementById('logo-mark');

  function handleLogoClick() {
    logoClickCount++;
    clearTimeout(logoClickTimer);

    // Brief flash on the logo
    logo.style.transform = 'scale(0.9)';
    setTimeout(() => { logo.style.transform = ''; }, 120);

    if (logoClickCount >= 5) {
      logoClickCount = 0;
      openEasterEgg();
    } else {
      logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 700);
    }
  }

  logo.addEventListener('click',      handleLogoClick);
  logo.addEventListener('touchstart', handleLogoClick, { passive: true });

  // Close easter egg
  const eggOverlay = document.getElementById('egg-overlay');
  eggOverlay.addEventListener('click', closeEasterEgg);

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && eggOpen) closeEasterEgg();
  });
}

// ---- EASTER EGG ---------------------------------------------------

function openEasterEgg() {
  eggOpen = true;
  const overlay = document.getElementById('egg-overlay');
  const msg     = document.getElementById('egg-message');
  const text    = EGG_MESSAGES[Math.floor(Math.random() * EGG_MESSAGES.length)];

  msg.textContent = text;
  overlay.classList.add('open');

  // Pulse the accent color wild for a moment
  document.documentElement.style.setProperty('--accent', '#ffffff');
  setTimeout(() => {
    const [r, g, b] = accentRGB;
    document.documentElement.style.setProperty('--accent', `rgb(${r}, ${g}, ${b})`);
  }, 600);
}

function closeEasterEgg() {
  eggOpen = false;
  document.getElementById('egg-overlay').classList.remove('open');
}
