document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Navbar Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Shopping Cart Logic ---
    let cart = [];
    const phoneNumber = '919843017179'; // Assuming 91 prefix for India

    const addButtons = document.querySelectorAll('.add-to-cart');
    const cartModal = document.querySelector('.cart-modal');
    const cartClose = document.querySelector('.cart-close');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total-value');
    const checkoutBtn = document.querySelector('.checkout-btn');

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Your cart is empty.</p>';
            cartTotalElement.textContent = '₹0';
            return;
        }

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>
                    <button class="cart-remove" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += parseInt(item.price);
        });

        cartTotalElement.textContent = `₹${total}`;

        // Add remove handlers
        document.querySelectorAll('.cart-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            const name = card.querySelector('h3').textContent;
            const price = card.querySelector('.product-price').textContent.replace('₹', '');
            const image = card.querySelector('.product-image img').getAttribute('src');

            cart.push({ name, price, image });
            updateCart();
            cartModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    cartClose.addEventListener('click', () => {
        cartModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close on outside click
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;

        let message = 'Hello Cutriz! I would like to order:\n\n';
        let total = 0;
        cart.forEach(item => {
            message += `- ${item.name} (₹${item.price})\n`;
            total += parseInt(item.price);
        });
        message += `\nTotal: ₹${total}\n\nPlease confirm availability.`;

        const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    });

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .product-card, .section-header').forEach(el => {
        observer.observe(el);
    });
});
