(function() {
    'use strict';

    // ----- DOM elements -----
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('navOverlay');
    const dropdownToggle = document.getElementById('productsToggle');  // parent link (Products)
    const dropdownMenu = document.getElementById('productsDropdown');
    const isMobile = () => window.innerWidth <= 768;

    // ----- Helper to close mobile nav -----
    function closeMobileNav() {
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';   // restore scroll
      // also remove any open submenu indicators if needed (but keep them consistent)
      if (dropdownMenu) dropdownMenu.classList.remove('show');
      const arrow = dropdownToggle?.querySelector('i');
      if (arrow) arrow.classList.remove('rotate');
    }

    // ----- open mobile nav -----
    function openMobileNav() {
      navLinks.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';  // prevent background scroll
    }

    // ----- toggle hamburger menu (mobile only) -----
    if (mobileToggle) {
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navLinks.classList.contains('active')) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }

    // ----- overlay click closes menu -----
    if (overlay) {
      overlay.addEventListener('click', closeMobileNav);
    }

    // ----- Products dropdown behaviour: hover on desktop, click on mobile -----
    const productsLi = document.querySelector('.dropdown');
    const arrowIcon = dropdownToggle?.querySelector('i');

    // function to handle dropdown based on screen size
    function adaptDropdownBehaviour() {
      if (!productsLi || !dropdownMenu) return;

      if (window.innerWidth > 768) {
        // DESKTOP: rely on CSS hover, remove any click artifacts
        // remove click handler (we'll re-attach later but we want to avoid double)
        productsLi.style.position = 'relative'; // ensure
        dropdownMenu.style.display = '';        // reset any inline style
        // ensure hidden by default for hover
        dropdownMenu.classList.remove('show');
        if (arrowIcon) arrowIcon.classList.remove('rotate');

        // remove any leftover click listener by re-adding a fresh one (but we manage via flag)
        // we use a named function, but we'll just remove/add later
      } else {
        // MOBILE: ensure dropdown hidden initially, add click toggling
        dropdownMenu.style.display = ''; // let class decide
        dropdownMenu.classList.remove('show');
        if (arrowIcon) arrowIcon.classList.remove('rotate');
      }
    }

    // Click handler for products link (only on mobile)
    function onProductsClick(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();

        // toggle dropdown menu
        dropdownMenu.classList.toggle('show');
        // rotate arrow
        if (arrowIcon) arrowIcon.classList.toggle('rotate');

        // close menu if user clicks outside? we handle via overlay and body click maybe not needed
      }
    }

    // Add click listener to products link
    if (dropdownToggle) {
      dropdownToggle.addEventListener('click', onProductsClick);
    }

    // On window resize, adapt behaviour and close mobile nav if needed
    window.addEventListener('resize', function() {
      adaptDropdownBehaviour();

      // if we become desktop and mobile nav is open -> close it
      if (window.innerWidth > 768) {
        if (navLinks.classList.contains('active')) {
          closeMobileNav();
        }
        // also hide any open dropdown menu (reset)
        if (dropdownMenu) dropdownMenu.classList.remove('show');
        if (arrowIcon) arrowIcon.classList.remove('rotate');
      } else {
        // if in mobile and nav is closed, everything fine
      }
    });

    // close mobile nav if user clicks a link (except when clicking products toggle on mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        // if it's products link on mobile, we already handled; but we don't want to close nav when opening dropdown
        if (link.id === 'productsToggle' && window.innerWidth <= 768) {
          // don't close nav, just toggle dropdown (already done)
          return;
        }
        // for other links, close mobile nav
        if (window.innerWidth <= 768) {
          // but prevent default if it's just hash navigation? we keep smooth
          closeMobileNav();
        }
      });
    });

    // initial call
    adaptDropdownBehaviour();

    // also escape key to close menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileNav();
      }
    });

  })();