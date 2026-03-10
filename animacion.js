// Image with fallback functionality
function handleImageError(img) {
  const errorImgSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
  
  const container = img.parentElement;
  const originalSrc = img.src;
  
  // Create wrapper if needed
  if (!container.classList.contains('img-fallback-wrapper')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'img-fallback-wrapper inline-block bg-gray-100 text-center align-middle';
    wrapper.style.cssText = 'display: inline-block; background: #f3f4f6; text-align: center; vertical-align: middle;';
    
    const innerWrapper = document.createElement('div');
    innerWrapper.className = 'img-fallback-inner';
    innerWrapper.style.cssText = 'display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;';
    
    const errorImg = document.createElement('img');
    errorImg.src = errorImgSrc;
    errorImg.alt = 'Error loading image';
    errorImg.setAttribute('data-original-url', originalSrc);
    
    wrapper.appendChild(innerWrapper);
    innerWrapper.appendChild(errorImg);
    
    img.replaceWith(wrapper);
  }
}

// Add error handlers to all images after page load
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(function(img) {
    img.addEventListener('error', function() {
      handleImageError(img);
    });
  });
});

// ==================== FLOATING PARTICLES ====================
function createParticles() {
  const heroSection = document.getElementById('inicio');
  if (!heroSection) return;
  
  const particlesContainer = document.createElement('div');
  particlesContainer.id = 'particles-container';
  particlesContainer.style.cssText = 'position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0;';
  
  const particleCount = 25;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 3;
    const x = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 15;
    const opacity = Math.random() * 0.5 + 0.2;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: linear-gradient(135deg, rgba(37, 99, 235, ${opacity}), rgba(124, 58, 237, ${opacity}));
      border-radius: 50%;
      left: ${x}%;
      top: 100%;
      animation: floatParticle ${duration}s linear infinite;
      animation-delay: -${delay}s;
    `;
    
    particlesContainer.appendChild(particle);
  }
  
  heroSection.appendChild(particlesContainer);
  
  // Add particle keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0% { transform: translateY(0) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  const heroImage = document.querySelector('.hero-image img');
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.getElementById('inicio');
    if (!heroSection) return;
    
    const offset = heroSection.offsetTop;
    const height = heroSection.offsetHeight;
    
    if (scrolled >= offset && scrolled <= offset + height) {
      const speed = 0.3;
      const yPos = (scrolled - offset) * speed;
      
      if (heroBg) heroBg.style.transform = `translateY(${yPos}px)`;
      if (heroImage) heroImage.style.transform = `translateY(${yPos * 0.5}px)`;
    }
  });
}

// ==================== SCROLL INDICATOR ====================
function createScrollIndicator() {
  const heroSection = document.getElementById('inicio');
  if (!heroSection) return;
  
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
  scrollIndicator.style.cssText = `
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    color: #2563eb;
    font-size: 1.5rem;
    animation: scrollBounce 2s ease-in-out infinite;
    z-index: 10;
    cursor: pointer;
  `;
  scrollIndicator.onclick = function() {
    document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' });
  };
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scrollBounce {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(10px); }
    }
  `;
  document.head.appendChild(style);
  
  heroSection.appendChild(scrollIndicator);
}

// ==================== BUTTON RIPPLE EFFECT ====================
function initButtonAnimations() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: rippleEffect 0.6s ease-out;
        left: ${e.clientX - rect.left}px;
        top: ${e.clientY - rect.top}px;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleEffect {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
    .btn { position: relative; overflow: hidden; }
  `;
  document.head.appendChild(style);
}

// ==================== CARD HOVER EFFECTS ====================
function initCardEffects() {
  const cards = document.querySelectorAll('.service-card, .portfolio-card, .blog-card, .value-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() { this.style.zIndex = '10'; });
    card.addEventListener('mouseleave', function() { this.style.zIndex = ''; });
  });
}

// ==================== FORM MICROINTERACTIONS ====================
function initFormInteractions() {
  const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
  
  inputs.forEach(input => {
    input.addEventListener('focus', function() { this.parentElement.classList.add('input-focused'); });
    input.addEventListener('blur', function() { this.parentElement.classList.remove('input-focused'); });
    if (input.value) input.classList.add('has-value');
    input.addEventListener('input', function() {
      this.classList.toggle('has-value', !!this.value);
    });
  });
  
  const style = document.createElement('style');
  style.textContent = `
    .form-group { position: relative; }
    .form-group.input-focused label { color: #2563eb; }
    .form-group input:focus, .form-group textarea:focus {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(37, 99, 235, 0.15) !important;
    }
  `;
  document.head.appendChild(style);
}

// ==================== STAGGERED SCROLL REVEAL ====================
function initScrollReveal() {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.service-card, .portfolio-card, .blog-card, .testimonial-card, .value-card, .stat, .contact-card, .schedule-card, .response-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.transitionDelay = `${(index % 6) * 0.1}s`;
    observer.observe(el);
  });
  
  const style = document.createElement('style');
  style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
}

// ==================== IMAGE ZOOM ON HOVER ====================
function initImageZoom() {
  const images = document.querySelectorAll('.portfolio-image img, .blog-image img');
  
  images.forEach(img => {
    img.style.transition = 'transform 0.5s ease';
    img.parentElement.addEventListener('mouseenter', () => img.style.transform = 'scale(1.1)');
    img.parentElement.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
  });
}

// ==================== ICON ROTATION ON HOVER ====================
function initIconRotation() {
  const icons = document.querySelectorAll('.service-icon, .value-icon');
  
  icons.forEach(icon => {
    icon.style.transition = 'transform 0.3s ease';
    icon.addEventListener('mouseenter', function() { this.style.transform = 'rotate(360deg)'; });
    icon.addEventListener('mouseleave', function() { this.style.transform = 'rotate(0deg)'; });
  });
}

// ==================== ENHANCED SMOOTH SCROLL ====================
function initEnhancedSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ==================== INITIALIZE ALL ENHANCEMENTS ====================
document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  initParallax();
  createScrollIndicator();
  initButtonAnimations();
  initCardEffects();
  initFormInteractions();
  initScrollReveal();
  initImageZoom();
  initIconRotation();
  initEnhancedSmoothScroll();
  initAlertDialog();
  initAboutAnimations();
  initValueCardAnimations();
});

// ==================== ALERT DIALOG ====================
function initAlertDialog() {
  // Create AlertDialog HTML
  const alertDialogHTML = `
    <div id="alert-dialog-overlay" class="alert-dialog-overlay">
      <div class="alert-dialog-content">
        <div class="alert-dialog-header">
          <h3 class="alert-dialog-title" id="alert-dialog-title">Confirmar acción</h3>
          <p class="alert-dialog-description" id="alert-dialog-description">¿Estás seguro de que deseas continuar?</p>
        </div>
        <div class="alert-dialog-footer">
          <button class="alert-dialog-cancel" id="alert-dialog-cancel">Cancelar</button>
          <button class="alert-dialog-action" id="alert-dialog-action">Confirmar</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', alertDialogHTML);
  
  const overlay = document.getElementById('alert-dialog-overlay');
  const cancelBtn = document.getElementById('alert-dialog-cancel');
  const actionBtn = document.getElementById('alert-dialog-action');
  
  // Close on cancel
  cancelBtn.addEventListener('click', function() {
    closeAlertDialog();
  });
  
  // Close on overlay click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      closeAlertDialog();
    }
  });
  
  // Close on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeAlertDialog();
    }
  });
}

function openAlertDialog(options) {
  const overlay = document.getElementById('alert-dialog-overlay');
  const title = document.getElementById('alert-dialog-title');
  const description = document.getElementById('alert-dialog-description');
  const actionBtn = document.getElementById('alert-dialog-action');
  
  title.textContent = options.title || 'Confirmar acción';
  description.textContent = options.description || '¿Estás seguro de que deseas continuar?';
  actionBtn.textContent = options.actionText || 'Confirmar';
  
  // Set up action handler
  const newActionBtn = actionBtn.cloneNode(true);
  actionBtn.parentNode.replaceChild(newActionBtn, actionBtn);
  
  newActionBtn.addEventListener('click', function() {
    if (options.onConfirm) {
      options.onConfirm();
    }
    closeAlertDialog();
  });
  
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAlertDialog() {
  const overlay = document.getElementById('alert-dialog-overlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Global function to open alert dialog
window.openAlertDialog = openAlertDialog;

// ==================== ALERT COMPONENT ====================
function createAlert(options) {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll('.site-alert');
  existingAlerts.forEach(alert => alert.remove());
  
  const alertDiv = document.createElement('div');
  alertDiv.className = `site-alert site-alert-${options.variant || 'default'}`;
  alertDiv.innerHTML = `
    <div class="alert-icon">
      <i class="fas fa-${options.icon || 'info-circle'}"></i>
    </div>
    <div class="alert-content">
      ${options.title ? `<div class="alert-title">${options.title}</div>` : ''}
      ${options.description ? `<div class="alert-description">${options.description}</div>` : ''}
    </div>
    <button class="alert-close" aria-label="Cerrar">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  document.body.appendChild(alertDiv);
  
  // Trigger animation
  setTimeout(() => alertDiv.classList.add('show'), 10);
  
  // Close button
  const closeBtn = alertDiv.querySelector('.alert-close');
  closeBtn.addEventListener('click', () => closeAlert(alertDiv));
  
  // Auto close after duration
  if (options.duration !== 0) {
    setTimeout(() => closeAlert(alertDiv), options.duration || 5000);
  }
  
  return alertDiv;
}

function closeAlert(alertDiv) {
  alertDiv.classList.remove('show');
  setTimeout(() => alertDiv.remove(), 300);
}

// Global function to show alerts
window.showAlert = function(options) {
  return createAlert(options);
};

// ==================== ABOUT SECTION ENHANCEMENTS ====================
function initAboutAnimations() {
  // Add blur effect behind about image
  const aboutImage = document.querySelector('.about-image');
  if (aboutImage) {
    const blurEffect = document.createElement('div');
    blurEffect.className = 'about-blur-effect';
    blurEffect.style.cssText = `
      position: absolute;
      width: 200px;
      height: 200px;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(124, 58, 237, 0.3));
      border-radius: 50%;
      filter: blur(60px);
      bottom: -30px;
      left: -30px;
      z-index: -1;
      animation: pulseBlur 4s ease-in-out infinite;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulseBlur {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.2); opacity: 0.7; }
      }
      .about-image { position: relative; }
    `;
    document.head.appendChild(style);
    aboutImage.appendChild(blurEffect);
  }
  
  // Add entrance animations to about section
  const aboutText = document.querySelector('.about-text');
  const aboutImg = document.querySelector('.about-image');
  
  if (aboutText) {
    aboutText.style.opacity = '0';
    aboutText.style.transform = 'translateX(-50px)';
    aboutText.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }
  
  if (aboutImg) {
    aboutImg.style.opacity = '0';
    aboutImg.style.transform = 'translateX(50px)';
    aboutImg.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }
  
  // Observe about section
  const aboutSection = document.getElementById('nosotros');
  if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (aboutText) {
            aboutText.style.opacity = '1';
            aboutText.style.transform = 'translateX(0)';
          }
          if (aboutImg) {
            setTimeout(() => {
              aboutImg.style.opacity = '1';
              aboutImg.style.transform = 'translateX(0)';
            }, 200);
          }
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(aboutSection);
  }
}

// ==================== ENHANCED VALUES CARDS ====================
function initValueCardAnimations() {
  const valueCards = document.querySelectorAll('.value-card');
  
  valueCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 0.15}s`;
    
    // Add hover animation
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('active');
}

// Form submission
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const btn = form.querySelector('.btn-submit');
  const originalText = btn.innerHTML;
  
  btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje enviado!';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  
  setTimeout(function() {
    form.reset();
    btn.innerHTML = originalText;
    btn.style.background = '';
  }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Chat Widget
const chatWidget = `
  <!-- Chat Widget -->
  <div id="chat-widget-container" style="display: none;">
    <div class="chat-window">
      <!-- Header -->
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-avatar">
            <i class="fas fa-comments"></i>
          </div>
          <div class="chat-title">
            <div class="chat-title-text">Asistente NTEC</div>
            <div class="chat-subtitle">¡Conversemos!</div>
          </div>
        </div>
        <div class="chat-header-actions">
          <button id="chat-minimize" class="chat-action-btn"><i class="fas fa-minus"></i></button>
          <button id="chat-close" class="chat-action-btn"><i class="fas fa-times"></i></button>
        </div>
      </div>

      <!-- Messages -->
      <div class="chat-messages" id="chat-messages">
        <div class="chat-message agent">
          <div class="chat-bubble">
            <p>¡Hola! 👋 Soy el asistente virtual de NTEC.</p>
            <p style="margin-top: 8px;">¿En qué puedo ayudarte hoy? Podés contarme sobre tu proyecto o hacerme preguntas.</p>
            <span class="chat-time">Ahora</span>
          </div>
        </div>
      </div>

      <!-- Quick Replies - Initial -->
      <div class="chat-quick-replies" id="initial-replies">
        <button class="quick-reply" data-action="plans">📋 Ver planes y precios</button>
        <button class="quick-reply" data-action="about">ℹ️ ¿Qué es NTEC?</button>
        <button class="quick-reply" data-action="services">💻 ¿Qué servicios ofrecen?</button>
        <button class="quick-reply" data-action="contact">📞 Quiero contactar</button>
        <button class="quick-reply" data-action="chat">💬 Solo quiero hablar</button>
      </div>

      <!-- Input -->
      <form id="chat-form" class="chat-input-container">
        <input type="text" id="chat-input" placeholder="Escribe tu mensaje..." class="chat-input">
        <button type="submit" class="chat-send-btn"><i class="fas fa-paper-plane"></i></button>
      </form>
    </div>
  </div>

  <!-- Chat Button -->
  <button id="chat-toggle-btn" class="chat-toggle-btn">
    <i class="fas fa-comments"></i>
    <span class="chat-badge">1</span>
  </button>
`;

document.body.insertAdjacentHTML('beforeend', chatWidget);

// Chat functionality
let isChatOpen = false;
let isChatMinimized = false;
let isTyping = false;

const chatContainer = document.getElementById('chat-widget-container');
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatCloseBtn = document.getElementById('chat-close');
const chatMinimizeBtn = document.getElementById('chat-minimize');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const quickReplies = document.querySelectorAll('.quick-reply');

// Toggle chat
chatToggleBtn.addEventListener('click', function() {
  isChatOpen = !isChatOpen;
  chatContainer.style.display = isChatOpen ? 'block' : 'none';
  chatToggleBtn.style.display = isChatOpen ? 'none' : 'flex';
  if (isChatOpen) {
    chatInput.focus();
  }
});

// Close chat
chatCloseBtn.addEventListener('click', function() {
  isChatOpen = false;
  chatContainer.style.display = 'none';
  chatToggleBtn.style.display = 'flex';
});

// Minimize chat
chatMinimizeBtn.addEventListener('click', function() {
  isChatMinimized = !isChatMinimized;
  const chatWindow = document.querySelector('.chat-window');
  if (isChatMinimized) {
    chatWindow.style.height = '60px';
    chatWindow.style.overflow = 'hidden';
  } else {
    chatWindow.style.height = '500px';
    chatWindow.style.overflow = '';
  }
});

// Quick replies - Action selection
const actionResponses = {
  'plans': {
    response: '¡Perfecto! Aquí te cuento sobre mis planes:',
    showPlans: true
  },
  'about': {
    response: `<p>NTEC es un emprendimiento individual fundado por Nathaniel en Uruguay. 📍</p>
      <p style="margin-top: 8px;">Me especializo en crear sitios web personalizados que reflejan la esencia de cada negocio.</p>
      <p style="margin-top: 8px;">Lo que me diferencia? No solo entrego webs, sino que acompaño a mis clientes en todo el proceso, enseñándoles a usarlas y brindándoles soporte continuo.</p>
      <p style="margin-top: 8px;">¿Te gustaría ver los planes disponibles?</p>`,
    showPlans: null
  },
  'services': {
    response: `<p>En NTECofferimos varios servicios: 🌐</p>
      <ul style="margin-top: 8px; margin-bottom: 8px; padding-left: 20px;">
        <li>🖥️ <strong>Desarrollo Web</strong> - Landing pages, webs corporativas, e-commerce</li>
        <li>📱 <strong>Apps Mobile</strong> - Aplicaciones para iOS y Android</li>
        <li>🎨 <strong>Diseño Gráfico</strong> - Logos, branding, identidades visuales</li>
        <li>📈 <strong>Marketing Digital</strong> - SEO, redes sociales, publicidad</li>
        <li>💻 <strong>Servicio Técnico</strong> - Reparación y mantenimiento de computadoras</li>
      </ul>
      <p>¿Sobre algún servicio específico querés saber más?</p>`,
    showPlans: null
  },
  'contact': {
    response: `<p>¡Excelente! 📞</p>
      <p style="margin-top: 8px;">Podés contactarme de varias formas:</p>
      <ul style="margin-top: 8px; margin-bottom: 8px; padding-left: 20px;">
        <li>💬 <strong>WhatsApp:</strong> Escribime directamente</li>
        <li>📧 <strong>Email:</strong> nservice7ech@gmail.com</li>
        <li>📝 <strong>Formulario:</strong> Abajo en la web</li>
      </ul>
      <p style="margin-top: 8px;">¿Cuál preferís?</p>`,
    showPlans: null
  },
  'chat': {
    response: `<p>¡Me encant charlar! 😄</p>
      <p style="margin-top: 8px;">Contame, ¿cómo estás hoy? ¿Hay algo en lo que pueda ayudarte, aunque sea para despejar dudas sobre sitios web o tecnología?</p>
      <p style="margin-top: 8px;">No hay presión de comprar nada, estoy aquí para ayudar. 👂</p>`,
    showPlans: null
  }
};

// Chat state
let chatState = 'initial'; // initial, chatting, showing_plans

// Quick replies handler
document.body.addEventListener('click', function(e) {
  if (e.target.classList.contains('quick-reply') && e.target.getAttribute('data-action')) {
    const action = e.target.getAttribute('data-action');
    handleAction(action);
  }
});

function handleAction(action) {
  const actionData = actionResponses[action];
  if (!actionData) return;
  
  // Add user selection message
  const btnText = document.querySelector(`[data-action="${action}"]`).textContent;
  addMessage(btnText, 'user');
  
  // Hide initial quick replies
  const initialReplies = document.getElementById('initial-replies');
  if (initialReplies) {
    initialReplies.style.display = 'none';
  }
  
  // Show typing
  showTyping();
  
  setTimeout(function() {
    hideTyping();
    addMessage(actionData.response, 'agent');
    
    if (actionData.showPlans === true) {
      chatState = 'showing_plans';
      showPlanOptions();
    } else if (actionData.showPlans === null) {
      chatState = 'chatting';
      showContinueChattingOptions();
    }
  }, 800);
}

function showContinueChattingOptions() {
  setTimeout(function() {
    const optionsHtml = `
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
        <button class="quick-reply" data-action="plans" style="padding: 8px 12px;">📋 Ver planes</button>
        <button class="quick-reply" data-action="contact" style="padding: 8px 12px;">📞 Contactar</button>
        <button class="quick-reply" data-action="chat" style="padding: 8px 12px;">💬 Seguir hablando</button>
      </div>
    `;
    addMessage(optionsHtml, 'agent');
  }, 300);
}

function showPlanDetails(planKey) {
  const plan = planResponses[planKey];
  
  // Add user message
  addMessage(plan.title, 'user');
  
  // Build response message
  let responseHtml = `<p style="font-weight: 600; font-size: 1.1rem; margin-bottom: 8px;">${plan.title}</p>`;
  responseHtml += `<p style="font-size: 1.5rem; font-weight: 700; color: #2563eb; margin-bottom: 12px;">${plan.price}</p>`;
  responseHtml += `<p style="margin-bottom: 12px;">${plan.description}</p>`;
  responseHtml += `<p style="font-weight: 600; margin-bottom: 8px;">🎯 Incluye:</p>`;
  responseHtml += `<ul style="margin-bottom: 12px; padding-left: 20px;">`;
  plan.includes.forEach(item => {
    responseHtml += `<li style="margin-bottom: 4px;">${item}</li>`;
  });
  responseHtml += `</ul>`;
  responseHtml += `<p style="font-style: italic; color: #64748b; margin-bottom: 16px;">${plan.maintenance}</p>`;
  responseHtml += `<p style="margin-bottom: 12px;"><strong>💡 Plus NTEC:</strong> No solo te entregamos la web, te enseñamos a usarla y te acompañamos en el proceso.</p>`;
  responseHtml += `<button class="quick-reply" onclick="window.open('https://wa.me/59896616638', '_blank')" style="background: linear-gradient(135deg, #25D366, #128C7E); color: white; padding: 12px 24px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; width: 100%;">💬 Consultar ahora</button>`;
  
  // Show typing indicator
  showTyping();
  
  setTimeout(function() {
    hideTyping();
    addMessage(responseHtml, 'agent');
  }, 1000);
}

// Send message
chatForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (text) {
    sendMessage(text);
  }
});

function sendMessage(text) {
  // Add user message
  addMessage(text, 'user');
  chatInput.value = '';

  // Hide initial quick replies if visible
  const initialReplies = document.getElementById('initial-replies');
  if (initialReplies) {
    initialReplies.style.display = 'none';
  }

  // Show typing indicator
  showTyping();

  // Process message through conversation engine
  setTimeout(function() {
    hideTyping();
    
    const response = processMessage(text);
    addMessage(response.text, 'agent');
    
    // Handle state changes
    if (response.showPlans) {
      chatState = 'showing_plans';
      setTimeout(showPlanOptions, 500);
    } else if (response.continueChat) {
      chatState = 'chatting';
      setTimeout(showContinueChattingOptions, 500);
    }
  }, 1000);
}

// Conversational engine
function processMessage(text) {
  const lowerText = text.toLowerCase().trim();
  
  // Greetings
  if (lowerText.match(/^(hola|buenos|buenas|hey|hi|hello|qué tal|cómo estás)/i)) {
    return {
      text: `<p>¡Hola! 👋 ¡Qué bueno charlar contigo!</p>
        <p style="margin-top: 8px;">¿En qué puedo ayudarte hoy? Podés contarme sobre tu proyecto o simplemente conversamos.</p>`,
      continueChat: true
    };
  }
  
  // How are you / casual talk
  if (lowerText.match(/cómo estás|cómo te va|bien|y vos|estás bien/i)) {
    const responses = [
      `<p>¡Muy bien, gracias por preguntar! 😊</p>
        <p style="margin-top: 8px;">Aquí esperando para ayudarte con tu proyecto web. ¿Y vos, cómo estás?</p>`,
      `<p>¡Genial! 🎉 Aquí tengo muchas ganas de ayudarte.</p>
        <p style="margin-top: 8px;">Contame, ¿qué te trae por aquí hoy?</p>`,
      `<p>¡Perfecto! ✨ Estuve trabajando en proyectos muy interesantes.</p>
        <p style="margin-top: 8px;">¿Te puedo ayudar con algo específico o preferís que charlemos un poco?</p>`
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      continueChat: true
    };
  }
  
  // Thanks / gratitude
  if (lowerText.match(/gracias|te agradezco|muchas gracias|thanks|thank you/i)) {
    return {
      text: `<p>¡De nada! 😊 Me gusta poder ayudar.</p>
        <p style="margin-top: 8px;">Si tenés más preguntas o querés avanzar con tu proyecto, aquí estoy.</p>`,
      continueChat: true
    };
  }
  
  // Questions about prices/plans
  if (lowerText.match(/precio|costo|cuánto|cuál|precios|presupuesto|valor|cuánto sale|plan|tarifa/i)) {
    return {
      text: `<p>¡Perfecto! Te cuento sobre los planes que tengo disponibles 📋</p>
        <p style="margin-top: 8px;">¿Cuál se adapta mejor a lo que necesitás?</p>`,
      showPlans: true
    };
  }
  
  // Questions about web development
  if (lowerText.match(/web|página|sitio|desarrollo|crear|hacer|necesito|quiero/i)) {
    return {
      text: `<p>¡Excelente! 🌐 Me encanta hablar de proyectos web.</p>
        <p style="margin-top: 8px;">Tengo varias opciones según lo que necesites. ¿Querés ver los planes o preferís que te pregunte más sobre tu idea?</p>`,
      continueChat: true
    };
  }
  
  // Questions about NTEC / who are you
  if (lowerText.match(/qué es ntec|quién sos|quién eres|sobre ti|con quién hablo|empresa|emprendimiento/i)) {
    return {
      text: `<p>¡Buena pregunta! 😄</p>
        <p style="margin-top: 8px;">Soy el asistente de NTEC, un emprendimiento individual de desarrollo web en Uruguay.🏎️</p>
        <p style="margin-top: 8px;">Mi fundador Nathaniel crea sitios web personalizados para negocios como el tuyo. Lo que nos hace diferentes es que acompañamos a cada cliente en todo el proceso, enseñándoles a usar su web.</p>
        <p style="margin-top: 8px;">¿Querés saber más o ver los planes?</p>`,
      continueChat: true
    };
  }
  
  // Contact request
  if (lowerText.match(/contactar|whatsapp|escribir|hablar|llamar|comunicar|redes|email|correo/i)) {
    return {
      text: `<p>¡Claro que sí! 📞</p>
        <p style="margin-top: 8px;">Podés escribirme por WhatsApp directamente o dejarme tu mensaje aquí.</p>
        <p style="margin-top: 8px;">¿Cuál preferís?</p>`,
      continueChat: true
    };
  }
  
  // Questions about services
  if (lowerText.match(/servicio|qué hacen|ofrecen|hacen|producto/i)) {
    return {
      text: `<p>En NTECofferimos varios servicios 💻</p>
        <ul style="margin-top: 8px; margin-bottom: 8px; padding-left: 20px;">
          <li>🖥️ Desarrollo Web (landings, corporativas, e-commerce)</li>
          <li>📱 Apps Mobile</li>
          <li>🎨 Diseño Gráfico</li>
          <li>📈 Marketing Digital</li>
          <li>💻 Servicio Técnico</li>
        </ul>
        <p>¿Sobre alguno querés saber más?</p>`,
      continueChat: true
    };
  }
  
  // Goodbye
  if (lowerText.match(/adiós|bye|nos vemos| chau|hasta luego|luego|me voy|me retiro/i)) {
    return {
      text: `<p>¡Chao! 👋 Fue un placer charlar contigo.</p>
        <p style="margin-top: 8px;">Cuando quieras volver a hablar o avanzar con tu proyecto, aquí estaré. ¡Que te vaya muy bien! 🚀</p>`,
      continueChat: false
    };
  }
  
  // Questions about timeframe / delivery
  if (lowerText.match(/cuánto tiempo|tarda|cuando|plazo|entrega|cuándo/i)) {
    return {
      text: `<p>¡Buena pregunta! ⏱️</p>
        <p style="margin-top: 8px;">El tiempo depende del tipo de proyecto:</p>
        <ul style="margin-top: 8px; margin-bottom: 8px; padding-left: 20px;">
          <li>🖥️ Landing Page: 3-5 días</li>
          <li>🌐 Web Estándar: 1-2 semanas</li>
          <li>🛒 e-Commerce: 2-4 semanas</li>
        </ul>
        <p style="margin-top: 8px;">¿Querés ver los planes con más detalle?</p>`,
      showPlans: true
    };
  }
  
  // Questions about maintenance
  if (lowerText.match(/mantenimiento|soporte|actualizar|actualización|hosting|dominio/i)) {
    return {
      text: `<p>¡Sí! Ofresco planes de mantenimiento 📦</p>
        <p style="margin-top: 8px;">Incluyen:</p>
        <ul style="margin-top: 8px; margin-bottom: 8px; padding-left: 20px;">
          <li>🌐 Hosting y dominio incluidos</li>
          <li>🔄 Actualizaciones de contenido</li>
          <li>🛡️ Seguridad y backups</li>
          <li>📞 Soporte prioritario</li>
        </ul>
        <p style="mt-2">Cada plan tiene su propio mantenimiento. ¿Querés ver los detalles?</p>`,
      showPlans: true
    };
  }
  
  // Default responses for casual chat
  const casualResponses = [
    `<p>¡Interesante! 😄 Contame más sobre eso.</p>
      <p style="margin-top: 8px;">¿Hay algo específico sobre desarrollo web en lo que pueda ayudarte?</p>`,
    `<p>¡Entendido! 👍 ¿Te gustaría ver los planes que tengo disponibles?</p>`,
    `<p>¡Perfecto! 📋 ¿Querés que te muestre las opciones de páginas web que tengo?</p>`,
    `<p>¡Genial! 🎯 ¿Tenés alguna idea de qué tipo de web necesitás?</p>`
  ];
  
  return {
    text: casualResponses[Math.floor(Math.random() * casualResponses.length)],
    continueChat: true
  };
}

function addMessage(text, sender) {
  const now = new Date();
  const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'chat-message ' + sender;
  messageDiv.innerHTML = `
    <div class="chat-bubble">
      ${text}
      <span class="chat-time">${time}</span>
    </div>
  `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Plan responses
const planResponses = {
  'landing': {
    title: '🖥️ Landing Page',
    price: 'desde $4.000 UYU',
    description: 'La Landing Page es ideal si querés empezar con presencia online rápida y económica. Perfecta para promociones, eventos o productos específicos.',
    includes: ['Dominio y hosting incluidos', 'Diseño profesional', 'WhatsApp directo', 'Formulario de contacto', 'Optimizada para móviles'],
    maintenance: 'Mantenimiento desde $1500 UYU/mes'
  },
  'estandar': {
    title: '🌐 Web Estándar',
    price: 'desde $7.000 UYU',
    description: 'La Web Estándar es perfecta para negocios que necesitan una presencia online completa con múltiples páginas y secciones.',
    includes: ['Hasta 5 páginas', 'Diseño personalizado', 'Formularios de contacto', 'Galería de imágenes', 'Integración con redes sociales'],
    maintenance: 'Mantenimiento desde $2000 UYU/mes'
  },
  'servicios': {
    title: '📋 Web de Servicios',
    price: 'desde $10.000 UYU',
    description: 'La Web de Servicios está pensada para negocios que ofrecen varias prestaciones, con secciones dedicadas a cada servicio que ofrecés.',
    includes: ['Catálogo de servicios', 'Sistema de citas (opcional)', 'Portafolio de proyectos', 'Testimonios de clientes', 'Blog integrado'],
    maintenance: 'Mantenimiento desde $2500 UYU/mes'
  },
  'ecommerce-basica': {
    title: '🛒 e-Commerce Básica',
    price: 'desde $15.000 UYU',
    description: 'La e-Commerce Básica es ideal para empezar a vender online con una tienda simple pero funcional y efectiva.',
    includes: ['Catálogo de productos', 'Carrito de compras', 'Pasarela de pagos básica', 'Panel de administración', 'Hasta 50 productos'],
    maintenance: 'Mantenimiento desde $3500 UYU/mes'
  },
  'ecommerce-avanzada': {
    title: '🚀 e-Commerce Avanzada',
    price: 'desde $20.000 UYU',
    description: 'La e-Commerce Avanzada es para negocios que necesitan una tienda online completa con funciones avanzadas de venta.',
    includes: ['Catálogo ilimitado', 'Múltiples pasarelas de pago', 'Sistema de inventario', 'Cupones y descuentos', 'Análisis de ventas', 'Integración con envíos'],
    maintenance: 'Mantenimiento desde $5000 UYU/mes'
  }
};

function showPlanDetails(planKey) {
  const plan = planResponses[planKey];
  
  // Add user message
  const btnText = document.querySelector(`[data-plan="${planKey}"]`).textContent;
  addMessage(btnText, 'user');
  
  // Build response message
  let responseHtml = `<p style="font-weight: 600; font-size: 1.1rem; margin-bottom: 8px;">${plan.title}</p>`;
  responseHtml += `<p style="font-size: 1.5rem; font-weight: 700; color: #2563eb; margin-bottom: 12px;">${plan.price}</p>`;
  responseHtml += `<p style="margin-bottom: 12px;">${plan.description}</p>`;
  responseHtml += `<p style="font-weight: 600; margin-bottom: 8px;">🎯 Incluye:</p>`;
  responseHtml += `<ul style="margin-bottom: 12px; padding-left: 20px;">`;
  plan.includes.forEach(item => {
    responseHtml += `<li style="margin-bottom: 4px;">${item}</li>`;
  });
  responseHtml += `</ul>`;
  responseHtml += `<p style="font-style: italic; color: #64748b; margin-bottom: 16px;">${plan.maintenance}</p>`;
  responseHtml += `<p style="margin-bottom: 12px;"><strong>💡 Plus NTEC:</strong> No solo te entregamos la web, te enseñamos a usarla y te acompañamos en el proceso.</p>`;
  responseHtml += `<button class="quick-reply" onclick="window.open('https://wa.me/59896616638', '_blank')" style="background: linear-gradient(135deg, #25D366, #128C7E); color: white; padding: 12px 24px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; width: 100%;">💬 Consultar ahora</button>`;
  
  // Show typing indicator
  showTyping();
  
  setTimeout(function() {
    hideTyping();
    addMessage(responseHtml, 'agent');
    setTimeout(showContinueChattingOptions, 500);
  }, 800);
}

function showPlanOptions() {
  const planOptionsHtml = `
    <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
      <button class="quick-reply" data-plan="landing" style="text-align: left; padding: 10px 12px;">🖥️ Landing Page - $4.000 UYU</button>
      <button class="quick-reply" data-plan="estandar" style="text-align: left; padding: 10px 12px;">🌐 Web Estándar - $7.000 UYU</button>
      <button class="quick-reply" data-plan="servicios" style="text-align: left; padding: 10px 12px;">📋 Web de Servicios - $10.000 UYU</button>
      <button class="quick-reply" data-plan="ecommerce-basica" style="text-align: left; padding: 10px 12px;">🛒 e-Commerce Básica - $15.000 UYU</button>
      <button class="quick-reply" data-plan="ecommerce-avanzada" style="text-align: left; padding: 10px 12px;">🚀 e-Commerce Avanzada - $20.000 UYU</button>
    </div>
  `;
  addMessage(planOptionsHtml, 'agent');
  
  // Attach event listeners
  document.querySelectorAll('.quick-reply[data-plan]').forEach(function(btn) {
    btn.onclick = function() {
      const plan = this.getAttribute('data-plan');
      if (plan && planResponses[plan]) {
        showPlanDetails(plan);
      }
    };
  });
}

function showTyping() {
  isTyping = true;
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message agent';
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = `
    <div class="chat-bubble typing">
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
  isTyping = false;
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Chat toggle button animation
function animateChatButton() {
  let translateY = 0;
  let direction = -1;
  setInterval(function() {
    translateY += direction * 1;
    if (Math.abs(translateY) > 10) direction *= -1;
    if (!isChatOpen) {
      chatToggleBtn.style.transform = 'translateY(' + translateY + 'px)';
    }
  }, 2000);
}
animateChatButton();

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Add animation to cards
document.querySelectorAll('.service-card, .portfolio-card, .blog-card, .testimonial-card, .value-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});
