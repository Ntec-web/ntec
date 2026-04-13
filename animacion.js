// GSAP Animations
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

// Section intros
document.querySelectorAll('.section-intro h2').forEach(h2 => {
  gsap.from(h2, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    scrollTrigger: {
      trigger: h2,
      start: 'top 85%'
    }
  });
});

document.querySelectorAll('.section-intro p').forEach(p => {
  gsap.from(p, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 0.2,
    scrollTrigger: {
      trigger: p,
      start: 'top 85%'
    }
  });
});

// Testimonials (index.html)
if (document.querySelector('.testimonial-card')) {
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: i * 0.2,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      }
    });
  });
}

// Problem cards (nosotros.html)
if (document.querySelector('.problem-card')) {
  gsap.utils.toArray('.problem-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      x: i % 2 === 0 ? -50 : 50,
      duration: 0.8,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      }
    });
  });
}
} // end if gsap

// Existing functions
function initScrollReveal(){const revealItems=document.querySelectorAll('.scroll-reveal');if(!revealItems.length)return;const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});revealItems.forEach(el=>{observer.observe(el);});}function togglePricing(btn){const card=btn.closest('.pricing-card');const extra=card.querySelector('.pricing-extra');const isActive=btn.classList.contains('active');if(isActive){extra.style.display='none';btn.classList.remove('active');btn.innerHTML='Ver más ↓';}else{extra.style.display='block';btn.classList.add('active');btn.innerHTML='Ver menos ↑';}}function initProgressBar(){const progressBar=document.getElementById('progressBar');if(!progressBar)return;window.addEventListener('scroll',()=>{const scrollTop=window.scrollY;const docHeight=document.documentElement.scrollHeight-window.innerHeight;const scrollPercent=(scrollTop/docHeight)*100;progressBar.style.width=scrollPercent+'%';},{passive:true});}window.addEventListener('scroll',function(){const header=document.getElementById('header');const backToTop=document.querySelector('.back-to-top');if(window.scrollY>50){header.style.background='rgba(15,23,42,0.98)';}else{header.style.background='rgba(15,23,42,0.95)';}if(backToTop){if(window.scrollY>300){backToTop.classList.add('show');}else{backToTop.classList.remove('show');}}},{passive:true});function toggleMenu(){const mobileMenu=document.getElementById('mobileMenu');if(!mobileMenu)return;mobileMenu.classList.toggle('active');}function handleSubmit(event){event.preventDefault();const form=event.target;const btn=form.querySelector('button');const originalHTML=btn.innerHTML;const nombre=document.getElementById('form-nombre').value;const email=document.getElementById('form-email').value;const servicio=document.getElementById('form-servicio').value;const proyecto=document.getElementById('form-proyecto').value;const mensaje=document.getElementById('form-mensaje').value;if(!nombre||!email||!mensaje){alert('Por favor completa todos los campos requeridos.');return;}btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Enviando...';btn.disabled=true;const data={nombre,email,servicio,proyecto,mensaje};fetch('https://hook.us1.make.com/xxxxxxxxxxxxxxxxxxxxx',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(response=>{if(response.ok){alert('¡Mensaje enviado! Te responderemos en menos de 24 horas.');form.reset();}else{throw new Error('Error en el envío');}}).catch(error=>{alert('Error al enviar el mensaje. Intenta de nuevo o contactanos por WhatsApp.');console.error('Error:',error);}).finally(()=>{btn.innerHTML=originalHTML;btn.disabled=false;});}

document.addEventListener('DOMContentLoaded',function(){initScrollReveal();initProgressBar();const form=document.querySelector('.contact-form form');if(form)form.addEventListener('submit',handleSubmit);});