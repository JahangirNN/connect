// main.js - Editorial Version

document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Logic
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.editorial-link');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('open');
        if (mobileMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    hamburgerBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Booking Modal Logic
    const bookingBtns = document.querySelectorAll('[data-package]');
    const bookingModal = document.getElementById('booking-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalCloseBg = document.getElementById('modal-close-bg');
    const pkgInput = document.getElementById('pkg-input');
    const bookingForm = document.getElementById('booking-form');

    const openModal = (pkgName) => {
        if (pkgName) {
            pkgInput.value = pkgName;
        } else {
            pkgInput.value = "General Inquiry";
        }
        bookingModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        if (mobileMenu.classList.contains('open')) toggleMenu();
    };

    const closeModal = () => {
        bookingModal.classList.remove('open');
        document.body.style.overflow = '';
    };

    bookingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pkgInfo = btn.getAttribute('data-package');
            openModal(pkgInfo);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    modalCloseBg.addEventListener('click', closeModal);

    // Form submission -> WhatsApp redirect
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name-input').value;
        const date = document.getElementById('date-input').value;
        const location = document.getElementById('location-input').value;
        const pkg = pkgInput.value;

        // Default number
        const phone = "917778876166";
        
        const message = `Hello Aura Bridal,%0A%0AI am inquiring about a booking:%0A*Name*: ${name}%0A*Package*: ${pkg}%0A*Event Date*: ${date}%0A*Venue*: ${location}%0A%0APlease let me know the availability!`;
        
        const waUrl = `https://wa.me/${phone}?text=${message}`;
        window.open(waUrl, '_blank');
        
        closeModal();
        bookingForm.reset();
    });
});
