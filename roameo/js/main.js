document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Z-Index Management & Mobile Menu
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded);
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // Navbar Scroll Effect
    // ==========================================
    const navbar = document.querySelector('.navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ==========================================
    // Stats Counter Animation
    // ==========================================
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ==========================================
    // Leaflet Map - FIXED: Proper initialization
    // ==========================================
    const mapContainer = document.getElementById('event-map');

    if (mapContainer) {
        // Mumbai coordinates
        const map = L.map('event-map', {
            center: [19.0760, 72.8777],
            zoom: 13,
            scrollWheelZoom: false,
            zoomControl: false,
            attributionControl: false
        });

        // Add zoom control to top right
        L.control.zoom({
            position: 'topright'
        }).addTo(map);

        // Dark mode tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // Custom marker icon
        const createCustomIcon = () => {
            return L.divIcon({
                className: 'custom-marker',
                html: `
          <div class="marker-pulse"></div>
          <div class="marker-core"></div>
        `,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
                popupAnchor: [0, -12]
            });
        };

        // Event data
        const events = [
            { name: "Cocktail Night Royale", pos: [19.0820, 72.8887], desc: "Premium mixology at Sky Lounge" },
            { name: "Underground Art Gallery", pos: [19.0700, 72.8650], desc: "Contemporary local masterpieces" },
            { name: "City Photowalk", pos: [19.0550, 72.8300], desc: "Capture urban beauty" },
            { name: "Live Jazz Session", pos: [19.0900, 72.8500], desc: "Smooth tunes in the city" },
            { name: "Gourmet Food Fest", pos: [19.0600, 72.8900], desc: "Best street food experience" }
        ];

        // Add markers
        events.forEach(event => {
            const marker = L.marker(event.pos, {
                icon: createCustomIcon(),
                title: event.name
            }).addTo(map);

            // FIXED: Proper popup with close button
            const popupContent = `
        <div style="font-family: 'DM Sans', sans-serif; min-width: 200px;">
          <strong style="color: #6366f1; font-size: 14px; display: block; margin-bottom: 4px;">${event.name}</strong>
          <span style="color: #a1a1aa; font-size: 12px; display: block; margin-bottom: 8px;">${event.desc}</span>
          <a href="https://wa.me/917778876166" style="color: #6366f1; font-size: 12px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
            View Event →
          </a>
        </div>
      `;

            marker.bindPopup(popupContent, {
                closeButton: true,
                className: 'custom-popup',
                maxWidth: 300,
                minWidth: 200
            });
        });

        // Locate button
        const locateBtn = document.getElementById('locateBtn');
        if (locateBtn) {
            locateBtn.addEventListener('click', () => {
                map.flyTo([19.0760, 72.8777], 13, {
                    duration: 1.5
                });
            });
        }

        // Invalidate size on window resize (CRITICAL for responsive)
        window.addEventListener('resize', () => {
            map.invalidateSize();
        });
    }

    // ==========================================
    // Story Modal - FIXED: Proper state management
    // ==========================================
    const storyItems = document.querySelectorAll('[data-story]');
    const modal = document.getElementById('storyModal');
    const modalImg = document.getElementById('modalImage');
    const modalText = document.getElementById('modalText');
    const modalClose = document.getElementById('modalClose');
    const progressBar = document.getElementById('progressBar');

    const storyData = {
        '1': { img: 'assets/post1.webp', caption: 'Exclusive Midweek Mixology Session @ SkyLounge' },
        '2': { img: 'assets/post2.webp', caption: 'Underground Techno Rave - Limited Access' },
        '3': { img: 'assets/post3.webp', caption: 'Community Photowalk through the Old District' }
    };

    let progressInterval;
    let autoCloseTimeout;

    const openModal = (id) => {
        const data = storyData[id];
        if (!data || !modal) return;

        // Set content
        modalImg.src = data.img;
        modalImg.alt = data.caption;
        modalText.textContent = data.caption;

        // Show modal
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Reset and start progress
        let progress = 0;
        progressBar.style.width = '0%';

        clearInterval(progressInterval);
        clearTimeout(autoCloseTimeout);

        progressInterval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;
        }, 50); // 5 seconds total

        autoCloseTimeout = setTimeout(() => {
            closeModal();
        }, 5000);
    };

    const closeModal = () => {
        if (!modal) return;

        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        clearInterval(progressInterval);
        clearTimeout(autoCloseTimeout);

        // Clear image after transition
        setTimeout(() => {
            modalImg.src = '';
            modalImg.alt = '';
            progressBar.style.width = '0%';
        }, 500);
    };

    // Event listeners
    storyItems.forEach(item => {
        item.addEventListener('click', () => {
            openModal(item.dataset.story);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
                closeModal();
            }
        });

        // Keyboard support
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    // ==========================================
    // Smooth Scroll
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Navbar height
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // Intersection Observer for reveals
    // ==========================================
    const revealElements = document.querySelectorAll('.event-card, .stat-card, .about-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
});