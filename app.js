// Storage Manager Module
const StorageManager = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  },

  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// Coupon Manager Module
const CouponManager = {
  current: [],
  archived: [],

  init() {
    this.current = StorageManager.get('current-coupons');
    this.archived = StorageManager.get('archived-coupons');
  },

  addCoupons(codes) {
    const validCodes = codes
      .split('\n')
      .map(code => code.trim().toUpperCase())
      .filter(code => code && !this.exists(code));

    this.current.push(...validCodes.map(code => ({ code, id: Date.now() + Math.random() })));
    this.save();
    return validCodes.length;
  },

  archiveCoupon(id) {
    const couponIndex = this.current.findIndex(c => c.id === id);
    if (couponIndex > -1) {
      const coupon = this.current.splice(couponIndex, 1)[0];
      this.archived.push(coupon);
      this.save();
      return true;
    }
    return false;
  },

  unarchiveCoupon(id) {
    const couponIndex = this.archived.findIndex(c => c.id === id);
    if (couponIndex > -1) {
      const coupon = this.archived.splice(couponIndex, 1)[0];
      this.current.push(coupon);
      this.save();
      return true;
    }
    return false;
  },

  deleteCoupon(id) {
    const couponIndex = this.archived.findIndex(c => c.id === id);
    if (couponIndex > -1) {
      this.archived.splice(couponIndex, 1);
      this.save();
      return true;
    }
    return false;
  },

  exists(code) {
    return [...this.current, ...this.archived].some(c => c.code === code);
  },

  save() {
    StorageManager.set('current-coupons', this.current);
    StorageManager.set('archived-coupons', this.archived);
  }
};

// UI Manager Module
const UIManager = {
  currentTab: 'current',

  init() {
    this.bindTabEvents();
    this.render();
  },

  bindTabEvents() {
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });
  },

  switchTab(tab) {
    this.currentTab = tab;

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

    document.querySelectorAll('.coupon-list').forEach(list => list.classList.remove('active'));
    document.getElementById(`${tab}-list`).classList.add('active');
  },

  render() {
    this.renderList('current', CouponManager.current);
    this.renderList('archived', CouponManager.archived);
  },

  renderList(type, coupons) {
    const list = document.getElementById(`${type}-list`);

    if (coupons.length === 0) {
      list.innerHTML = `<div class="empty-state">No ${type} coupons</div>`;
      return;
    }

    list.innerHTML = coupons.map(coupon =>
      `<div class="coupon-item" data-id="${coupon.id}">${coupon.code}</div>`
    ).join('');
  }
};

// Touch Handler Module
const TouchHandler = {
  startX: 0,
  currentX: 0,
  element: null,
  threshold: 80,

  init() {
    document.addEventListener('touchstart', this.handleTouchStart.bind(this));
    document.addEventListener('touchmove', this.handleTouchMove.bind(this));
    document.addEventListener('touchend', this.handleTouchEnd.bind(this));
  },

  handleTouchStart(e) {
    if (!e.target.classList.contains('coupon-item')) return;

    this.element = e.target;
    this.startX = e.touches[0].clientX;
    this.currentX = this.startX;
  },

  handleTouchMove(e) {
    if (!this.element) return;

    e.preventDefault();
    this.currentX = e.touches[0].clientX;
    const deltaX = this.currentX - this.startX;

    if (Math.abs(deltaX) > 10) {
      this.element.classList.add('swiping');
      this.element.style.setProperty('--swipe-x', `${deltaX}px`);
    }
  },

  handleTouchEnd(e) {
    if (!this.element) return;

    const deltaX = this.currentX - this.startX;
    const id = parseFloat(this.element.dataset.id);

    if (Math.abs(deltaX) < 10) {
      // Tap - copy to clipboard
      ClipboardManager.copy(this.element.textContent);
    } else if (Math.abs(deltaX) > this.threshold) {
      if (UIManager.currentTab === 'current') {
        // Swipe in current tab - archive coupon
        if (CouponManager.archiveCoupon(id)) {
          ToastManager.show('Coupon archived');
          UIManager.render();
        }
      } else if (UIManager.currentTab === 'archived') {
        // Swipe in archived tab
        if (deltaX < 0) {
          // Swipe left - unarchive (back to current)
          if (CouponManager.unarchiveCoupon(id)) {
            ToastManager.show('Coupon moved to current');
            UIManager.render();
          }
        } else {
          // Swipe right - delete
          if (CouponManager.deleteCoupon(id)) {
            ToastManager.show('Coupon deleted');
            UIManager.render();
          }
        }
      }
    }

    this.element.classList.remove('swiping');
    this.element.style.removeProperty('--swipe-x');
    this.element = null;
  }
};

// Clipboard Manager Module
const ClipboardManager = {
  async copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      ToastManager.show('Copied to clipboard');
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      ToastManager.show('Copied to clipboard');
    }
  }
};

// Toast Manager Module
const ToastManager = {
  show(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }
};

// Modal Manager Module
const ModalManager = {
  init() {
    document.getElementById('add-button').addEventListener('click', this.show.bind(this));
    document.getElementById('cancel-button').addEventListener('click', this.hide.bind(this));
    document.getElementById('save-button').addEventListener('click', this.save.bind(this));

    document.getElementById('add-modal').addEventListener('click', (e) => {
      if (e.target.id === 'add-modal') this.hide();
    });
  },

  show() {
    document.getElementById('add-modal').classList.add('active');
    document.getElementById('coupon-input').focus();
  },

  hide() {
    document.getElementById('add-modal').classList.remove('active');
    document.getElementById('coupon-input').value = '';
  },

  save() {
    const input = document.getElementById('coupon-input').value;
    if (!input.trim()) {
      this.hide();
      return;
    }

    const count = CouponManager.addCoupons(input);
    if (count > 0) {
      ToastManager.show(`${count} coupon(s) added`);
      UIManager.render();
    } else {
      ToastManager.show('No valid coupons to add');
    }

    this.hide();
  }
};

// Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(registration => console.log('SW registered'))
    .catch(error => console.log('SW registration failed'));
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  CouponManager.init();
  UIManager.init();
  TouchHandler.init();
  ModalManager.init();
});
