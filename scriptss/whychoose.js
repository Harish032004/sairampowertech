
    // ===== WHY CHOOSE US SECTION - SCROLL REVEAL ANIMATION =====
(function() {
  'use strict';

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhyChooseSection);
  } else {
    initWhyChooseSection();
  }

  function initWhyChooseSection() {
    // Get all feature cards
    const featureCards = document.querySelectorAll('.spt-feature-card');
    
    // If no cards found, exit
    if (!featureCards.length) return;

    // Set up Intersection Observer for scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add('visible');
          
          // Optional: stop observing after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -30px 0px' // Trigger slightly before element enters viewport
    });

    // Observe each feature card
    featureCards.forEach(card => {
      observer.observe(card);
    });

    // Fallback for browsers that don't support Intersection Observer
    if (!window.IntersectionObserver) {
      // Simple fallback: show all cards immediately
      featureCards.forEach(card => {
        card.classList.add('visible');
      });
    }

    // Add staggered animation effect for smoother reveal
    featureCards.forEach((card, index) => {
      card.style.transitionDelay = `${0.05 * index}s`;
    });

    // Optional: Add touch device support
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      featureCards.forEach(card => {
        card.addEventListener('touchstart', function() {
          this.style.transform = 'translateY(-5px)';
          this.style.boxShadow = 'var(--shadow-hover)';
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
          this.style.transform = '';
          this.style.boxShadow = '';
        }, { passive: true });
      });
    }
  }
})();

