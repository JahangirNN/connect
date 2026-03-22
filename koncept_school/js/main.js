document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Glass Effect on Scroll
    const header = document.querySelector('.nav-header');
    
    const toggleHeaderGlass = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', toggleHeaderGlass);
    toggleHeaderGlass(); // Init on load

    // 2. Mobile Menu Logic (Ultra-smooth)
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = mobileMenu.querySelectorAll('a');

    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.contains('active');
        if (isOpen) {
            // Close
            mobileMenu.style.transform = 'translateX(100%)';
            mobileMenu.style.opacity = '0';
            mobileMenu.style.visibility = 'hidden';
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Open
            mobileMenu.style.visibility = 'visible';
            mobileMenu.style.opacity = '1';
            mobileMenu.style.transform = 'translateX(0)';
            mobileMenu.classList.add('active');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) toggleMenu();
        });
    });

    // 2.5 Text Splitter for Crazy Animations
    document.querySelectorAll('.split-words').forEach(el => {
        const text = el.innerText;
        el.innerHTML = '';
        text.split(' ').forEach((word, i) => {
            if (word.trim() === '') return;
            const span = document.createElement('span');
            span.className = 'word';
            const innerSpan = document.createElement('span');
            innerSpan.className = 'word-inner';
            innerSpan.style.transitionDelay = `${i * 0.12}s`;
            innerSpan.innerText = word;
            span.appendChild(innerSpan);
            el.appendChild(span);
            el.appendChild(document.createTextNode(' '));
        });
    });

    document.querySelectorAll('.split-chars').forEach(el => {
        const text = el.innerText;
        el.innerHTML = '';
        text.split('').forEach((char, i) => {
            if (char === ' ') {
                el.appendChild(document.createTextNode(' '));
            } else {
                const span = document.createElement('span');
                span.className = 'char';
                span.style.transitionDelay = `${i * 0.04}s`;
                span.innerText = char;
                el.appendChild(span);
            }
        });
    });

    // 3. Staggered Entrance (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay if needed or rely on CSS classes
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 100);
                revealObserver.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Parallax Hero Effect (Subtle)
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero) {
            const content = hero.querySelector('.hero-content');
            if (content) {
                content.style.transform = `translateY(${scrolled * 0.2}px)`;
                content.style.opacity = 1 - (scrolled / 700);
            }
        }
    });
});
