document.addEventListener('DOMContentLoaded', () => {
    // ---------------- UI & NAVBAR ----------------
    const header = document.querySelector('.site-header');
    
    // Smooth scroll header effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0,0,0,0.8)';
            header.style.backdropFilter = 'blur(12px)';
            header.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.borderBottom = 'none';
        }
    });

    // ---------------- 3D HERO BAT EFFECT ----------------
    const batContainer = document.getElementById('bat-3d');
    const heroSection = document.getElementById('hero');
    
    // Parallax & Tilt Effect
    if (batContainer) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            const rotateX = -y * 50;  /* Intense vertical tilt */
            const rotateY = x * 80;   /* Intense horizontal parallax */
            
            batContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            batContainer.style.transform = `rotateX(5deg) rotateY(0deg) scale(1)`;
        });
    }

    // ---------------- SHOPPING CART SYSTEM ----------------
    const cart = [];
    const PHONENUMBER = '917778876166';
    
    const cartOverlay = document.getElementById('cart-overlay');
    const cartCloseBtn = document.getElementById('cart-close');
    const desktopCartBtn = document.getElementById('desktop-cart-btn');
    const cartBadge = document.getElementById('cart-badge');
    const cartContainer = document.getElementById('cart-items-container');
    const cartTotal = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const addBtns = document.querySelectorAll('.add-to-cart');

    const formatPrice = (num) => '₹' + num.toLocaleString('en-IN');

    const openCart = () => cartOverlay.classList.add('active');
    const closeCart = () => cartOverlay.classList.remove('active');

    desktopCartBtn.addEventListener('click', openCart);
    cartCloseBtn.addEventListener('click', closeCart);
    
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) closeCart();
    });

    const renderCart = () => {
        cartBadge.textContent = cart.length;
        cartContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<div class="cart-empty">Your selection is empty.</div>';
            cartTotal.textContent = '₹0';
            return;
        }

        cart.forEach((item, index) => {
            total += parseInt(item.price);
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <img src="assets/product_bat.png" alt="${item.title}">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <span class="cart-price">${formatPrice(item.price)}</span>
                    <button class="remove-btn" data-index="${index}">REMOVE</button>
                </div>
            `;
            cartContainer.appendChild(el);
        });

        cartTotal.textContent = formatPrice(total);

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                cart.splice(idx, 1);
                renderCart();
            });
        });
    };

    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const current = e.currentTarget;
            const data = {
                id: current.getAttribute('data-id'),
                title: current.getAttribute('data-title'),
                price: parseInt(current.getAttribute('data-price'))
            };
            
            cart.push(data);
            
            current.style.background = '#E2FF31';
            current.style.transform = 'scale(1.2)';
            setTimeout(() => {
                current.style = '';
            }, 300);

            renderCart();
            openCart();
        });
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        
        let msg = `INVICTUS CRICKET ORDER:%0A%0A`;
        let t = 0;
        cart.forEach((item, i) => {
            msg += `${i+1}. ${item.title} - ₹${item.price.toLocaleString('en-IN')}%0A`;
            t += item.price;
        });
        msg += `%0ATOTAL: ₹${t.toLocaleString('en-IN')}`;
        
        window.open(`https://wa.me/${PHONENUMBER}?text=${msg}`, '_blank');
    });

    renderCart();
});
