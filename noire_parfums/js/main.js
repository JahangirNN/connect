/**
 * main.js - NOIRE Parfums Strict Cart Engine
 * Built to completely prevent class-conflict bugs.
 * Utilizes purely defensive `[data-action]` bindings.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* Bug Prevention #7: Data-Action Hooking */
    const triggerToggleCart = document.querySelectorAll('[data-action="toggle-cart"]');
    const triggerAddCarts = document.querySelectorAll('[data-action="add-cart"]');
    const triggerCheckout = document.querySelector('[data-action="checkout-trigger"]');
    
    const modalCart = document.getElementById('system-cart');
    const displayPillCount = document.getElementById('cart-pill-count');
    const displayTotal = document.getElementById('cart-total-display');
    const listCartItems = document.getElementById('cart-item-list');

    /* Cart Virtual State */
    let NOIRE_CART = [];

    /* Core Modules */
    const UI_ToggleModal = () => {
        modalCart.classList.toggle('open');
        // Prevent background scrolling while cart is open
        document.body.style.overflow = modalCart.classList.contains('open') ? 'hidden' : '';
    };

    const UI_EnginePaint = () => {
        // Compute numerical truths
        const totalItems = NOIRE_CART.reduce((sum, item) => sum + item.qty, 0);
        const totalPrice = NOIRE_CART.reduce((sum, item) => sum + (item.price * item.qty), 0);
        
        // Paint totals
        displayPillCount.innerText = totalItems;
        displayTotal.innerText = `$${totalPrice}`;

        // Firewall Checkout Button
        if(totalItems > 0) {
            triggerCheckout.removeAttribute('disabled');
        } else {
            triggerCheckout.setAttribute('disabled', 'true');
        }

        // Wipe board & paint Items
        listCartItems.innerHTML = '';
        if(NOIRE_CART.length === 0) {
            listCartItems.innerHTML = '<p class="text-xs cart-empty-state track-wide">BASKET IS DEVOID OF ESSENCE.</p>';
            return;
        }

        NOIRE_CART.forEach((fragrance, index) => {
            const rawDOM = document.createElement('div');
            rawDOM.className = 'cart-item-row';
            rawDOM.innerHTML = `
                <div class="item-data">
                    <h4>${fragrance.name}</h4>
                    <p class="text-xs text-muted track-wide">QTY: ${fragrance.qty} <span class="text-chrome ml-sm">($${fragrance.price * fragrance.qty})</span></p>
                </div>
                <button class="cart-item-kill" data-index="${index}" aria-label="Remove">&times;</button>
            `;
            listCartItems.appendChild(rawDOM);
        });

        // Re-bind isolated removal listener
        document.querySelectorAll('.cart-item-kill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'), 10);
                NOIRE_CART.splice(idx, 1);
                UI_EnginePaint();
            });
        });
    };

    const CORE_AddEssence = (id, name, price) => {
        const found = NOIRE_CART.find(frag => frag.id === id);
        if (found) {
            found.qty += 1;
        } else {
            NOIRE_CART.push({ id, name, price, qty: 1 });
        }
        UI_EnginePaint();
        
        // Minor visual feedback
        displayPillCount.style.transform = 'scale(1.4)';
        setTimeout(() => displayPillCount.style.transform = 'scale(1)', 200);
    };

    const CORE_ExecuteSecureCheckout = () => {
        const supportLine = "15550000000";
        let messagePayload = "NOIRE Parfums Order Request:%0A%0A";
        
        NOIRE_CART.forEach(frag => {
            messagePayload += `[${frag.qty}] ${frag.name} - $${frag.price * frag.qty}%0A`;
        });
        
        const sum = NOIRE_CART.reduce((s, item) => s + (item.price * item.qty), 0);
        messagePayload += `%0ATotal Acquisition: $${sum}%0A%0AAuthorize and provide shipping coordinates.`;

        window.open(`https://wa.me/${supportLine}?text=${messagePayload}`, '_blank');
        
        NOIRE_CART = [];
        UI_EnginePaint();
        UI_ToggleModal();
    };

    /* Bind Top-Level Listeners */
    triggerToggleCart.forEach(el => el.addEventListener('click', UI_ToggleModal));
    
    triggerAddCarts.forEach(el => {
        el.addEventListener('click', (e) => {
            // Find closest trigger parent in case icon triggers click
            const target = e.currentTarget;
            const sysId = target.getAttribute('data-id');
            const sysName = target.getAttribute('data-name');
            const sysPrice = parseInt(target.getAttribute('data-price'), 10);
            CORE_AddEssence(sysId, sysName, sysPrice);
        });
    });

    if(triggerCheckout) triggerCheckout.addEventListener('click', CORE_ExecuteSecureCheckout);

    // Initial board wipe
    UI_EnginePaint();
});
