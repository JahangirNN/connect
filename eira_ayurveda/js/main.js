document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Handle Form Submission for WhatsApp Booking
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phoneVal = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Default WhatsApp number
            const whatsappNumber = '917778876166';
            const baseText = `Hello Eira Ayurveda,\n\nI want to book a service:\n\n*Name:* ${name}\n*Phone:* ${phoneVal}\n*Service:* ${service}\n*Message:* ${message}`;
            
            const encodedText = encodeURIComponent(baseText);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.boxShadow = 'var(--shadow-md)';
            nav.style.background = 'rgba(253, 242, 248, 0.95)';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.background = 'rgba(253, 242, 248, 0.8)';
        }
    });

    // Simple fade-in effect on scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s var(--ease)';
        observer.observe(section);
    });
});
