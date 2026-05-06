/* 
   PORTFOLIO  script.js
   EEE + MBA Operations  Manufacturing Portfolio
    */

/* 
   1. MOBILE MENU TOGGLE
 */
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

// Close menu when any nav link is clicked
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});


/* 
   2. ACTIVE NAV LINK (highlight on scroll)
 */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = '';
  sections.forEach(function (section) {
    const top = section.offsetTop - 80;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  allNavLinks.forEach(function (link) {
    link.style.fontWeight = '';
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.fontWeight = '500';
      link.style.color = 'var(--text-primary)';
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();


/* 
   3. PROJECT CARD EXPAND / COLLAPSE
 */
function toggleProject(btn) {
  var detail = btn.closest('.project-top').nextElementSibling;
  var isOpen = detail.classList.contains('open');

  // Close all others first
  document.querySelectorAll('.project-detail.open').forEach(function (d) {
    d.classList.remove('open');
    d.previousElementSibling.querySelector('.expand-btn').textContent = 'See full analysis ';
  });

  // Toggle the clicked one
  if (!isOpen) {
    detail.classList.add('open');
    btn.textContent = 'Hide analysis ';
  }
}


/* 
   4. CALCULATORS  live updates on input
 */

//  EOQ Calculator 
function calcEOQ() {
  var D = parseFloat(document.getElementById('eoq-d').value) || 0;
  var S = parseFloat(document.getElementById('eoq-s').value) || 0;
  var H = parseFloat(document.getElementById('eoq-h').value) || 0;
  var resultEl = document.getElementById('eoq-result');

  if (H > 0 && D > 0 && S > 0) {
    var eoq = Math.round(Math.sqrt((2 * D * S) / H));
    resultEl.textContent = 'EOQ = ' + eoq.toLocaleString('en-IN') + ' units';
  } else {
    resultEl.textContent = 'Enter all values above';
  }
}
calcEOQ(); // run once on load


//  Productivity Calculator 
function calcProd() {
  var units   = parseFloat(document.getElementById('prod-u').value) || 0;
  var hours   = parseFloat(document.getElementById('prod-h').value) || 1;
  var target  = parseFloat(document.getElementById('prod-t').value) || 1;
  var resultEl = document.getElementById('prod-result');

  var rate = units / hours;
  var pct  = (rate / target * 100).toFixed(1);
  resultEl.textContent = rate.toFixed(1) + ' units/hr  ' + pct + '% of target';
}
calcProd();


//  Break-Even Calculator 
function calcBE() {
  var fixed    = parseFloat(document.getElementById('be-f').value) || 0;
  var price    = parseFloat(document.getElementById('be-p').value) || 0;
  var variable = parseFloat(document.getElementById('be-v').value) || 0;
  var resultEl = document.getElementById('be-result');

  if (price > variable) {
    var bep = Math.ceil(fixed / (price - variable));
    resultEl.textContent = 'Break-even = ' + bep.toLocaleString('en-IN') + ' units';
  } else {
    resultEl.textContent = 'Selling price must be greater than variable cost';
  }
}
calcBE();


//  OEE Calculator 
function calcOEE() {
  var avail   = parseFloat(document.getElementById('oee-a').value) || 0;
  var perform = parseFloat(document.getElementById('oee-p').value) || 0;
  var quality = parseFloat(document.getElementById('oee-q').value) || 0;
  var resultEl = document.getElementById('oee-result');

  var oee = (avail * perform * quality / 10000).toFixed(1);
  var status = parseFloat(oee) >= 85 ? ' World class!' : 'World class: 85%';
  resultEl.textContent = 'OEE = ' + oee + '%  |  ' + status;
}
calcOEE();


/* 
   5. SCROLL REVEAL ANIMATION
   Cards and sections fade up when they enter view
 */
var revealTargets = document.querySelectorAll(
  '.project-card, .tool-card, .blog-card, .contact-card, .metric-card, .chart-card'
);

revealTargets.forEach(function (el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(function (el) {
  observer.observe(el);
});


/* 
   6. SMOOTH SCROLL for all # links
 */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* 
   7. YEAR in footer (auto-update)
 */
var yearEls = document.querySelectorAll('.footer-year');
yearEls.forEach(function (el) {
  el.textContent = new Date().getFullYear();
});
