// ===== COMPLETELY FIXED TESTIMONIAL CAROUSEL JAVASCRIPT =====
(function() {
  'use strict';

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonialCarousel);
  } else {
    initTestimonialCarousel();
  }

  function initTestimonialCarousel() {
    // Get DOM elements
    const track = document.getElementById('testimonialTrack');
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');
    const dots = document.querySelectorAll('.spt-dot');
    const container = document.querySelector('.spt-carousel-container');
    
    if (!track || !prevArrow || !nextArrow || !dots.length || !container) return;

    // Get all cards
    const cards = Array.from(document.querySelectorAll('.spt-testimonial-card'));
    const totalCards = cards.length;
    
    // State variables
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let autoScrollInterval;
    let isHovering = false;
    let cardWidth = 0;
    let gap = 30;

    // Calculate cards per view based on screen width
    function getCardsPerView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 992) return 2;
      return 3;
    }

    // Calculate the maximum index we can scroll to
    function getMaxIndex() {
      return Math.max(0, totalCards - cardsPerView);
    }

    // Calculate card width dynamically
    function calculateCardWidth() {
      if (cards.length === 0) return 0;
      
      // Get container width
      const containerWidth = container.offsetWidth;
      const containerPadding = 100; // 50px padding on each side (left + right)
      const availableWidth = containerWidth - containerPadding;
      
      // Calculate width based on cards per view
      const totalGapWidth = (cardsPerView - 1) * gap;
      cardWidth = (availableWidth - totalGapWidth) / cardsPerView;
      
      return cardWidth;
    }

    // Update track position
    function updateCarousel(animate = true) {
      if (!track || !cards.length) return;
      
      // Recalculate card width to ensure accuracy
      calculateCardWidth();
      
      // Set fixed width on each card for consistent sizing
      cards.forEach(card => {
        card.style.flex = `0 0 ${cardWidth}px`;
        card.style.maxWidth = `${cardWidth}px`;
      });
      
      // Calculate the offset based on current index
      const offset = currentIndex * (cardWidth + gap);
      
      // Apply transform
      track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
      track.style.transform = `translateX(-${offset}px)`;
      
      // Update dots
      updateDots();
      
      // Debug log
      console.log('Current index:', currentIndex, 'Card width:', cardWidth, 'Offset:', offset);
    }

    // Update dot indicators
    function updateDots() {
      dots.forEach((dot, index) => {
        if (index < totalCards) {
          dot.classList.toggle('active', index === currentIndex);
        }
      });
    }

    // Go to next slide
    function nextSlide() {
      const maxIndex = getMaxIndex();
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        // Loop to beginning
        currentIndex = 0;
      }
      updateCarousel(true);
    }

    // Go to previous slide
    function prevSlide() {
      const maxIndex = getMaxIndex();
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        // Loop to end
        currentIndex = maxIndex;
      }
      updateCarousel(true);
    }

    // Go to specific slide (dot click)
    function goToSlide(index) {
      const maxIndex = getMaxIndex();
      currentIndex = Math.min(index, maxIndex);
      updateCarousel(true);
    }

    // Auto-scroll functionality
    function startAutoScroll() {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(() => {
        if (!isHovering) {
          nextSlide();
        }
      }, 3000); // 3 seconds
    }

    function stopAutoScroll() {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    }

    // Handle hover pause
    track.addEventListener('mouseenter', () => {
      isHovering = true;
      stopAutoScroll();
    });

    track.addEventListener('mouseleave', () => {
      isHovering = false;
      startAutoScroll();
    });

    // Arrow click handlers
    nextArrow.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      nextSlide();
      // Reset auto-scroll timer
      stopAutoScroll();
      startAutoScroll();
    });

    prevArrow.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      prevSlide();
      // Reset auto-scroll timer
      stopAutoScroll();
      startAutoScroll();
    });

    // Dot click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (index < totalCards) {
          goToSlide(index);
          // Reset auto-scroll timer
          stopAutoScroll();
          startAutoScroll();
        }
      });
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newCardsPerView = getCardsPerView();
        if (newCardsPerView !== cardsPerView) {
          cardsPerView = newCardsPerView;
          // Adjust current index to prevent showing empty space
          const maxIndex = getMaxIndex();
          currentIndex = Math.min(currentIndex, maxIndex);
        }
        updateCarousel(false); // Update without animation
      }, 150);
    });

    // Mobile swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isSwiping = true;
      stopAutoScroll(); // Pause auto-scroll during swipe
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      
      const touchCurrentX = e.changedTouches[0].screenX;
      const diff = touchCurrentX - touchStartX;
      
      // Optional: Add visual feedback during swipe (drag effect)
      if (Math.abs(diff) > 10) {
        e.preventDefault();
        
        // Calculate temporary transform for drag effect (optional)
        const cardW = cardWidth + gap;
        const currentOffset = currentIndex * cardW;
        const dragOffset = diff * 0.3; // Reduce drag intensity for smoother feel
        track.style.transition = 'none';
        track.style.transform = `translateX(-${currentOffset - dragOffset}px)`;
      }
    }, { passive: false });

    track.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      isSwiping = false;
      startAutoScroll(); // Resume auto-scroll after swipe
    }, { passive: true });

    track.addEventListener('touchcancel', () => {
      isSwiping = false;
      // Reset to proper position
      updateCarousel(true);
      startAutoScroll();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left -> next
          nextSlide();
        } else {
          // Swipe right -> previous
          prevSlide();
        }
      } else {
        // If not swiped enough, snap back to current position
        updateCarousel(true);
      }
    }

    // Initial setup
    function initializeCarousel() {
      cardsPerView = getCardsPerView();
      currentIndex = 0;
      
      // Make sure track is set up correctly
      if (track) {
        track.style.display = 'flex';
        track.style.gap = `${gap}px`;
        track.style.willChange = 'transform';
      }
      
      // Calculate and set card widths
      calculateCardWidth();
      cards.forEach(card => {
        card.style.flex = `0 0 ${cardWidth}px`;
        card.style.maxWidth = `${cardWidth}px`;
        card.style.margin = '0';
      });
      
      updateCarousel(false);
      startAutoScroll();
      
      // Force multiple recalculations to ensure everything is set
      setTimeout(() => {
        calculateCardWidth();
        cards.forEach(card => {
          card.style.flex = `0 0 ${cardWidth}px`;
          card.style.maxWidth = `${cardWidth}px`;
        });
        updateCarousel(false);
      }, 100);
      
      setTimeout(() => {
        calculateCardWidth();
        updateCarousel(false);
      }, 300);
    }

    // Initialize after images might have loaded
    if (document.readyState === 'complete') {
      initializeCarousel();
    } else {
      window.addEventListener('load', initializeCarousel);
    }

    // Cleanup on page hide
    window.addEventListener('beforeunload', () => {
      stopAutoScroll();
    });

    // Pause auto-scroll when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoScroll();
      } else {
        startAutoScroll();
      }
    });

    // Add fade-in animation for cards when section is visible
    const testimonialSection = document.querySelector('.spt-testimonials');
    if (testimonialSection) {
      // Initially set cards to invisible
      cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      });
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, index * 100);
            });
            // Stop observing after animation
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      observer.observe(testimonialSection);
    }
  }
})();