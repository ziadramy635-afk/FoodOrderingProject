// main.js — shared UI helpers (no backend calls; hooks for later)
(function(){
  /* ---------- helpers ---------- */
  function $q(sel, root = document) { return root.querySelector(sel); }
  function $qa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }
  function param(name) { return new URLSearchParams(location.search).get(name); }

  /* ---------- cart badge (localStorage hook) ---------- */
  function cartCount(){
    try {
      const c = JSON.parse(localStorage.getItem('cart')) || [];
      return c.reduce((s,i) => s + (i.qty || 1), 0);
    } catch(e){ return 0; }
  }
  function updateCartBadge(){
    $qa('#cart-count').forEach(el => el.textContent = cartCount());
  }

  /* ---------- navbar init (attach to links) ---------- */
  function initNavbar(){
    updateCartBadge();
    $qa('.nav-cart-btn').forEach(b => {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'cart.html';
      });
    });
  }

  /* ---------- menu page hook: get restaurant_id ---------- */
  function getRestaurantId(){
    return param('restaurant_id');
  }

  /* ---------- tracking UI helper: set active step ---------- */
  function setTrackingStep(stepIndex){
    const steps = $qa('.track-step');
    steps.forEach((s,i) => {
      s.classList.toggle('active', i <= stepIndex);
    });
  }

  /* ---------- utility: mark data containers for binding later ---------- */
  function markContainers(){
    $qa('[data-bind]').forEach(el => {
      // placeholder for later binding by developers
    });
  }

  /* ---------- expose to window for pages to use ---------- */
  window.UI = {
    initNavbar,
    updateCartBadge,
    cartCount,
    getRestaurantId,
    setTrackingStep,
    param,
    markContainers
  };

  /* auto init when DOM ready */
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    markContainers();
  });

  // عند تحميل الصفحة، يمكنك جلب حالة الطلب من الـ API
fetch('/api/order-status?order_id=123')
  .then(response => response.json())
  .then(data => {
    // تحديث الحالة بناءً على البيانات المستلمة
  });



})();
