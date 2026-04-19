// ═══════════════════════════════════════════════════
//  SCRIPT.JS — Interactions du portfolio
// ═══════════════════════════════════════════════════

// ── 1. ANIMATION AU SCROLL ──────────────────────────
// Tous les éléments avec la classe "fade-in" apparaissent
// progressivement quand ils entrent dans l'écran.

const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Petit délai décalé pour chaque élément (effet cascade)
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
      }
    });
  },
  { threshold: 0.1 } // déclenche quand 10% de l'élément est visible
);

fadeElements.forEach((el) => observer.observe(el));


// ── 2. ANIMATION DU TERMINAL ─────────────────────────
// Les lignes du terminal apparaissent une par une
// comme si elles étaient tapées.

const terminalLines = document.querySelectorAll('.t-out');

terminalLines.forEach((line, i) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.3s ease';
    line.style.opacity = '1';
  }, 900 + i * 180); // délai progressif par ligne
});


// ── 3. NAVIGATION ACTIVE AU SCROLL ──────────────────
// Met en surbrillance le lien de nav correspondant
// à la section visible.

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.style.color = 'var(--green)';
    }
  });
});
