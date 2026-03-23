document.addEventListener('DOMContentLoaded', () => {

// Image Data
const products = [
    { title: "Metabolism & Weight Support (Premium Blend)", price: 899, img: "643002096_17851714437643683_1535594293338280448_n..webp" },
    { title: "Ayurvedic Energy Booster Extract", price: 650, img: "652636483_17851623834643683_8904812249848854862_n..webp" },
    { title: "Joint Mobility Pro Formula", price: 1100, img: "652871964_17851623246643683_7971761071898213618_n..webp" },
    { title: "Daily Wellness Capsules", price: 499, img: "653542374_17851608675643683_3384335873143629660_n..webp" },
    { title: "Natural Detox & Cleanse", price: 750, img: "653993986_17851607904643683_5006354485274921147_n..webp" },
    { title: "Herbal Antioxidant Mix", price: 599, img: "654169552_17851685631643683_8402763407266584721_n..webp" },
    { title: "Om Ayurved Signature Powder", price: 950, img: "654479825_17851685208643683_4087687837181918540_n..webp" },
    { title: "Bone & Joint Care Tonic", price: 1200, img: "655079941_17851714605643683_790921961092253037_n. (1).webp" },
    { title: "Vitality Supplements Pack", price: 899, img: "655079941_17851714605643683_790921961092253037_n..webp" },
    { title: "Fat Burner Plus Natural Extract", price: 1350, img: "655174091_17851623762643683_932296770157095610_n..webp" },
    { title: "Pure Himalayan Ashwagandha", price: 799, img: "655206355_17851689453643683_4193561011728048712_n..webp" },
    { title: "Holistic Immunity Drops", price: 399, img: "655779235_17851685736643683_1489884146828099587_n..webp" },
    { title: "Weight Management Elixir", price: 1050, img: "656015019_17851608537643683_1798357838591557698_n..webp" },
    { title: "Joint Relief Balm (Advanced)", price: 450, img: "656018894_17851714062643683_5813007519304777027_n..webp" },
    { title: "Energy & Focus Green Tea Blend", price: 350, img: "656054441_17851608024643683_4490300996368327786_n..webp" },
    { title: "Muscle & Ligament Recovery", price: 850, img: "656066108_17851685190643683_5006283579028142471_n..webp" },
    { title: "Om Ayurved Wellness Bundle", price: 2999, img: "656265833_17851689444643683_446069975508290134_n..webp" },
    { title: "Premium Gut Health Powder", price: 699, img: "656868324_17851685274643683_4147805204397555167_n..webp" }
];

// 1. Render Products
const productContainer = document.getElementById('product-container');
products.forEach((prod, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-img-wrap">
            <img src="assets/${prod.img}" alt="${prod.title}" class="product-img" loading="lazy">
        </div>
        <div class="product-info">
            <h3 class="product-title">${prod.title}</h3>
            <p class="product-price">₹${prod.price.toFixed(2)}</p>
            <button class="btn-add" data-id="${index}">Add to Cart</button>
        </div>
    `;
    productContainer.appendChild(card);
});

// 2. Mobile Menu Logic
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const menuLinks = document.querySelectorAll('.menu-link');

function toggleMenu(show) {
    if (show) {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent bg scroll
    } else {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

hamburger.addEventListener('click', () => toggleMenu(true));
closeMenu.addEventListener('click', () => toggleMenu(false));
menuLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

// 3. Cart Logic
let cart = [];
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartModal = document.getElementById('cart-modal');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total-price');
const cartCountEl = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

function toggleCart(show) {
    if (show) {
        cartModal.classList.add('active');
        renderCart();
        document.body.style.overflow = 'hidden';
    } else {
        cartModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

cartBtn.addEventListener('click', () => toggleCart(true));
closeCartBtn.addEventListener('click', () => toggleCart(false));
cartOverlay.addEventListener('click', () => toggleCart(false));

productContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const product = products[id];
        cart.push({...product});
        updateCartBadge();
        toggleCart(true); // Auto open
    }
});

function updateCartBadge() {
    cartCountEl.textContent = cart.length;
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="48" height="48"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.innerHTML = `
                <img src="assets/${item.img}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <span class="cart-item-price">₹${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-btn" aria-label="Remove item" data-index="${index}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            `;
            cartItemsContainer.appendChild(row);
        });
    }
    
    cartTotalEl.textContent = `₹${total.toFixed(2)}`;
}

cartItemsContainer.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove-btn');
    if (removeBtn) {
        const idx = parseInt(removeBtn.getAttribute('data-index'));
        cart.splice(idx, 1);
        updateCartBadge();
        renderCart();
    }
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Please add items to your cart first.");
        return;
    }
    
    let text = "Hello! I'd like to place an order from Om Ayurved Club:\n\n";
    let total = 0;
    cart.forEach((item, index) => {
        text += `${index + 1}. ${item.title} - ₹${item.price}\n`;
        total += item.price;
    });
    text += `\n*Total Amount: ₹${total.toFixed(2)}*\n\nPlease confirm availability and let me know the payment details.`;
    
    const encodedText = encodeURIComponent(text);
    const phoneNumber = "917435828593"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
});

});
