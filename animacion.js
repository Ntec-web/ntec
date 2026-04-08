// ==================== SCROLL REVEAL ANIMATION ====================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });
}

// ==================== TOGGLE PRICING ====================
function togglePricing(btn) {
  const card = btn.closest('.pricing-card');
  const extra = card.querySelector('.pricing-extra');
  const isActive = btn.classList.contains('active');
  
  if (isActive) {
    extra.style.display = 'none';
    btn.classList.remove('active');
    btn.innerHTML = 'Ver más <i class="fas fa-chevron-down"></i>';
  } else {
    extra.style.display = 'block';
    btn.classList.add('active');
    btn.innerHTML = 'Ver menos <i class="fas fa-chevron-up"></i>';
  }
}

// ==================== PROGRESS BAR ====================
function initProgressBar() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }, { passive: true });
}

// ==================== HEADER SCROLL EFFECT ====================
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(15, 23, 42, 0.98)';
  } else {
    header.style.background = 'rgba(15, 23, 42, 0.95)';
  }
}, { passive: true });

// ==================== MOBILE MENU TOGGLE ====================
function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('active');
}

// ==================== FORM SUBMIT ====================
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const btn = form.querySelector('button');
  const originalHTML = btn.innerHTML;
  
  const nombre = document.getElementById('form-nombre').value;
  const email = document.getElementById('form-email').value;
  const servicio = document.getElementById('form-servicio').value;
  const proyecto = document.getElementById('form-proyecto').value;
  
  const mensaje = `*Nuevo contacto desde la web:*%0A%0A*Nombre:* ${encodeURIComponent(nombre)}%0A*Email:* ${encodeURIComponent(email)}%0A*Servicio:* ${encodeURIComponent(servicio)}%0A*Proyecto:* ${encodeURIComponent(proyecto)}`;
  
  const whatsappUrl = `https://wa.me/59896616638?text=${mensaje}`;
  
  window.open(whatsappUrl, '_blank');
  
  btn.innerHTML = '<i class="fas fa-check"></i> Enviado';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  
  setTimeout(function() {
    form.reset();
    btn.innerHTML = originalHTML;
    btn.style.background = '';
  }, 2000);
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('mobileMenu').classList.remove('active');
    }
  });
});

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', function() {
  initScrollReveal();
  initProgressBar();
});