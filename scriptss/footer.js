// ===== FOOTER SECTION JAVASCRIPT =====
(function() {
  'use strict';

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
  } else {
    initFooter();
  }

  function initFooter() {
    // Smooth scroll for "Get Quote" button
    const quoteBtn = document.getElementById('footerQuoteBtn');
    
    if (quoteBtn) {
      quoteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Find the contact section
        const contactSection = document.getElementById('contact') || 
                               document.querySelector('.spt-contact') ||
                               document.querySelector('#contactSection');
        
        if (contactSection) {
          // Smooth scroll to contact section
          contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Optional: Add highlight effect to contact form
          const formCard = contactSection.querySelector('.spt-form-card');
          if (formCard) {
            formCard.style.transition = 'box-shadow 0.3s ease';
            formCard.style.boxShadow = '0 0 0 3px var(--accent)';
            setTimeout(() => {
              formCard.style.boxShadow = '';
            }, 1500);
          }
        } else {
          console.log('Contact section not found');
        }
      });
    }

    // Footer reveal animation
    const footer = document.querySelector('.spt-footer');
    
    if (footer && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0)';
            
            // Animate footer columns with stagger
            const columns = footer.querySelectorAll('.spt-footer-col');
            columns.forEach((col, index) => {
              col.style.animation = 'none';
              col.offsetHeight; // Trigger reflow
              col.style.animation = `sptFooterFadeIn 0.5s ease-out ${index * 0.1}s forwards`;
            });
            
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: '0px'
      });
      
      observer.observe(footer);
    }

    // Add current year to copyright if needed
    const copyrightElement = document.querySelector('.spt-copyright');
    if (copyrightElement) {
      const currentYear = new Date().getFullYear();
      copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear);
    }

    // Mobile menu toggle for footer links (if needed)
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Add touch-friendly hover effects
      const links = document.querySelectorAll('.spt-footer-links a, .spt-social-icon, .spt-footer-quote-btn');
      
      links.forEach(link => {
        link.addEventListener('touchstart', function() {
          this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        link.addEventListener('touchend', function() {
          this.style.transform = '';
        }, { passive: true });
      });
    }
  }
})();