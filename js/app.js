// =============================================================================
// QuickBite 2026 - Core Application Engine & Advanced Interactions
// Lead Student: Sabila Memon - HCI Semester Project
// =============================================================================

class QuickBiteApp {
  constructor() {
    this.currentScreen = 'screen-home';
    this.activeRestaurant = APP_DATA.restaurants[0];
    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.activeFilterBadge = 'all';
    this.isHciModeActive = false;
    
    // Initialized Cart for Sabila Memon with signature gourmet items
    this.cart = [
      {
        id: 'item_101',
        restaurantId: 'rest_1',
        name: 'Black Truffle & Fresh Burrata Tartufata',
        size: 'Regular 11" Sourdough',
        price: 18.50,
        qty: 1,
        addons: ['Extra Fresh Burrata (125g)'],
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'item_201',
        restaurantId: 'rest_2',
        name: 'Double Wagyu Truffle Melt',
        size: 'Double Patty (Standard)',
        price: 15.50,
        qty: 1,
        addons: [],
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80'
      }
    ];

    this.appliedDiscount = 0;
    this.lastDeletedItem = null;
    this.trackingStage = 2; // 1: Placed, 2: In Kitchen, 3: Courier, 4: Delivered

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderStories();
    this.renderCategories();
    this.renderRestaurants();
    this.renderCart();
    this.renderPastOrders();
    this.renderAddresses();
    this.updateCartBadge();
    this.updateTrackingUI();
  }

  // ===========================================================================
  // THEME TOGGLE, AUDIO SYNTHESIS & CELEBRATION EFFECTS
  // ===========================================================================
  toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    this.playAudioFeedback('click');
    this.showToast(isLight ? '☀️ Switched to Modern Light Mode' : '🌙 Switched to Cyberpunk Dark Mode', 'info');
  }

  // Synthesized Web Audio API sound effects (no external files required)
  playAudioFeedback(type = 'click') {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // AudioContext optional fallback
    }
  }

  // Pure Canvas Confetti Explosion
  launchConfetti() {
    this.playAudioFeedback('success');
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#FF4B2B', '#FF416C', '#00F2FE', '#4FACFE', '#10B981', '#F59E0B', '#FFF'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.45,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.7) * 20,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    let frame = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.5; // gravity
        p.rotation += p.rSpeed;
        p.alpha -= 0.012;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      frame++;
      if (frame < 90) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    render();
  }

  // ===========================================================================
  // SCREEN SWITCHING & ROUTING
  // ===========================================================================
  showScreen(screenId) {
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active');
    });

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      this.currentScreen = screenId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.screen-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-screen') === screenId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (screenId === 'screen-cart') {
      this.renderCart();
    } else if (screenId === 'screen-checkout') {
      this.renderCheckoutSummary();
    }
  }

  setupEventListeners() {
    document.querySelectorAll('.screen-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetScreen = btn.getAttribute('data-screen');
        if (targetScreen === 'screen-menu') {
          this.openRestaurantMenu(this.activeRestaurant.id);
        } else {
          this.showScreen(targetScreen);
        }
      });
    });
  }

  // ===========================================================================
  // HCI PRINCIPLES INSPECTION MODE
  // ===========================================================================
  toggleHciMode() {
    this.isHciModeActive = !this.isHciModeActive;
    const body = document.body;
    const btn = document.getElementById('toggle-hci-btn');
    const text = document.getElementById('hci-btn-text');

    if (this.isHciModeActive) {
      body.classList.add('hci-active-mode');
      btn.classList.add('active');
      text.innerText = 'HCI Principles Mode: ON';
      this.showToast('🎯 HCI Mode Activated! Click any yellow badge to inspect design heuristics.', 'info');
    } else {
      body.classList.remove('hci-active-mode');
      btn.classList.remove('active');
      text.innerText = 'HCI Principles Mode: OFF';
    }
  }

  inspectHci(principleId, event) {
    if (event) {
      event.stopPropagation();
    }
    const principle = APP_DATA.hciPrinciples.find(p => p.id === principleId);
    if (!principle) return;

    document.getElementById('hci-modal-heuristic-num').innerText = principle.heuristicNumber;
    document.getElementById('hci-modal-title').innerText = principle.name;
    document.getElementById('hci-modal-desc').innerText = principle.description;
    document.getElementById('hci-modal-impl').innerText = principle.implementationInApp;

    this.openModal('modal-hci-inspector');
  }

  // ===========================================================================
  // SCREEN 1: STORIES, CATEGORIES & RESTAURANT DIRECTORY
  // ===========================================================================
  renderStories() {
    const container = document.getElementById('stories-container');
    if (!container) return;

    container.innerHTML = APP_DATA.stories.map(st => `
      <div class="story-circle-item" onclick="app.showToast('Viewing story: ${st.name}', 'info')">
        <div class="story-ring">
          <img src="${st.image}" alt="${st.name}" class="story-img">
        </div>
        <span class="story-label">${st.name}</span>
      </div>
    `).join('');
  }

  renderCategories() {
    const container = document.getElementById('categories-container');
    if (!container) return;

    container.innerHTML = APP_DATA.categories.map(cat => `
      <button class="category-chip ${cat.id === this.selectedCategory ? 'active' : ''}" 
              onclick="app.selectCategory('${cat.id}')">
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
      </button>
    `).join('');
  }

  selectCategory(categoryId) {
    this.selectedCategory = categoryId;
    this.renderCategories();
    this.renderRestaurants();
  }

  filterByBadge(filterType, element) {
    this.activeFilterBadge = filterType;
    document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
    if (element) element.classList.add('active');
    this.renderRestaurants();
  }

  handleSearch(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.renderRestaurants();
  }

  renderRestaurants() {
    const container = document.getElementById('restaurants-container');
    const countLabel = document.getElementById('restaurants-count-label');
    if (!container) return;

    let filtered = APP_DATA.restaurants.filter(r => {
      const matchesCategory = (this.selectedCategory === 'all') || r.categories.includes(this.selectedCategory);
      const matchesSearch = !this.searchQuery || 
        r.name.toLowerCase().includes(this.searchQuery) ||
        r.cuisine.toLowerCase().includes(this.searchQuery) ||
        r.menu.some(item => item.name.toLowerCase().includes(this.searchQuery));
      let matchesBadge = true;
      if (this.activeFilterBadge === 'rated') matchesBadge = r.rating >= 4.9;
      if (this.activeFilterBadge === 'fast') matchesBadge = parseInt(r.deliveryTime) <= 20;
      if (this.activeFilterBadge === 'free') matchesBadge = r.freeDelivery;
      if (this.activeFilterBadge === 'veg') matchesBadge = r.isVegFriendly;

      return matchesCategory && matchesSearch && matchesBadge;
    });

    countLabel.innerText = `${filtered.length} kitchens ready`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🔍</div>
          <h3 style="color: #FFF;">No kitchens found matching your filter</h3>
          <p>Try resetting filters or search for 'pizza', 'wagyu', or 'ramen'</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(rest => `
      <div class="restaurant-card hci-highlight" data-hci="h2_realworld" onclick="app.openRestaurantMenu('${rest.id}')">
        <div class="rest-image-wrap">
          <img src="${rest.image}" alt="${rest.name}" loading="lazy">
          <span class="rest-badge-tag">${rest.badge}</span>
          <span class="rest-time-tag">⏱️ ${rest.deliveryTime}</span>
        </div>
        <div class="rest-content">
          <div class="rest-title-row">
            <h3 class="rest-name">${rest.name}</h3>
            <span class="rating-badge">★ ${rest.rating}</span>
          </div>
          <p class="rest-cuisine">${rest.cuisine} • ${rest.priceRange}</p>
          <div class="rest-meta-row">
            <span>📍 ${rest.distance}</span>
            <span>${rest.freeDelivery ? '<strong style="color: var(--secondary);">FREE Delivery</strong>' : `🛵 $${rest.deliveryFee.toFixed(2)} Fee`}</span>
          </div>
        </div>
        <span class="hci-badge-pill" onclick="app.inspectHci('h2_realworld', event)">HCI: Food Imagery Mental Model</span>
      </div>
    `).join('');
  }

  // ===========================================================================
  // SCREEN 2: RESTAURANT MENU DETAILS
  // ===========================================================================
  openRestaurantMenu(restaurantId) {
    const restaurant = APP_DATA.restaurants.find(r => r.id === restaurantId) || APP_DATA.restaurants[0];
    this.activeRestaurant = restaurant;

    document.getElementById('menu-rest-banner').querySelector('img').src = restaurant.image;
    document.getElementById('menu-rest-name').innerText = restaurant.name;
    document.getElementById('menu-rest-tagline').innerText = restaurant.tagline;
    document.getElementById('menu-rest-rating').innerText = restaurant.rating;
    document.getElementById('menu-rest-time').innerText = `⏱️ ${restaurant.deliveryTime}`;
    document.getElementById('menu-rest-fee').innerText = restaurant.freeDelivery ? '🛵 FREE Delivery' : `🛵 $${restaurant.deliveryFee.toFixed(2)} Delivery`;

    const dishesContainer = document.getElementById('menu-dishes-container');
    dishesContainer.innerHTML = restaurant.menu.map(item => `
      <div class="dish-card hci-highlight" data-hci="h4_consistency">
        <div class="dish-info">
          <div class="dish-tags">
            ${item.isVeg ? '<span class="dish-tag veg">🌱 Plant Based</span>' : ''}
            ${item.isSpicy ? '<span class="dish-tag spicy">🌶️ Fiery</span>' : ''}
            <span class="dish-tag badge">★ ${item.rating}</span>
          </div>
          <h3 class="dish-name">${item.name}</h3>
          <p class="dish-desc">${item.description}</p>
          <div class="dish-bottom-row">
            <span class="dish-price">$${item.price.toFixed(2)}</span>
            <button class="add-btn" onclick="app.openDishModal('${item.id}', '${restaurant.id}')">
              <span>+</span> Add Custom
            </button>
          </div>
        </div>
        <div class="dish-img-wrap">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <span class="hci-badge-pill" onclick="app.inspectHci('h4_consistency', event)">HCI: Consistent Item Layout</span>
      </div>
    `).join('');

    this.showScreen('screen-menu');
  }

  openDishModal(itemId, restaurantId) {
    const restaurant = APP_DATA.restaurants.find(r => r.id === restaurantId);
    const item = restaurant ? restaurant.menu.find(m => m.id === itemId) : null;
    if (!item) return;

    const modalContent = document.getElementById('dish-modal-content');
    modalContent.innerHTML = `
      <div style="position: relative; height: 200px; border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-glass);">
        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <h2 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; margin-bottom: 0.35rem; color: #FFF;">${item.name}</h2>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">${item.description}</p>

      ${item.options && item.options.sizes ? `
        <div style="margin-bottom: 1.5rem;">
          <label style="font-weight: 700; font-size: 0.88rem; display: block; margin-bottom: 0.6rem; color: #E2E8F0;">Select Portion Size:</label>
          <div style="display: flex; gap: 0.75rem;">
            ${item.options.sizes.map((s, idx) => `
              <label class="address-option ${idx === 0 ? 'selected' : ''}" style="flex: 1; padding: 0.75rem; cursor: pointer;">
                <input type="radio" name="modal-size-opt" value="${s.name}" data-extra="${s.extra}" ${idx === 0 ? 'checked' : ''}>
                <div style="font-size: 0.85rem;">
                  <strong>${s.name}</strong>
                  <div style="color: var(--primary); font-weight: 700;">${s.extra > 0 ? `+$${s.extra.toFixed(2)}` : 'Included'}</div>
                </div>
              </label>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="margin-bottom: 1.75rem;">
        <label style="font-weight: 700; font-size: 0.88rem; display: block; margin-bottom: 0.5rem; color: #E2E8F0;">Special Culinary Notes (for Sabila Memon):</label>
        <input type="text" id="modal-dish-instructions" class="form-input" placeholder="e.g. Crisp crust, extra truffle dip on side...">
      </div>

      <button class="btn-primary" onclick="app.addItemFromModal('${item.id}', '${restaurant.id}')">
        Add to Food Bag • $${item.price.toFixed(2)}
      </button>
    `;

    this.openModal('modal-dish-customizer');
  }

  addItemFromModal(itemId, restaurantId) {
    const restaurant = APP_DATA.restaurants.find(r => r.id === restaurantId);
    const item = restaurant ? restaurant.menu.find(m => m.id === itemId) : null;
    if (!item) return;

    let selectedSize = 'Standard';
    let extraPrice = 0;
    const checkedSize = document.querySelector('input[name="modal-size-opt"]:checked');
    if (checkedSize) {
      selectedSize = checkedSize.value;
      extraPrice = parseFloat(checkedSize.getAttribute('data-extra')) || 0;
    }

    const cartItem = {
      id: item.id + '_' + Date.now(),
      dishId: item.id,
      restaurantId: restaurant.id,
      name: item.name,
      size: selectedSize,
      price: item.price + extraPrice,
      qty: 1,
      image: item.image
    };

    this.cart.push(cartItem);
    this.closeModal('modal-dish-customizer');
    this.updateCartBadge();
    this.renderCart();
    this.showToast(`✓ Added "${item.name}" to Sabila's bag!`, 'success');
  }

  // ===========================================================================
  // SCREEN 3: CART ENGINE & CALCULATIONS
  // ===========================================================================
  renderCart() {
    const container = document.getElementById('cart-items-list');
    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🛍️</div>
          <h3 style="font-size: 1.4rem; font-weight: 800; color: #FFF; margin-bottom: 0.5rem;">Your Food Bag is Empty</h3>
          <p style="margin-bottom: 2rem;">Explore Michelin kitchens and add culinary favorites.</p>
          <button class="btn-primary" style="max-width: 220px; margin: 0 auto;" onclick="app.showScreen('screen-home')">
            Explore Kitchens
          </button>
        </div>
      `;
      this.updateBillTotals(0);
      return;
    }

    container.innerHTML = this.cart.map((item, index) => `
      <div class="cart-row">
        <div class="cart-row-left">
          <img src="${item.image}" alt="${item.name}" class="cart-thumb">
          <div>
            <h4 class="cart-item-title">${item.name}</h4>
            <p class="cart-item-subtitle">${item.size ? item.size : 'Signature Portion'}</p>
            <span style="font-weight: 800; color: var(--primary); font-size: 1rem;">$${item.price.toFixed(2)}</span>
          </div>
        </div>

        <div class="qty-stepper">
          <button class="qty-btn" onclick="app.adjustCartQty(${index}, -1)" title="Decrease Quantity">-</button>
          <span class="qty-count">${item.qty}</span>
          <button class="qty-btn" onclick="app.adjustCartQty(${index}, 1)" title="Increase Quantity">+</button>
        </div>

        <button style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.25rem; transition: color 0.2s;"
                onclick="app.removeCartItem(${index})" title="Remove Dish">
          ✕
        </button>
      </div>
    `).join('');

    this.updateBillTotals();
  }

  adjustCartQty(index, delta) {
    if (this.cart[index]) {
      this.cart[index].qty += delta;
      if (this.cart[index].qty <= 0) {
        this.removeCartItem(index);
        return;
      }
      this.updateCartBadge();
      this.renderCart();
    }
  }

  removeCartItem(index) {
    const removed = this.cart.splice(index, 1)[0];
    this.lastDeletedItem = { item: removed, index: index };
    this.updateCartBadge();
    this.renderCart();

    this.showUndoToast(`Removed "${removed.name}" from bag.`);
  }

  showUndoToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast undo-toast';
    toast.innerHTML = `
      <span>${message}</span>
      <button class="toast-undo-btn" onclick="app.undoLastDelete()">↩ Undo</button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  undoLastDelete() {
    if (this.lastDeletedItem) {
      this.cart.splice(this.lastDeletedItem.index, 0, this.lastDeletedItem.item);
      this.lastDeletedItem = null;
      this.updateCartBadge();
      this.renderCart();
      this.showToast('Item restored to Sabila\'s bag!', 'success');
    }
  }

  confirmClearCart() {
    if (this.cart.length === 0) return;
    this.openModal('modal-confirm-clear');
  }

  executeClearCart() {
    this.cart = [];
    this.appliedDiscount = 0;
    this.closeModal('modal-confirm-clear');
    this.updateCartBadge();
    this.renderCart();
    this.showToast('Bag cleared.', 'info');
  }

  applyPromoCode() {
    const input = document.getElementById('promo-input-box');
    const code = input ? input.value.trim().toUpperCase() : '';
    const msg = document.getElementById('promo-applied-message');

    if (code === 'SABILA25') {
      this.appliedDiscount = 0.25; // 25% VIP Discount
      if (msg) {
        msg.style.display = 'block';
        msg.innerText = '✓ VIP Coupon SABILA25 Applied: 25% Student Discount!';
      }
      this.showToast('🎉 VIP Student Voucher SABILA25 Applied: 25% OFF!', 'success');
      this.launchConfetti();
      this.updateBillTotals();
    } else if (code === 'QUICK20') {
      this.appliedDiscount = 0.20;
      if (msg) {
        msg.style.display = 'block';
        msg.innerText = '✓ Coupon QUICK20 Applied: 20% Discount!';
      }
      this.showToast('🎉 Promo Code QUICK20 applied! 20% OFF', 'success');
      this.launchConfetti();
      this.updateBillTotals();
    } else {
      this.showToast('Invalid promo code. Try "SABILA25"', 'info');
    }
  }

  updateBillTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const deliveryFee = subtotal > 0 ? (subtotal > 40 ? 0.00 : 1.99) : 0;
    const tax = subtotal * 0.10;
    
    let discountAmount = 0;
    if (this.appliedDiscount > 0) {
      discountAmount = subtotal * this.appliedDiscount;
    }

    const grandTotal = Math.max(0, (subtotal + deliveryFee + tax) - discountAmount);

    if (document.getElementById('bill-subtotal')) {
      document.getElementById('bill-subtotal').innerText = `$${subtotal.toFixed(2)}`;
      document.getElementById('bill-delivery').innerText = deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`;
      document.getElementById('bill-tax').innerText = `$${tax.toFixed(2)}`;
      document.getElementById('bill-grand-total').innerText = `$${grandTotal.toFixed(2)}`;
      
      const discountRow = document.getElementById('bill-discount-row');
      if (discountRow) {
        if (discountAmount > 0) {
          discountRow.style.display = 'flex';
          document.getElementById('bill-discount').innerText = `-$${discountAmount.toFixed(2)}`;
        } else {
          discountRow.style.display = 'none';
        }
      }
    }

    if (document.getElementById('checkout-final-amount')) {
      document.getElementById('checkout-final-amount').innerText = `$${grandTotal.toFixed(2)}`;
    }
  }

  updateCartBadge() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('header-cart-badge');
    const tabCounts = document.querySelectorAll('.tab-cart-count');

    if (badge) {
      badge.innerText = totalItems;
      badge.classList.add('bump');
      setTimeout(() => badge.classList.remove('bump'), 250);
    }
    tabCounts.forEach(el => el.innerText = totalItems);
  }

  // ===========================================================================
  // SCREEN 4: CHECKOUT & INTERACTIVE 3D CARD
  // ===========================================================================
  renderAddresses() {
    const list = document.getElementById('checkout-address-list');
    const profileList = document.getElementById('profile-addresses-container');
    if (!list) return;

    list.innerHTML = APP_DATA.user.savedAddresses.map((addr, idx) => `
      <label class="address-option ${idx === 0 ? 'selected' : ''}" onclick="app.selectAddress(this)">
        <input type="radio" name="checkout-addr" value="${addr.id}" ${idx === 0 ? 'checked' : ''}>
        <div>
          <strong style="color: #FFF;">${addr.label} (${addr.tag})</strong>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${addr.address}</p>
        </div>
      </label>
    `).join('');

    if (profileList) {
      profileList.innerHTML = APP_DATA.user.savedAddresses.map(addr => `
        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-lg); padding: 1.5rem;">
          <h4 style="font-weight: 800; color: #FFF; margin-bottom: 0.35rem;">${addr.icon} ${addr.label}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${addr.address}</p>
        </div>
      `).join('');
    }
  }

  selectAddress(el) {
    document.querySelectorAll('.address-option').forEach(opt => opt.classList.remove('selected'));
    if (el) el.classList.add('selected');
  }

  updateLiveCard(value, field) {
    if (field === 'number') {
      const formatted = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
      document.getElementById('card-number-render').innerText = formatted || '4532 •••• •••• 8921';
    } else if (field === 'name') {
      document.getElementById('card-name-render').innerText = (value.toUpperCase() || 'SABILA MEMON');
    } else if (field === 'exp') {
      document.getElementById('card-exp-render').innerText = value || '08/29';
    }
  }

  selectPaymentMethod(method, element) {
    document.querySelectorAll('.pay-card').forEach(c => c.classList.remove('selected'));
    if (element) element.classList.add('selected');

    const cardFields = document.getElementById('card-fields-section');
    if (cardFields) {
      cardFields.style.display = method === 'card' ? 'block' : 'none';
    }
  }

  renderCheckoutSummary() {
    const container = document.getElementById('checkout-summary-mini');
    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">No items in bag</p>';
      return;
    }

    container.innerHTML = this.cart.map(item => `
      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.6rem;">
        <span style="color: #E2E8F0;">${item.qty}x ${item.name}</span>
        <strong style="color: #FFF;">$${(item.price * item.qty).toFixed(2)}</strong>
      </div>
    `).join('');

    this.updateBillTotals();
  }

  placeOrder() {
    if (this.cart.length === 0) {
      this.showToast('Please add culinary items to your bag first!', 'info');
      this.showScreen('screen-home');
      return;
    }

    const btn = document.getElementById('place-order-btn');
    btn.innerHTML = '<span>⚡ Encrypting 256-Bit Payment for Sabila...</span>';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      btn.innerHTML = '<span>⚡ Authorize & Place Order</span>';
      btn.style.pointerEvents = 'auto';

      this.cart = [];
      this.updateCartBadge();
      this.trackingStage = 1;
      this.updateTrackingUI();

      this.showScreen('screen-tracking');
      this.showToast('🎉 Order Successfully Authorized for Sabila Memon!', 'success');
    }, 1200);
  }

  // ===========================================================================
  // SCREEN 5: LIVE ORDER TRACKING
  // ===========================================================================
  advanceTrackingStage() {
    this.trackingStage++;
    if (this.trackingStage > 4) {
      this.trackingStage = 1;
    }
    this.updateTrackingUI();
    this.showToast(`Delivery Advanced: Stage ${this.trackingStage}/4`, 'info');
  }

  updateTrackingUI() {
    const stage = this.trackingStage;
    const progressFill = document.getElementById('tracking-stepper-fill');
    const etaText = document.getElementById('tracking-eta-time');
    const subtitle = document.getElementById('tracking-status-subtitle');
    const bike = document.getElementById('courier-bike-marker');
    const islandEta = document.getElementById('island-eta-text');

    for (let i = 1; i <= 4; i++) {
      const stepNode = document.getElementById(`track-step-${i}`);
      if (!stepNode) continue;
      stepNode.classList.remove('active', 'completed');
      if (i < stage) {
        stepNode.classList.add('completed');
        stepNode.querySelector('.track-circle').innerText = '✓';
      } else if (i === stage) {
        stepNode.classList.add('active');
        stepNode.querySelector('.track-circle').innerText = ['📋', '🍳', '🛵', '🎉'][i - 1];
      }
    }

    if (stage === 1) {
      if (progressFill) progressFill.style.width = '10%';
      if (etaText) etaText.innerText = '25 - 30 mins';
      if (islandEta) islandEta.innerText = 'Arriving in 28 mins';
      if (subtitle) subtitle.innerText = 'Order received by chef and being queued.';
      if (bike) { bike.style.left = '15%'; bike.style.top = '65%'; }
    } else if (stage === 2) {
      if (progressFill) progressFill.style.width = '35%';
      if (etaText) etaText.innerText = '18 - 25 mins';
      if (islandEta) islandEta.innerText = 'In Kitchen (18m)';
      if (subtitle) subtitle.innerText = 'Chef is preparing your meal with artisan ingredients.';
      if (bike) { bike.style.left = '32%'; bike.style.top = '48%'; }
    } else if (stage === 3) {
      if (progressFill) progressFill.style.width = '70%';
      if (etaText) etaText.innerText = '8 - 12 mins';
      if (islandEta) islandEta.innerText = 'Courier Riding (8m)';
      if (subtitle) subtitle.innerText = 'Marcus Vance has picked up your food and is riding your way!';
      if (bike) { bike.style.left = '65%'; bike.style.top = '42%'; }
    } else if (stage === 4) {
      if (progressFill) progressFill.style.width = '100%';
      if (etaText) etaText.innerText = 'Delivered! 🎉';
      if (islandEta) islandEta.innerText = 'Delivered to Doorstep';
      if (subtitle) subtitle.innerText = 'Meal arrived at Skyline Towers. Bon appétit, Sabila!';
      if (bike) { bike.style.left = '88%'; bike.style.top = '32%'; }
    }
  }

  confirmCancelOrder() {
    this.openModal('modal-confirm-cancel');
  }

  executeCancelOrder() {
    this.closeModal('modal-confirm-cancel');
    this.showToast('Order #QB-99412 cancelled. 100% Refund credited to Sabila Memon.', 'info');
    this.showScreen('screen-home');
  }

  // ===========================================================================
  // SCREEN 6: USER PROFILE & FAST REORDER
  // ===========================================================================
  renderPastOrders() {
    const container = document.getElementById('past-orders-container');
    if (!container) return;

    container.innerHTML = APP_DATA.pastOrders.map(order => `
      <div class="order-history-card">
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <img src="${order.restaurantImage}" alt="${order.restaurantName}" class="order-hist-thumb">
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.35rem;">
              <h4 style="font-size: 1.15rem; font-weight: 800; color: #FFF;">${order.restaurantName}</h4>
              <span style="font-size: 0.78rem; background: rgba(16, 185, 129, 0.2); color: #34D399; padding: 2px 8px; border-radius: 4px; font-weight: 800;">
                ✓ ${order.status}
              </span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.35rem;">${order.itemsSummary}</p>
            <span style="font-size: 0.8rem; color: #94A3B8;">Ordered on ${order.date} • Total: $${order.total.toFixed(2)}</span>
          </div>
        </div>
        <button class="btn-secondary" onclick="app.reorderPastOrder('${order.id}')" title="1-Click Fast Reorder">
          🔁 Reorder in 1-Click
        </button>
      </div>
    `).join('');
  }

  reorderPastOrder(orderId) {
    const order = APP_DATA.pastOrders.find(o => o.id === orderId);
    if (!order) return;

    this.cart.push({
      id: 'reorder_' + Date.now(),
      name: 'Chef Tasting Special',
      size: 'Signature Portion',
      price: order.total * 0.85,
      qty: 1,
      image: order.restaurantImage
    });

    this.updateCartBadge();
    this.renderCart();
    this.showScreen('screen-cart');
    this.showToast(`✓ Dishes from ${order.restaurantName} reloaded into Sabila's bag!`, 'success');
  }

  // ===========================================================================
  // MODALS & NOTIFICATIONS
  // ===========================================================================
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }
}

// Global exposure
const app = new QuickBiteApp();
