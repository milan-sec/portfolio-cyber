// ═══════════════════════════════════════════════════
//  SCRIPT.JS
// ═══════════════════════════════════════════════════

// ── 1. THÈME JOUR / NUIT ────────────────────────────

const html        = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');

// Charge le thème sauvegardé (ou dark par défaut)
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', next);
  themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', next);
});


// ── 2. SWITCH LANGUE FR / EN ────────────────────────

const langToggle = document.getElementById('lang-toggle');
const langLabel  = document.getElementById('lang-label');

// Charge la langue sauvegardée (ou fr par défaut)
let currentLang = localStorage.getItem('lang') || 'fr';
html.setAttribute('data-lang', currentLang);
langLabel.textContent = currentLang === 'fr' ? 'EN' : 'FR';
applyLang(currentLang);

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  html.setAttribute('data-lang', currentLang);
  langLabel.textContent = currentLang === 'fr' ? 'EN' : 'FR';
  localStorage.setItem('lang', currentLang);
  applyLang(currentLang);
});

// Fonction qui traduit tous les éléments avec data-fr / data-en
function applyLang(lang) {
  // Éléments avec data-fr et data-en
  document.querySelectorAll('[data-fr][data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  // Met à jour le titre de la page
  document.title = lang === 'fr'
    ? 'Milan Obradors | Cybersécurité'
    : 'Milan Obradors | Cybersecurity';
}


// ── 3. ANIMATION AU SCROLL ──────────────────────────

const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
      }
    });
  },
  { threshold: 0.1 }
);

fadeElements.forEach(el => observer.observe(el));


// ── 4. ANIMATION TERMINAL ───────────────────────────

const terminalLines = document.querySelectorAll('.t-out');

terminalLines.forEach((line, i) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.3s ease';
    line.style.opacity = '1';
  }, 900 + i * 180);
});


// ── 5. LIEN ACTIF AU SCROLL ─────────────────────────

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--green)';
    }
  });
});
