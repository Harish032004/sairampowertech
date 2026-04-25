// ===== INVERTER PRODUCTS SECTION JAVASCRIPT =====
(function() {
  'use strict';

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductsSection);
  } else {
    initProductsSection();
  }

  function initProductsSection() {
    // WhatsApp number
    const WHATSAPP_NUMBER = '919789029012';
    
    // Get all enquiry buttons
    const enquiryButtons = document.querySelectorAll('.spt-enquiry-btn');
    
    if (!enquiryButtons.length) return;

    // Add click handler to each button
    enquiryButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get product name from data attribute
        const productName = this.getAttribute('data-product') || 
                           this.closest('.spt-product-card')?.querySelector('.spt-product-name')?.textContent ||
                           'Inverter';
        
        // Create WhatsApp message
        const message = `Hello, I am interested in this Product: ${productName}. Please share more details.`;
        
        // Encode the message
        const encodedMessage = encodeURIComponent(message);
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        // Add visual feedback
        const originalText = this.innerHTML;
        this.innerHTML = 'Opening WhatsApp...';
        this.style.backgroundColor = '#25D366';
        this.style.color = 'white';
        this.style.borderColor = '#25D366';
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Reset button after 2 seconds
        setTimeout(() => {
          this.innerHTML = originalText;
          this.style.backgroundColor = '';
          this.style.color = '';
          this.style.borderColor = '';
        }, 2000);
      });
    });

    // Scroll reveal animation for cards
    const productCards = document.querySelectorAll('.spt-product-card');
    
    if (productCards.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Card already has fade-in animation from CSS
            // Just ensure it becomes visible
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Optional: Add subtle pulse to first visible card
            if (entry.target === productCards[0]) {
              entry.target.style.transition = 'all 0.5s ease-out';
            }
            
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      });

      productCards.forEach(card => {
        observer.observe(card);
      });
    }

    // Add touch feedback for mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      enquiryButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
          this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
          this.style.transform = '';
        }, { passive: true });
      });
    }

    // Log initialization
    console.log('Products section initialized with', enquiryButtons.length, 'products');
  }
})();