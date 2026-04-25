
    // ===== ABOUT US SECTION JAVASCRIPT WITH COUNTERS =====
(function() {
  'use strict';

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAboutSection);
  } else {
    initAboutSection();
  }

  function initAboutSection() {
    // Get all stat cards with numbers
    const statNumbers = document.querySelectorAll('.spt-stat-number[data-target]');
    const statCards = document.querySelectorAll('.spt-stat-card');
    
    // Flag to ensure counters run only once
    let countersStarted = false;
    
    // Set up Intersection Observer for section visibility
    const aboutSection = document.querySelector('.spt-about');
    
    if (!aboutSection) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          // Start number counters when section becomes visible
          startNumberCounters();
          countersStarted = true;
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px'
    });
    
    observer.observe(aboutSection);
    
    // Number counter function
    function startNumberCounters() {
      statNumbers.forEach(counter => {
        const target = counter.getAttribute('data-target');
        const is247 = target === '247';
        
        // Special handling for 24/7 display
        if (is247) {
          counter.innerText = '12/7';
          return;
        }
        
        const targetNumber = parseInt(target);
        if (isNaN(targetNumber)) return;
        
        // Set starting value
        let currentNumber = 0;
        counter.innerText = currentNumber;
        
        // Determine increment speed based on target size
        const increment = targetNumber > 2000 ? 300 : 
                         targetNumber > 100 ? 3 : 
                         targetNumber > 50 ? 2 : 1;
        const intervalTime = 100; // ms
        
        const interval = setInterval(() => {
          currentNumber += increment;
          
          if (currentNumber >= targetNumber) {
            counter.innerText = targetNumber;
            clearInterval(interval);
            
            // Add a small pulse effect when counter completes
            counter.style.transform = 'scale(1.1)';
            setTimeout(() => {
              counter.style.transform = 'scale(1)';
            }, 200);
          } else {
            counter.innerText = currentNumber;
          }
        }, intervalTime);
      });
    }
    
    // Fallback for browsers without Intersection Observer
    if (!window.IntersectionObserver) {
      // Start counters immediately
      startNumberCounters();
      
      // Add visible classes to stat cards
      statCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }
    
    // Add hover effect enhancements for touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      statCards.forEach(card => {
        card.addEventListener('touchstart', function() {
          this.style.transform = 'translateY(-3px)';
          this.style.boxShadow = 'var(--shadow-hover)';
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
          this.style.transform = '';
          this.style.boxShadow = '';
        }, { passive: true });
      });
    }
    
    // Image lazy loading enhancement
    const aboutImage = document.querySelector('.spt-about-image');
    if (aboutImage) {
      // Add loading="lazy" for performance
      aboutImage.setAttribute('loading', 'lazy');
      
      // Add fade-in effect when image loads
      aboutImage.style.opacity = '0';
      aboutImage.style.transition = 'opacity 0.5s ease';
      
      if (aboutImage.complete) {
        aboutImage.style.opacity = '1';
      } else {
        aboutImage.addEventListener('load', () => {
          aboutImage.style.opacity = '1';
        });
      }
    }
    
    // Optional: Add subtle parallax to shapes on desktop
    const shapes = document.querySelectorAll('.spt-energy-shape');
    const isDesktop = window.innerWidth > 900;
    
    if (shapes.length && isDesktop && !isTouchDevice) {
      window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
          const speed = 15 + (index * 3);
          const x = (mouseX - 0.5) * speed;
          const y = (mouseY - 0.5) * speed;
          
          shape.style.transform = `translate(${x}px, ${y}px)`;
        });
      });
    }
    
    // Reset parallax on window resize
    window.addEventListener('resize', () => {
      const newIsDesktop = window.innerWidth > 900;
      if (!newIsDesktop && shapes.length) {
        shapes.forEach(shape => {
          shape.style.transform = '';
        });
      }
    });
  }
})();
