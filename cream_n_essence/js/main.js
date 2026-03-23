// ==========================================================================
//   MAIN JavaScript LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // Config
    const PHONE_NUMBER = '917778876166'; // Default WhatsApp number

    // DOM Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-sidebar .btn');
    
    const cartToggleBtns = document.querySelectorAll('.cart-toggle');
    const cartModal = document.querySelector('.cart-modal');
    const closeCartBtn = document.querySelector('.close-btn');
    const cartBody = document.querySelector('.cart-body');
    const cartCountEls = document.querySelectorAll('.cart-count');
    const cartTotalEl = document.querySelector('.cart-total strong');
    const addToCartBtns = document.querySelectorAll('.btn-add');
    const checkoutBtn = document.querySelector('.btn-checkout');

    const heroMediaContainer = document.querySelector('.hero-media');
    const heroVideo = document.getElementById('hero-video');

    // ----------------------------------------------------
    // Video Lazy Loading Logic
    // ----------------------------------------------------
    // Removed because video is now replaced by optimized animated webp

    // ----------------------------------------------------
    // Mobile Menu Logic
    // ----------------------------------------------------
    function toggleMenu() {
        const isActive = menuToggle.classList.contains('active');
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        menuToggle.classList.add('active');
        mobileSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMenu() {
        menuToggle.classList.remove('active');
        mobileSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', () => {
        closeMenu();
        closeCart();
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ----------------------------------------------------
    // Cart System Logic
    // ----------------------------------------------------
    let cart = [];

    function updateCartUI() {
        // Update counters
        cartCountEls.forEach(el => {
            el.textContent = cart.length;
        });

        // Update Total
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalEl.textContent = `₹${total}`;

        // Render Items
        if (cart.length === 0) {
            cartBody.innerHTML = `<div class="empty-cart-msg">Your cart is empty.</div>`;
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = '0.5';
            checkoutBtn.style.pointerEvents = 'none';
        } else {
            checkoutBtn.disabled = false;
            checkoutBtn.style.opacity = '1';
            checkoutBtn.style.pointerEvents = 'auto';

            cartBody.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">₹${item.price}</div>
                    </div>
                    <button class="btn-remove" data-index="${index}" aria-label="Remove item">
                        <svg class="icon" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            `).join('');

            // Add listener to remove buttons
            document.querySelectorAll('.btn-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.currentTarget.dataset.index;
                    removeFromCart(idx);
                });
            });
        }
    }

    function addToCart(title, price) {
        cart.push({ title, price: parseInt(price, 10) });
        updateCartUI();
        
        // Visual feedback on button
        openCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
    }

    function openCart() {
        // If mobile menu is open, close it
        closeMenu();
        cartModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners for Cart
    cartToggleBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    }));
    closeCartBtn.addEventListener('click', closeCart);

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('.product-card');
            const title = card.querySelector('.product-title').textContent;
            const priceStr = card.querySelector('.product-price').textContent.replace('₹', '');
            addToCart(title, priceStr);
            
            // Subtle animation feedback
            const originalIcon = btn.innerHTML;
            btn.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`;
            setTimeout(() => {
                btn.innerHTML = originalIcon;
            }, 1000);
        });
    });

    // ----------------------------------------------------
    // Checkout -> WhatsApp Logic
    // ----------------------------------------------------
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;

        let orderText = `*New Order - Cream N Essence*%0A%0A`;
        cart.forEach((item, index) => {
            orderText += `${index + 1}. ${item.title} - ₹${item.price}%0A`;
        });
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        orderText += `%0A*Total: ₹${total}*%0A%0APlease let me know the payment details.`;

        window.open(`https://wa.me/${PHONE_NUMBER}?text=${orderText}`, '_blank');
        
        // Optional: clear cart after redirect
        // cart = []; updateCartUI(); closeCart();
    });

    // Initialize UI
    updateCartUI();
});
