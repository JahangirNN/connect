// main.js - Sweet Crumb Bakery JS Cart Logic

document.addEventListener('DOMContentLoaded', () => {

    /* --- DOM Elements --- */
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartCloseBg = document.getElementById('cart-close-bg');
    const badge = document.getElementById('cart-badge');
    const AddToCartBtns = document.querySelectorAll('.btn-add-cart');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    /* --- Cart State --- */
    let cart = [];

    /* --- Functions --- */
    const toggleCart = () => {
        cartOverlay.classList.toggle('open');
        document.body.style.overflow = cartOverlay.classList.contains('open') ? 'hidden' : '';
    };

    const updateCartUI = () => {
        // Update Badge
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        badge.innerText = totalItems;
        
        // Update Total
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        cartTotalPrice.innerText = `₹${totalPrice.toLocaleString('en-IN')}`;

        // Enable/Disable Checkout
        if (cart.length > 0) {
            checkoutBtn.removeAttribute('disabled');
        } else {
            checkoutBtn.setAttribute('disabled', 'true');
        }

        // Render Items
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty">Your basket is empty.<br>Go add some sweet crumbs!</p>';
            return;
        }

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-controls">
                        <span>Qty: ${item.qty}</span>
                        <span class="cart-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <button class="remove-btn" data-index="${index}" aria-label="Remove item">&times;</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Re-attach listeners for remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                cart.splice(idx, 1);
                updateCartUI();
            });
        });
    };

    const addToCart = (id, name, price) => {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ id, name, price, qty: 1 });
        }
        updateCartUI();
        
        // Optional snippet to auto-open cart when an item is added, or pulse badge.
        // I will pulse the badge to confirm.
        badge.style.transform = 'scale(1.5)';
        setTimeout(() => badge.style.transform = 'scale(1)', 200);
    };

    const checkout = () => {
        const phone = "917778876166";
        let orderDetails = "Hello Sweet Crumb!%0A%0AI would like to place an order:%0A%0A";
        
        cart.forEach(item => {
            orderDetails += `- ${item.qty}x ${item.name} (₹${item.price * item.qty})%0A`;
        });
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        orderDetails += `%0A*Total: ₹${total.toLocaleString('en-IN')}*%0A%0APlease let me know the pickup/delivery details!`;

        const waUrl = `https://wa.me/${phone}?text=${orderDetails}`;
        window.open(waUrl, '_blank');
        
        cart = [];
        updateCartUI();
        toggleCart();
    };

    /* --- Event Listeners --- */
    cartToggleBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartCloseBg.addEventListener('click', toggleCart);

    AddToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price'));
            addToCart(id, name, price);
        });
    });

    checkoutBtn.addEventListener('click', checkout);

    /* --- Init --- */
    updateCartUI();
});
