document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu a');

    const toggleMenu = (show) => {
        if (show === true) mobileMenu.classList.add('active');
        else if (show === false) mobileMenu.classList.remove('active');
        else mobileMenu.classList.toggle('active');
    };

    menuToggle.addEventListener('click', () => toggleMenu(true));
    menuClose.addEventListener('click', () => toggleMenu(false));
    menuLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

    // 2. Shopping Cart Logic
    const PRODUCTS = [
        { id: 1, name: "Premium Wedding Box", price: 2500, img: "assets/logo.png" },
        { id: 2, name: "Luxury Stationery Set", price: 1200, img: "assets/logo.png" },
        { id: 3, name: "Brand Identity Kit", price: 5000, img: "assets/logo.png" },
        { id: 4, name: "Custom Rigid Box", price: 450, img: "assets/logo.png" },
        { id: 5, name: "Invitation Cards", price: 800, img: "assets/logo.png" },
        { id: 6, name: "Product Labels", price: 300, img: "assets/logo.png" },
        { id: 7, name: "Acrylic Invite", price: 1500, img: "assets/logo.png" },
        { id: 8, name: "Branding Design", price: 3500, img: "assets/logo.png" }
    ];

    let cart = JSON.parse(localStorage.getItem('deur_cart')) || [];
    const cartModal = document.querySelector('.cart-modal');
    const cartToggle = document.querySelector('.cart-toggle');
    const cartClose = document.querySelector('.cart-close');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total span:last-child');
    const checkoutBtn = document.querySelector('.checkout-btn');

    const updateCartUI = () => {
        // Update Count
        cartCount.textContent = cart.length;
        
        // Update Items
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; padding: 2rem; opacity: 0.5;">Your cart is empty.</p>';
            cartTotal.textContent = '₹0';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">₹${item.price}</p>
                </div>
                <button class="remove-item" data-index="${index}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartTotal.textContent = `₹${total}`;

        // Add remove events
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                removeFromCart(index);
            });
        });
        
        localStorage.setItem('deur_cart', JSON.stringify(cart));
    };

    const addToCart = (productId) => {
        const product = PRODUCTS.find(p => p.id === parseInt(productId));
        if (product) {
            cart.push({...product});
            updateCartUI();
            
            // Animation feedback
            cartToggle.style.transform = 'scale(1.2)';
            setTimeout(() => cartToggle.style.transform = 'scale(1)', 200);
        }
    };

    const removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    const openCart = () => cartModal.classList.add('active');
    const closeCart = () => cartModal.classList.remove('active');

    cartToggle.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);

    // Initial listener for Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('.product-card').dataset.id;
            addToCart(id);
        });
    });

    // 3. WhatsApp Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        
        const phone = "917778876166"; // Default as per rules
        let text = "Hello Deur! I would like to place an order:%0A%0A";
        let total = 0;
        
        cart.forEach(item => {
            text += `- ${item.name} (₹${item.price})%0A`;
            total += item.price;
        });
        
        text += `%0A*Total: ₹${total}*%0A%0APlease let me know the process to proceed.`;
        
        window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    });

    // 4. Reveal Animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

    // 5. Video Autoplay Fix (for Safari/iOS)
    document.querySelectorAll('video').forEach(vid => {
        vid.play().catch(() => {
            // If autoplay is blocked, we can add a play button or just show first frame
            console.log("Autoplay blocked, showing video controls");
            vid.setAttribute('controls', '');
        });
    });

    // Initial UI Update
    updateCartUI();
});
