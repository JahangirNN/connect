document.addEventListener('DOMContentLoaded', () => {
    // ─── 0. PRELOADER & LENIS ───
    const preloader = document.getElementById('preloader');
    const counter = document.getElementById('preloaderCounter');
    
    // Initialize Lenis
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Block scrolling while preloading
    lenis.stop();

    // Preloader Fake Progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress > 100) progress = 100;
        if (counter) counter.innerText = progress;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (preloader) preloader.classList.add('preloaded');
                document.body.classList.add('loaded'); // triggers hero video scale down
                lenis.start();
            }, 400);
        }
    }, 80);

    // ─── 1. Navbar Glass ───
    const header = document.querySelector('.nav-header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ─── 2. Mobile Menu ───
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const close = () => {
        mobileMenu.style.transform = 'translateX(100%)';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    };
    const open = () => {
        mobileMenu.style.visibility = 'visible';
        mobileMenu.style.opacity = '1';
        mobileMenu.style.transform = 'translateX(0)';
        mobileMenu.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    menuToggle.addEventListener('click', () => mobileMenu.classList.contains('active') ? close() : open());
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

    // ─── 3. Text Splitter (Words) ───
    document.querySelectorAll('.split-words').forEach(el => {
        const words = el.innerText.split(' ');
        el.innerHTML = '';
        words.forEach((w, i) => {
            if (!w.trim()) return;
            const outer = document.createElement('span');
            outer.className = 'word';
            const inner = document.createElement('span');
            inner.className = 'word-inner';
            inner.style.transitionDelay = `${i * 0.08}s`;
            inner.textContent = w;
            outer.appendChild(inner);
            el.appendChild(outer);
            el.appendChild(document.createTextNode(' '));
        });
    });

    // ─── 4. Text Splitter (Chars) ───
    document.querySelectorAll('.split-chars').forEach(el => {
        const chars = el.innerText.split('');
        el.innerHTML = '';
        chars.forEach((c, i) => {
            if (c === ' ') { el.appendChild(document.createTextNode(' ')); return; }
            const s = document.createElement('span');
            s.className = 'char';
            s.style.transitionDelay = `${i * 0.03}s`;
            s.textContent = c;
            el.appendChild(s);
        });
    });

    // ─── 5. Reveal Observer — TRIGGER EARLY ───
    // threshold 0.01 + rootMargin means we fire AS SOON as the element peeks in
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('active');
                // trigger counter if stat
                const counter = e.target.querySelector('.stat-number');
                if (counter) animateCounter(counter);
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.01, rootMargin: '0px 0px 40px 0px' }); 

    // Observe reveal elements AND mobile horizontal cards
    document.querySelectorAll('.reveal, .hcard').forEach(el => revealObs.observe(el));

    // ─── 6. Animated Counter ───
    function animateCounter(el) {
        const target = +el.dataset.target;
        const dur = 1600;
        const t0 = performance.now();
        const tick = now => {
            const p = Math.min((now - t0) / dur, 1);
            el.textContent = Math.floor((1 - Math.pow(2, -10 * p)) * target);
            if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
        };
        requestAnimationFrame(tick);
    }

    // ─── 7. Smooth Scroll (via Lenis) ───
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const h = this.getAttribute('href');
            if (h === '#') return;
            e.preventDefault();
            const t = document.querySelector(h);
            if (t) lenis.scrollTo(t, { offset: -80 });
        });
    });

    // ─── 8. Hero Parallax ───
    const heroC = document.querySelector('.hero-content');
    if (heroC) {
        window.addEventListener('scroll', () => {
            const s = window.pageYOffset;
            heroC.style.transform = `translateY(${s * 0.15}px)`;
            heroC.style.opacity = Math.max(0, 1 - s / 500);
        }, { passive: true });
    }

    // ─── 9. HORIZONTAL SCROLL-HIJACK (Stable Percentage Version) ───
    const shell = document.getElementById('experience');
    const track = document.getElementById('hijackTrack');
    const prog  = document.getElementById('hijackProgress');
    const isMobile = () => window.innerWidth < 768;

    const handleHijackScroll = () => {
        if (!shell || !track) return;

        if (isMobile()) {
            track.style.transform = 'none';
            return;
        }

        const rect = shell.getBoundingClientRect();
        
        // To make it start "early", we measure from when the sticky top reaches its pinned position
        // Sticky is set to top: 0 in CSS.
        const top = rect.top; 
        const height = rect.height; // Full 350vh
        const windowH = window.innerHeight;

        const maxScrollDist = height - windowH;
        let progress = 0;

        if (top <= 0 && top > -maxScrollDist) {
            progress = Math.abs(top) / maxScrollDist;
        } else if (top <= -maxScrollDist) {
            progress = 1;
        }

        const maxShift = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
        track.style.transform = `translateX(${-progress * maxShift}px)`;
        if (prog) prog.style.width = `${progress * 100}%`;

        if (!isMobile()) {
            track.querySelectorAll('.hcard').forEach((card, i, arr) => {
                // Trigger animation earlier
                if (progress >= (i / arr.length) - 0.2) card.classList.add('active');
            });
        }
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleHijackScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', handleHijackScroll);
    window.addEventListener('load', handleHijackScroll);
    handleHijackScroll();

    // Mobile: Auto-scroll Native Carousel safely
    const wrapper = document.querySelector('.hijack-track-wrapper');
    if (wrapper) {
        let cardIdx = 0;
        const cards = track ? track.querySelectorAll('.hcard') : [];
        setInterval(() => {
            if (!isMobile() || cards.length === 0) return;
            
            // CRITICAL FIX: Only auto-scroll if the section is currently visible on the user's screen
            // This prevents the violent "jumping back up" bug when reading other sections
            const wrapperRect = wrapper.getBoundingClientRect();
            if (wrapperRect.top > window.innerHeight || wrapperRect.bottom < 0) return;

            cardIdx = (cardIdx + 1) % cards.length;
            const targetCard = cards[cardIdx];
            
            // Use exact horizontal scroll to avoid altering the vertical window scroll (yanking)
            wrapper.scrollTo({
                left: targetCard.offsetLeft - 16, // minus padding
                behavior: 'smooth'
            });
        }, 3500);
    }

    // ─── 10. Particle Canvas ───
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize);

        class P {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.r = Math.random() * 1.2 + 0.3;
                this.dx = (Math.random() - 0.5) * 0.35;
                this.dy = (Math.random() - 0.5) * 0.35;
                this.a = Math.random() * 0.5 + 0.1;
            }
            move() {
                this.x += this.dx; this.y += this.dy;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
            }
            draw() {
                ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, 6.28);
                ctx.fillStyle = `rgba(255,255,255,${this.a})`; ctx.fill();
            }
        }
        for (let i = 0; i < 100; i++) particles.push(new P());
        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.move(); p.draw(); });
            for (let i = 0; i < particles.length; i++)
                for (let j = i + 1; j < particles.length; j++) {
                    const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (d < 110) {
                        ctx.beginPath(); ctx.strokeStyle = `rgba(255,255,255,${0.12 * (1 - d / 110)})`;
                        ctx.lineWidth = 0.4;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            requestAnimationFrame(loop);
        };
        loop();
    }

    // ─── 11. Custom Cursor (desktop only) ───
    if (window.matchMedia('(pointer: fine)').matches) {
        const dot = document.createElement('div'); dot.className = 'cursor-dot'; document.body.appendChild(dot);
        const ring = document.createElement('div'); ring.className = 'cursor-outline'; document.body.appendChild(ring);
        let mx = 0, my = 0, rx = 0, ry = 0;
        window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
        const anim = () => { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(anim); };
        anim();
        document.querySelectorAll('a, button, .hcard').forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hover'));
            el.addEventListener('mouseleave', () => { ring.classList.remove('hover'); el.style.transform = ''; });
            if (el.classList.contains('btn-primary') || el.classList.contains('btn-secondary')) {
                el.addEventListener('mousemove', e => {
                    const r = el.getBoundingClientRect();
                    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
                });
            }
        });
    }

    // ─── 12. Magnetic Navigation Links ───
    if (!isMobile()) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mousemove', e => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translate(0px, 0px)';
            });
        });

        // ─── 13. 3D Card Hover Parallax ───
        document.querySelectorAll('.hcard').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }
});
