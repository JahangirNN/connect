// main.js - Vanilla JS for UI functionality and Cart
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-menu .nav-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    // Trigger once on load in case page is refreshed midway
    if(window.scrollY > 50) header.classList.add('scrolled');

    // --- Shopping Cart Logic ---
    let cart = [];
    const cartToggle = document.querySelector('.cart-toggle');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartModal = document.getElementById('cartModal');
    const closeCartBtn = document.getElementById('closeCart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const cartCountEls = document.querySelectorAll('.cart-count');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const addButtons = document.querySelectorAll('.btn-add');
    const WHATSAPP_NUMBER = '919560939364';

    const toggleCart = () => {
        const isOpen = cartOverlay.classList.contains('open');
        if(isOpen) {
            cartOverlay.classList.remove('open');
            cartModal.classList.remove('open');
            document.body.style.overflow = '';
        } else {
            cartOverlay.classList.add('open');
            cartModal.classList.add('open');
            document.body.style.overflow = 'hidden';
            renderCart();
        }
    };

    cartToggle.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    const updateCartCount = () => {
        const totalItems = cart.length;
        cartCountEls.forEach(el => el.textContent = totalItems);
        if(cart.length > 0) {
            checkoutBtn.classList.remove('disabled');
        } else {
            checkoutBtn.classList.add('disabled');
        }
    };

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if(cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
            cartTotalEl.textContent = '₹0';
            checkoutBtn.classList.add('disabled');
            return;
        }

        cart.forEach((item, index) => {
            total += item.price;
            
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            
            itemEl.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                </div>
                <button class="btn-remove" data-index="${index}" aria-label="Remove item">✕</button>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartTotalEl.textContent = `₹${total}`;
        checkoutBtn.classList.remove('disabled');
        
        // Attach remove listeners
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.dataset.index);
                cart.splice(idx, 1);
                renderCart();
                updateCartCount();
            });
        });
    };

    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const el = e.currentTarget;
            const item = {
                id: el.dataset.id,
                name: el.dataset.name,
                price: parseInt(el.dataset.price),
                img: el.dataset.img
            };
            cart.push(item);
            updateCartCount();
            
            // Visual feedback
            el.classList.add('added');
            el.innerHTML = `ADDED TO CART`;
            setTimeout(() => {
                el.classList.remove('added');
                el.innerHTML = `ADD TO CART`;
            }, 1000);
            
            // Auto open cart
            if(!cartOverlay.classList.contains('open')) {
                toggleCart();
            } else {
                renderCart();
            }
        });
    });

    checkoutBtn.addEventListener('click', () => {
        if(cart.length === 0) return;
        
        let message = `Hello Timber and Tales! I would like to order the following items:\n\n`;
        let total = 0;
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - ₹${item.price}\n`;
            total += item.price;
        });
        message += `\n*Total: ₹${total}*\n\nPlease let me know how to proceed with payment and delivery.`;
        
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
    });
});
