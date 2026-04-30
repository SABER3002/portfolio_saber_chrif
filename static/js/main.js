/* ═══════════════════════════════════════════════
   SABER CHRIF — Portfolio JS
═══════════════════════════════════════════════ */

// ── THEME ──
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    body.classList.remove('light');
    themeIcon.className = 'fas fa-sun';
  } else {
    body.classList.add('light');
    body.classList.remove('dark');
    themeIcon.className = 'fas fa-moon';
  }
  localStorage.setItem('theme', theme);
}

// Load saved theme (default = light)
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = body.classList.contains('dark') ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ── LANGUAGE SWITCH ──
function setLang(lang) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.location.href = url.toString();
}

// ── SCROLL HINT ──
const scrollHint = document.querySelector('.scroll-hint');
if (scrollHint) {
  scrollHint.addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
  });
}

// ── STICKY NAV HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ── ANIMATE LANGUAGE BARS ON SCROLL ──
const langBars = document.querySelectorAll('.lang-bar-fill');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.style.width;
      bar.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { bar.style.width = width; });
      });
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

langBars.forEach(b => barObserver.observe(b));

// ── FADE-IN CARDS ON SCROLL ──
const animItems = document.querySelectorAll('.timeline-item, .exp-card, .skill-group, .contact-card');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animItems.forEach(el => {
  el.style.animationPlayState = 'paused';
  fadeObserver.observe(el);
});
