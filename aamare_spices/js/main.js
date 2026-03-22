/* main.js for AAMARE Spices */

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.getElementById('closeCart');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    const cartTotalText = document.getElementById('cartTotalText');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const productGrid = document.getElementById('productGrid');
    const contactForm = document.getElementById('contactForm');

    // --- State ---
    let cart = [];
    const PHONE_NUMBER = "917778876166";

    // --- Mobile Menu Logic ---
    const toggleMenu = (show) => {
        mobileMenu.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', () => toggleMenu(true));
    closeMenu.addEventListener('click', () => toggleMenu(false));
    
    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // --- Cart Logic ---
    const updateCartUI = () => {
        // Update Count
        cartCount.textContent = cart.length;
        
        // Update Modal List
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your basket is empty.</div>';
            cartTotalText.textContent = '₹0';
            return;
        }
        
        let total = 0;
        cart.forEach((item, index) => {
            total += parseInt(item.price);
            
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>₹${item.price}</span>
                </div>
                <button class="btn-remove" data-index="${index}">&times;</button>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
        
        cartTotalText.textContent = `₹${total}`;
        
        // Add Remove listeners
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    };

    const addToCart = (product) => {
        cart.push(product);
        updateCartUI();
        // Optional: Open cart on add
        toggleCart(true);
    };

    const removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    const toggleCart = (show) => {
        cartModal.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : '';
    };

    cartToggle.addEventListener('click', () => toggleCart(true));
    closeCart.addEventListener('click', () => toggleCart(false));
    
    // Close cart on outside click
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) toggleCart(false);
    });

    // Event Delegation for "Add to Cart"
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-cart')) {
            const card = e.target.closest('.product-card');
            const product = {
                id: card.dataset.id,
                name: card.dataset.name,
                price: card.dataset.price
            };
            addToCart(product);
        }
    });

    // --- Checkout Logic ---
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your basket is empty!');
            return;
        }

        let message = "Hello AAMARE Spices! I'd like to place an order:\n\n";
        let total = 0;
        
        // Group items to show quantity if possible, or just list
        cart.forEach(item => {
            message += `- ${item.name} (₹${item.price})\n`;
            total += parseInt(item.price);
        });
        
        message += `\nTotal: ₹${total}\n\nPlease let me know the next steps for payment.`;
        
        const encodedMsg = encodeURIComponent(message);
        window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMsg}`, '_blank');
    });

    // --- Form Submission ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const msg = document.getElementById('message').value;
            
            const message = `Hello AAMARE Spices, I'm ${name}.\n\n${msg}`;
            const encodedMsg = encodeURIComponent(message);
            window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMsg}`, '_blank');
            
            contactForm.reset();
        });
    }

    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });
});
