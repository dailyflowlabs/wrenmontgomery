/**
 * WREN MONTGOMERY — Interactive Engine
 * Ambient Fireflies Canvas, Carousel, Lightbox, Merch Modal, and Tailgate Club
 */

(function () {
  'use strict';

  // --- 1. HERO AMBIENT FIREFLY CANVAS ---
  const canvas = document.getElementById('fireflyCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const fireflies = [];
    const count = 40;

    class Firefly {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 40;
        this.size = Math.random() * 2.5 + 1.2;
        this.speedY = Math.random() * 1.2 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.fade = Math.random() * 0.005 + 0.002;
        this.color = Math.random() > 0.3 ? '245, 158, 11' : '251, 191, 36';
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.015) * 0.4;
        this.opacity -= this.fade;

        if (this.opacity <= 0 || this.y < -10) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${this.color}, 0.9)`;
        ctx.fill();
      }
    }

    for (let i = 0; i < count; i++) {
      const f = new Firefly();
      f.y = Math.random() * height;
      fireflies.push(f);
    }

    function animateFireflies() {
      ctx.clearRect(0, 0, width, height);
      fireflies.forEach(f => {
        f.update();
        f.draw();
      });
      requestAnimationFrame(animateFireflies);
    }

    animateFireflies();
  }

  // --- 2. NAVBAR SCROLL & MOBILE DRAWER ---
  const siteNav = document.getElementById('siteNav');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // --- 3. VISUAL ARCHIVES CAROUSEL ---
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  const slides = document.querySelectorAll('.carousel-slide');

  if (track && slides.length > 0) {
    let currentIndex = 0;

    function getVisibleSlides() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 4;
    }

    function maxIndex() {
      return Math.max(0, slides.length - getVisibleSlides());
    }

    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const totalSteps = maxIndex() + 1;
      for (let i = 0; i < totalSteps; i++) {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
        dot.dataset.index = i;
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      const visible = getVisibleSlides();
      const slideWidthPercent = 100 / visible;
      track.style.transform = `translateX(-${currentIndex * slideWidthPercent}%)`;

      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(maxIndex(), currentIndex + 1);
        updateCarousel();
      });
    }

    window.addEventListener('resize', () => {
      createDots();
      if (currentIndex > maxIndex()) currentIndex = maxIndex();
      updateCarousel();
    });

    createDots();
    updateCarousel();
  }

  // --- 4. LIGHTBOX MODAL ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('[data-lightbox-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const card = trigger.closest('.carousel-slide');
      if (!card || !lightboxModal) return;

      const img = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');

      if (lightboxImg) lightboxImg.src = img;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxDesc) lightboxDesc.textContent = desc;

      lightboxModal.classList.add('active');
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // --- 5. MERCH CUSTOM MODAL & CHECKOUT (Zero window.alert/confirm) ---
  const customModal = document.getElementById('customModal');
  const customModalTitle = document.getElementById('customModalTitle');
  const customModalBody = document.getElementById('customModalBody');

  function showCustomModal(title, htmlContent) {
    if (!customModal) return;
    if (customModalTitle) customModalTitle.textContent = title;
    if (customModalBody) customModalBody.innerHTML = htmlContent;
    customModal.classList.add('active');
  }

  window.openMerchModal = function (productId) {
    fetch('/api/merch/products')
      .then(res => res.json())
      .then(products => {
        const product = products.find(p => p.id === productId || String(p.id) === String(productId));
        if (!product) {
          showCustomModal('General Store', '<p>Item details could not be loaded at this moment. Please check back shortly!</p>');
          return;
        }

        const availableVariants = (product.variants && product.variants.length > 0)
          ? product.variants.filter(v => v.is_enabled !== false)
          : [];

        const variantOptions = availableVariants.map(v => `
          <option value="${v.id}">${v.title || 'Standard'} — $${(v.price / 100).toFixed(2)} USD</option>
        `).join('');

        const displayImg = product.images && product.images.length > 0
          ? (typeof product.images[0] === 'string' ? product.images[0] : (product.images[0]?.src || ''))
          : '';

        const modalHtml = `
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
              <img src="${displayImg}" alt="${product.title}" style="width: 120px; height: 120px; border-radius: 12px; object-fit: cover; border: 1px solid rgba(245,158,11,0.3); background: #1a1511;">
              <div style="flex: 1;">
                <h4 style="color: #fff; font-size: 1.25rem; margin-bottom: 0.35rem;">${product.title}</h4>
                <p style="font-size: 0.9rem; color: #d1c7bc; line-height: 1.4;">${product.description || 'Official Wren Montgomery Merchandise'}</p>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <label style="font-size: 0.85rem; font-weight: 700; color: #f59e0b; text-transform: uppercase;">Select Size / Edition:</label>
              <select id="merchVariantSelect" style="padding: 0.85rem 1rem; border-radius: 8px; background: #1a1511; color: #fff; border: 1px solid rgba(245,158,11,0.3); font-size: 0.95rem; outline: none;">
                ${variantOptions}
              </select>
            </div>

            <div style="margin-top: 0.5rem; display: flex; gap: 1rem;">
              <button id="confirmOrderBtn" class="btn btn-primary" style="flex: 1; padding: 0.95rem;">Proceed to Secure Checkout</button>
            </div>
            <p style="font-size: 0.8rem; color: #8e8378; text-align: center;">Hand-printed on demand and shipped with tracking.</p>
          </div>
        `;

        showCustomModal(product.title, modalHtml);

        const confirmBtn = document.getElementById('confirmOrderBtn');
        if (confirmBtn) {
          confirmBtn.addEventListener('click', () => {
            const variantId = document.getElementById('merchVariantSelect').value;
            confirmBtn.disabled = true;
            confirmBtn.textContent = 'Opening Secure Checkout...';

            fetch('/api/merch/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ productId: product.id, variantId: variantId, quantity: 1 })
            })
              .then(res => res.json())
              .then(data => {
                if (data.url) {
                  window.location.href = data.url;
                } else {
                  showCustomModal('Official Store Notice', `
                    <div style="text-align: center; padding: 1rem 0;">
                      <div style="font-size: 2.5rem; margin-bottom: 0.75rem; color: #f59e0b;">★</div>
                      <h4 style="color: #fff; font-size: 1.3rem; margin-bottom: 0.5rem;">Online Merch Checkout</h4>
                      <p style="color: #d1c7bc; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
                        ${data.error || 'Checkout is momentarily unavailable. Please check back shortly!'}
                      </p>
                      <button class="btn btn-primary" data-modal-close>Got It, Y'all!</button>
                    </div>
                  `);
                  document.querySelectorAll('[data-modal-close]').forEach(b => {
                    b.addEventListener('click', () => customModal.classList.remove('active'));
                  });
                }
              })
              .catch(err => {
                confirmBtn.disabled = false;
                confirmBtn.textContent = 'Proceed to Secure Checkout';
                console.error(err);
              });
          });
        }
      })
      .catch(err => {
        console.error(err);
        showCustomModal('General Store', '<p>Unable to load merchandise at this time.</p>');
      });
  };

  // --- AUTO-SCROLL TO HASH (e.g. /listen -> /#music) ---
  function handleHashScroll() {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }
  window.addEventListener('load', handleHashScroll);
  window.addEventListener('hashchange', handleHashScroll);

  // --- 6. THE TAILGATE CLUB FAN NEWSLETTER FORM (Strictly compliant: NO alert/confirm) ---
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email) return;

      const submitBtn = document.getElementById('newsletterSubmitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Joining...';
      }

      fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      })
        .then(res => res.json())
        .then(data => {
          if (emailInput) emailInput.value = '';
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Join The Tailgate';
          }
          showCustomModal('Welcome to The Tailgate Club!', `
            <div style="text-align: center; padding: 1.25rem 0;">
              <div style="font-size: 2.8rem; margin-bottom: 0.75rem; color: #f59e0b;">🎸</div>
              <h4 style="color: #fff; font-size: 1.4rem; margin-bottom: 0.75rem;">You're on the Guest List!</h4>
              <p style="color: #d1c7bc; font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem;">
                Thanks for joining Wren Montgomery's inner circle! You'll be the first to hear unreleased acoustic takes, tour announcements, and backstage passes straight from Leiper's Fork.
              </p>
              <button class="btn btn-primary" data-modal-close style="min-width: 140px;">Sweet!</button>
            </div>
          `);
          document.querySelectorAll('[data-modal-close]').forEach(b => {
            b.addEventListener('click', () => customModal.classList.remove('active'));
          });
        })
        .catch(err => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Join The Tailgate';
          }
          console.error(err);
        });
    });
  }
})();
