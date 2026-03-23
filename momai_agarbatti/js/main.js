document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // Shopping Cart Logic
    let cart = [];
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartToggle = document.querySelector('.cart-toggle');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotalAmount = document.querySelector('.cart-total-amount');

    const updateCart = () => {
        // Update Count
        cartCount.textContent = cart.length;
        
        // Render Items
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty.</p></div>';
            cartTotalAmount.textContent = '₹0';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>
                </div>
                <div class="remove-item" data-index="${index}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        cartTotalAmount.textContent = `₹${total}`;

        // Add remove handlers
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(btn.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    };

    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // Add to Cart
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const name = productCard.querySelector('h3').textContent;
            const price = parseInt(productCard.querySelector('.price').textContent.replace('₹', ''));
            const image = productCard.querySelector('img').src;

            cart.push({ name, price, image });
            updateCart();
            
            // Open cart on add
            cartSidebar.classList.add('active');
        });
    });

    // Checkout Logic (WhatsApp)
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;

        const phone = '917778876166';
        let message = 'Hello Momai Agarbatti, I would like to order:\n\n';
        let total = 0;
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - ₹${item.price}\n`;
            total += item.price;
        });
        message += `\nTotal: ₹${total}\n\nThank you!`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    });
});
