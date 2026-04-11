
// ===== HERO SECTION JAVASCRIPT (modal & form - unchanged) =====
(function() {
  'use strict';

  // DOM elements
  const modal = document.getElementById('sptModalOverlay');
  const openBtn = document.getElementById('sptGetQuoteBtn');
  const closeBtn = document.getElementById('sptCloseModalBtn');
  const categorySelect = document.getElementById('sptCategory');
  const productGroup = document.getElementById('sptProductGroup');
  const productOptions = document.getElementById('sptProductOptions');
  const form = document.getElementById('sptQuoteForm');
  const nameInput = document.getElementById('sptFullName');
  const phoneInput = document.getElementById('sptPhone');
  const nameError = document.getElementById('sptNameError');
  const phoneError = document.getElementById('sptPhoneError');
  const productError = document.getElementById('sptProductError');

  // product lists
  const powerProducts = ['Inverter', 'Battery', 'Solar System'];
  const waterProducts = ['RO System', 'Water Softener'];

  // open modal
  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // close modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    form.reset();
    productGroup.style.display = 'none';
    productOptions.innerHTML = '';
    hideAllErrors();
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // category change -> render products
  categorySelect.addEventListener('change', (e) => {
    const val = e.target.value;
    if (!val) {
      productGroup.style.display = 'none';
      productOptions.innerHTML = '';
      return;
    }

    const products = val === 'power' ? powerProducts : waterProducts;
    let html = '';
    products.forEach(prod => {
      const id = `spt_${prod.replace(/\s/g, '')}`;
      html += `<div class="spt-radio-item">
        <input type="radio" name="sptProduct" id="${id}" value="${prod}">
        <label for="${id}">${prod}</label>
      </div>`;
    });
    productOptions.innerHTML = html;
    productGroup.style.display = 'block';
  });

  // helpers
  function hideAllErrors() {
    [nameError, phoneError, productError].forEach(el => el.classList.remove('show'));
  }

  function validateForm() {
    let isValid = true;
    hideAllErrors();

    const name = nameInput.value.trim();
    if (!name) {
      nameError.classList.add('show');
      isValid = false;
    }

    const phone = phoneInput.value.trim();
    const phoneRegex = /^\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      phoneError.classList.add('show');
      isValid = false;
    }

    const selectedProduct = document.querySelector('input[name="sptProduct"]:checked');
    if (!selectedProduct) {
      productError.classList.add('show');
      isValid = false;
    }

    if (!categorySelect.value) {
      alert('Please select a category');
      isValid = false;
    }

    return isValid ? { name, phone, product: selectedProduct?.value } : null;
  }

  // submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = validateForm();
    if (!data) return;

    const message = `Name: ${data.name}%0APhone: ${data.phone}%0AProduct: ${data.product}%0ASource: Sairam Power Tech Website`;
    const waURL = `https://wa.me/919789029012?text=${message}`;

    closeModal();
    window.open(waURL, '_blank');
  });

  // escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
})();

