const products = [
  { id: 'heavyweight-tee', name: 'Heavyweight Tee', category: 'T-Shirts', price: 68, colors: ['Black', 'White', 'Olive', 'Sand'], description: 'A foundational tee cut from substantial 260gsm organic cotton. Relaxed through the body with a clean ribbed collar and a softly structured shoulder.', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1100&q=88', 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=1100&q=88', 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1100&q=88'] },
  { id: 'relaxed-short', name: 'Relaxed Short', category: 'Shorts', price: 82, colors: ['Black', 'White', 'Olive', 'Sand'], description: 'An easy summer short with a considered, knee-skimming proportion. Finished with an elasticated waist, deep side pockets, and a soft garment wash.', images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1100&q=88', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&q=88', 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1100&q=88'] },
  { id: 'studio-hoodie', name: 'Studio Hoodie', category: 'Hoodies', price: 118, colors: ['Black', 'White', 'Olive', 'Sand'], description: 'Our midweight everyday layer in brushed-back cotton fleece. Dropped shoulders, a generous hood, and ribbed trims keep the silhouette quietly substantial.', images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1100&q=88', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1100&q=88&sat=-20', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&q=88&con=-20'] },
  { id: 'daily-tee', name: 'Daily Tee', category: 'T-Shirts', price: 54, colors: ['Black', 'White', 'Olive', 'Sand'], description: 'A lighter-weight everyday tee with a straight fit and a dry, breathable hand feel. Built to be worn often, washed well, and kept close.', images: ['https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1100&q=88', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1100&q=88', 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=88&sat=-10'] },
  { id: 'utility-short', name: 'Utility Short', category: 'Shorts', price: 94, colors: ['Black', 'White', 'Olive', 'Sand'], description: 'A utility-inspired short in crisp cotton twill. Two considered cargo pockets add function without disturbing its clean, graphic line.', images: ['https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1100&q=88', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1100&q=88', 'https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=1100&q=88'] },
  { id: 'heavy-fleece', name: 'Heavy Fleece Hoodie', category: 'Hoodies', price: 132, colors: ['Black', 'White', 'Olive', 'Sand'], description: 'A dense 480gsm fleece hoodie with a soft brushed interior. Oversized without excess, it is the layer that gives every look its shape.', images: ['https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1100&q=88', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1100&q=88&sat=-35', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1100&q=88'] }
];

const colorValues = { Black: '#111111', White: '#ffffff', Olive: '#69705c', Sand: '#cfc1ab' };
const state = { cart: [], activeProduct: null, activeImage: 0, activeSize: 'M', activeColor: 'Black', filter: 'All' };
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function money(value) { return `$${value.toFixed(2)}`; }
function getProduct(id) { return products.find((product) => product.id === id); }
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600); }
function setHidden(element, hidden) { element.classList.toggle('hidden', hidden); element.setAttribute('aria-hidden', String(hidden)); }

function renderProducts() {
  const grid = $('#product-grid');
  const filtered = state.filter === 'All' ? products : products.filter((product) => product.category === state.filter);
  grid.innerHTML = filtered.map((product, index) => `
    <article class="product-card" data-product-id="${product.id}" tabindex="0" role="button" aria-label="View ${product.name}">
      <div class="product-image-wrap"><img class="product-image" src="${product.images[0]}" alt="${product.name}" loading="lazy" /><span class="product-hover-label">View piece <span>↗</span></span></div>
      <div class="product-meta"><div class="product-meta-line"><div><h3 class="product-name">${product.name}</h3><p class="product-category">${product.category} · ${index < 3 ? 'New arrival' : 'Core edit'}</p></div><span class="product-price">${money(product.price)}</span></div></div>
    </article>`).join('');
  $$('.product-card', grid).forEach((card) => { card.addEventListener('click', () => openProduct(card.dataset.productId)); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProduct(card.dataset.productId); } }); });
}

function openProduct(id) {
  const product = getProduct(id); if (!product) return;
  state.activeProduct = product; state.activeImage = 0; state.activeSize = 'M'; state.activeColor = product.colors[0];
  renderProductModal(); setHidden($('#product-modal'), false); document.body.classList.add('no-scroll');
}
function renderProductModal() {
  const product = state.activeProduct; if (!product) return;
  $('#product-modal-category').textContent = `${product.category} / ${product.id === 'heavyweight-tee' || product.id === 'daily-tee' ? 'Essential' : 'Summer edit'}`;
  $('#product-modal-index').textContent = `${String(products.indexOf(product) + 1).padStart(2, '0')} / ${String(products.length).padStart(2, '0')}`;
  $('#product-modal-title').textContent = product.name; $('#product-modal-price').textContent = money(product.price); $('#product-modal-description').textContent = product.description;
  $('#product-gallery').innerHTML = `<img src="${product.images[state.activeImage]}" alt="${product.name} product view ${state.activeImage + 1}" />`;
  $('#gallery-thumbs').innerHTML = product.images.map((image, index) => `<button class="gallery-thumb ${index === state.activeImage ? 'active' : ''}" data-gallery-index="${index}" aria-label="View product image ${index + 1}"><img src="${image}" alt="" /></button>`).join('');
  $$('.gallery-thumb').forEach((thumb) => thumb.addEventListener('click', () => { state.activeImage = Number(thumb.dataset.galleryIndex); renderProductModal(); }));
  $('#size-selector').innerHTML = ['S', 'M', 'L', 'XL'].map((size) => `<button class="size-option ${state.activeSize === size ? 'active' : ''}" data-size="${size}">${size}</button>`).join('');
  $$('.size-option').forEach((button) => button.addEventListener('click', () => { state.activeSize = button.dataset.size; renderProductModal(); }));
  $('#color-selector').innerHTML = product.colors.map((color) => `<button class="color-option ${state.activeColor === color ? 'active' : ''}" data-color="${color}" aria-label="${color}"><span class="color-dot" style="background:${colorValues[color]}"></span></button>`).join('');
  $$('.color-option').forEach((button) => button.addEventListener('click', () => { state.activeColor = button.dataset.color; renderProductModal(); }));
  $('#selected-color-name').textContent = state.activeColor;
}

function addActiveProductToCart() {
  const product = state.activeProduct; if (!product) return;
  const key = `${product.id}-${state.activeSize}-${state.activeColor}`; const existing = state.cart.find((item) => item.key === key);
  if (existing) existing.quantity += 1; else state.cart.push({ key, productId: product.id, size: state.activeSize, color: state.activeColor, quantity: 1 });
  renderCart(); closeProduct(); openCart(); showToast(`${product.name} added to your bag`);
}
function cartCount() { return state.cart.reduce((total, item) => total + item.quantity, 0); }
function cartSubtotal() { return state.cart.reduce((total, item) => { const product = getProduct(item.productId); return total + (product.price * item.quantity); }, 0); }
function renderCart() {
  const count = cartCount(); $('#cart-badge').textContent = count; $('#cart-heading-count').textContent = `(${count})`; $('#cart-subtotal').textContent = money(cartSubtotal());
  const container = $('#cart-items');
  if (!state.cart.length) { container.innerHTML = '<div class="empty-cart"><div class="empty-cart-mark">AB</div><h3 class="font-display text-3xl tracking-[-0.04em]">Your bag is quiet.</h3><p class="mt-3 max-w-[220px] text-xs leading-5 text-black/45">Add something considered and it will appear here.</p><a href="#catalog" data-close-cart class="button button-dark mt-7">Explore collection <span>↗</span></a></div>'; $('[data-close-cart]', container).addEventListener('click', closeCart); return; }
  container.innerHTML = state.cart.map((item) => { const product = getProduct(item.productId); return `<div class="cart-line"><img class="cart-line-image" src="${product.images[0]}" alt="${product.name}" /><div><div class="flex justify-between gap-3"><div><h3 class="cart-line-name">${product.name}</h3><p class="cart-line-details">${item.color} · Size ${item.size}<br />${money(product.price)}</p></div><button class="remove-button" data-remove="${item.key}">Remove</button></div><div class="cart-line-bottom"><div class="quantity-control"><button data-quantity="${item.key}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-quantity="${item.key}" data-change="1" aria-label="Increase quantity">+</button></div><strong class="text-xs">${money(product.price * item.quantity)}</strong></div></div></div>`; }).join('');
  $$('[data-quantity]', container).forEach((button) => button.addEventListener('click', () => changeQuantity(button.dataset.quantity, Number(button.dataset.change))));
  $$('[data-remove]', container).forEach((button) => button.addEventListener('click', () => removeItem(button.dataset.remove)));
  $('[data-close-cart]', container)?.addEventListener('click', closeCart);
}
function changeQuantity(key, change) { const item = state.cart.find((entry) => entry.key === key); if (!item) return; item.quantity += change; if (item.quantity <= 0) state.cart = state.cart.filter((entry) => entry.key !== key); renderCart(); }
function removeItem(key) { state.cart = state.cart.filter((item) => item.key !== key); renderCart(); showToast('Item removed from your bag'); }
function openCart() { setHidden($('#cart-drawer'), false); document.body.classList.add('no-scroll'); }
function closeCart() { setHidden($('#cart-drawer'), true); document.body.classList.remove('no-scroll'); }
function closeProduct() { setHidden($('#product-modal'), true); document.body.classList.remove('no-scroll'); }

function renderCheckout() {
  $('#checkout-summary-items').innerHTML = state.cart.map((item) => { const product = getProduct(item.productId); return `<div class="summary-line"><img src="${product.images[0]}" alt="${product.name}" /><div><div class="summary-line-name">${product.name} × ${item.quantity}</div><div class="summary-line-meta">${item.color} · Size ${item.size}</div></div><span class="summary-line-price">${money(product.price * item.quantity)}</span></div>`; }).join('');
  $('#checkout-subtotal').textContent = money(cartSubtotal()); $('#checkout-total').textContent = money(cartSubtotal());
}
function openCheckout() { if (!state.cart.length) { showToast('Your bag is empty — explore the collection first'); return; } closeCart(); renderCheckout(); setHidden($('#checkout-view'), false); document.body.classList.add('no-scroll'); }
function closeCheckout() { setHidden($('#checkout-view'), true); document.body.classList.remove('no-scroll'); }
function confirmOrder(event) { event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); const orderNumber = `AB-${Math.floor(1000 + Math.random() * 8999)}`; $('#confirmation-copy').textContent = `Order ${orderNumber} is confirmed. We’ll prepare your pieces with care and send delivery updates to ${data.get('phone')}.`; setHidden($('#checkout-view'), true); setHidden($('#confirmation-view'), false); state.cart = []; renderCart(); form.reset(); document.body.classList.add('no-scroll'); }

function setFilter(filter) { state.filter = filter; $$('.filter-pill').forEach((pill) => pill.classList.toggle('active', pill.dataset.filter === filter)); renderProducts(); document.querySelector('#catalog').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
function setupEvents() {
  renderProducts(); renderCart();
  $('#cart-trigger').addEventListener('click', openCart); $('#checkout-trigger').addEventListener('click', openCheckout); $('#add-to-cart-button').addEventListener('click', addActiveProductToCart); $('#close-checkout').addEventListener('click', closeCheckout);
  $('#checkout-form').addEventListener('submit', confirmOrder); $('#contact-form').addEventListener('submit', (event) => { event.preventDefault(); event.currentTarget.reset(); showToast('Thanks — your note is on its way to the studio.'); });
  $('#continue-shopping').addEventListener('click', () => { setHidden($('#confirmation-view'), true); document.body.classList.remove('no-scroll'); });
  $$('.filter-pill').forEach((pill) => pill.addEventListener('click', () => setFilter(pill.dataset.filter))); $$('.category-card').forEach((card) => card.addEventListener('click', () => setFilter(card.dataset.category)));
  $('[data-size-guide]').addEventListener('click', (event) => { event.preventDefault(); showToast('Our fit is true to size. Choose your usual size for a relaxed everyday fit.'); });
  $$('[data-close-product]').forEach((element) => element.addEventListener('click', closeProduct)); $$('[data-close-cart]').forEach((element) => element.addEventListener('click', closeCart));
  $('#admin-preview-trigger').addEventListener('click', () => { setHidden($('#admin-modal'), false); document.body.classList.add('no-scroll'); }); $$('[data-close-admin]').forEach((element) => element.addEventListener('click', () => { setHidden($('#admin-modal'), true); document.body.classList.remove('no-scroll'); }));
  $('#mobile-menu-trigger').addEventListener('click', () => { const menu = $('#mobile-menu'); const hidden = menu.classList.toggle('hidden'); $('#mobile-menu-trigger').setAttribute('aria-expanded', String(!hidden)); });
  $$('.mobile-menu a').forEach((link) => link.addEventListener('click', () => { $('#mobile-menu').classList.add('hidden'); $('#mobile-menu-trigger').setAttribute('aria-expanded', 'false'); }));
  $$('.nav-link').forEach((link) => link.addEventListener('click', () => { $$('.nav-link').forEach((item) => item.classList.remove('active')); link.classList.add('active'); }));
  $$('.search-trigger').forEach((button) => button.addEventListener('click', () => { document.querySelector('#catalog').scrollIntoView({ behavior: 'smooth' }); showToast('Browse the collection by category below.'); }));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeProduct(); closeCart(); if (!$('#admin-modal').classList.contains('hidden')) { setHidden($('#admin-modal'), true); document.body.classList.remove('no-scroll'); } } });
}

document.addEventListener('DOMContentLoaded', setupEvents);
