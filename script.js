document.addEventListener('DOMContentLoaded', () => {
    // Enable custom cursor and animations
    initLoadingScreen();
    initNavbarScroll();
    initMobileMenu();
    initCustomCursor();
    initScrollProgressBar();
    initCanvasParticles();
    initTypingEffect();
    initMouseGlowEffect();
    initScrollReveal();
    initCounterAnimations();
    initHospitalFilters();
    initInteractiveTimeline();
    initTestimonialSlider();
    initFaqAccordion();
    initButtonRipples();
    initFormValidation();
    initModals();
    initThemeToggle();
    initEmergencyCommandCenter();
});

/* ==========================================
   1. PREMIUM LOADING SCREEN
   ========================================== */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const fill = document.getElementById('loading-fill');
    const body = document.body;

    body.classList.add('loading');
    
    let progress = 0;
    const interval = setInterval(() => {
        // Accelerate near the end
        const increment = progress > 70 ? Math.random() * 8 + 2 : Math.random() * 4 + 1;
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Fade out screen
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                body.classList.remove('loading');
                
                // Trigger scroll reveals for initial hero
                setTimeout(() => {
                    const heroReveals = document.querySelectorAll('#hero .reveal, #hero .reveal-left, #hero .reveal-right');
                    heroReveals.forEach(el => el.classList.add('revealed'));
                }, 300);
            }, 500);
        }
        fill.style.width = `${progress}%`;
    }, 80);
}

/* ==========================================
   2. NAVBAR SCROLL EFFECT
   ========================================== */
function initNavbarScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================
   3. MOBILE NAVIGATION MENU
   ========================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ==========================================
   4. CUSTOM CURSOR
   ========================================== */
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate position for center dot
        dot.style.top = `${mouseY}px`;
        dot.style.left = `${mouseX}px`;
    });

    // Inertial lag for the outer ring (lerp)
    function animateRing() {
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;
        
        ringX += dx * 0.15;
        ringY += dy * 0.15;
        
        ring.style.top = `${ringY}px`;
        ring.style.left = `${ringX}px`;
        
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover states for clickable items
    const hoverables = document.querySelectorAll('a, button, select, input, textarea, .faq-question-btn, .timeline-step, .filter-btn, .services-card');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('custom-cursor-hovering');
        });
        el.addEventListener('mouseleave', () => {
            ring.classList.remove('custom-cursor-hovering');
        });
    });
}

/* ==========================================
   5. SCROLL PROGRESS BAR & ACTIVE SECTION HIGHLIGHT
   ========================================== */
function initScrollProgressBar() {
    const scrollBar = document.getElementById('scroll-progress-fill');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / docHeight) * 100;
        if (scrollBar) scrollBar.style.width = `${scrolled}%`;

        // Back to top visible threshold
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==========================================
   6. CANVAS PARTICLES PHYSICS
   ========================================== */
function initCanvasParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.alpha = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce boundary checking
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(229, 57, 53, ${this.alpha})`;
            ctx.fill();
        }
    }

    const maxParticles = Math.min(60, Math.floor((width * height) / 15000));
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    // Connection line opacity decreases with distance
                    const lineAlpha = (1 - dist / 120) * 0.08;
                    ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================
   7. TYPING EFFECT
   ========================================== */
function initTypingEffect() {
    const textEl = document.getElementById('typing-text');
    if (!textEl) return;
    const phrases = ["Emergency Response System", "AI-Powered Rescue Network", "24/7 Live Monitoring Grid"];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    
    function type() {
        const current = phrases[phraseIdx];
        if (isDeleting) {
            textEl.textContent = current.substring(0, charIdx - 1);
            charIdx--;
        } else {
            textEl.textContent = current.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 40 : 100;
        
        if (!isDeleting && charIdx === current.length) {
            speed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            speed = 500; // Short pause before typing next
        }
        
        setTimeout(type, speed);
    }
    
    setTimeout(type, 1500);
}

/* ==========================================
   8. CARD MOUSE GLOW EFFECT (VERCEL STYLE)
   ========================================== */
function initMouseGlowEffect() {
    const cards = document.querySelectorAll('.glow-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* ==========================================
   9. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(el => revealObserver.observe(el));

    // Nav active section highlight
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(sec => navObserver.observe(sec));
}

/* ==========================================
   10. COUNTER ANIMATIONS
   ========================================== */
function initCounterAnimations() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;
    const counters = document.querySelectorAll('.counter-num');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'), 10);
                    const duration = 2000; // 2 seconds
                    const startTime = performance.now();
                    
                    function updateCounter(currentTime) {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        
                        // Ease out quad
                        const easeProgress = progress * (2 - progress);
                        const currentVal = Math.floor(easeProgress * target);
                        
                        // Format commas or add suffix
                        if (target >= 1000) {
                            counter.textContent = (currentVal / 1000).toFixed(1) + 'k+';
                        } else {
                            counter.textContent = currentVal + '+';
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            // Ensure final value matches target format
                            if (target >= 1000) {
                                counter.textContent = (target / 1000).toFixed(1) + 'k+';
                            } else {
                                counter.textContent = target + '+';
                            }
                        }
                    }
                    requestAnimationFrame(updateCounter);
                });
                observer.unobserve(statsSection);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
}

/* ==========================================
   11. HOSPITAL FILTERING & SEARCH SYSTEM
   ========================================== */
function initHospitalFilters() {
    const searchInput = document.getElementById('hospital-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const hospitalCards = document.querySelectorAll('.hospital-card');
    
    if (!hospitalCards.length) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function filterHospitals() {
        hospitalCards.forEach(card => {
            const name = card.querySelector('.hospital-name').textContent.toLowerCase();
            const rating = parseFloat(card.querySelector('.hospital-rating').textContent.trim());
            const bedsText = card.querySelector('.h-stat-value').textContent; // Available Beds
            const beds = parseInt(bedsText, 10);
            const status = card.getAttribute('data-status'); // available, limited, full

            const matchesSearch = name.includes(searchQuery);
            let matchesFilter = true;

            if (activeFilter === 'available') {
                matchesFilter = status === 'available';
            } else if (activeFilter === 'icu') {
                matchesFilter = card.getAttribute('data-icu') === 'true';
            } else if (activeFilter === 'top-rated') {
                matchesFilter = rating >= 4.5;
            }

            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
                // Trigger a micro animate-in
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            filterHospitals();
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
            filterHospitals();
        });
    });
}

/* ==========================================
   12. INTERACTIVE TIMELINE PROGRESSION
   ========================================== */
function initInteractiveTimeline() {
    const steps = document.querySelectorAll('.timeline-step');
    const progressFill = document.getElementById('timeline-progress');
    const titleEl = document.getElementById('timeline-detail-title');
    const descEl = document.getElementById('timeline-detail-desc');
    
    if (!steps.length) return;

    const pipelineData = {
        1: {
            title: "Emergency Reported",
            desc: "The citizen reports the crisis through SOSync mobile app or portal. Coordinates, user information, and incident details are automatically uploaded and logged into the emergency network dashboard."
        },
        2: {
            title: "Dispatcher Assigned",
            desc: "The automated AI triage system screens reports instantly. The dispatcher receives details of the incident on their monitor console, evaluates complexity, and takes ownership of the alert."
        },
        3: {
            title: "Ambulance Dispatched",
            desc: "The dispatcher triggers coordinates to the nearest available, traffic-optimized ambulance. Response units are deployed with live telemetry routing them to the patient location."
        },
        4: {
            title: "Reached Patient",
            desc: "Paramedics arrive on-site, evaluate the emergency, and administer critical first-aid. They log diagnostic stats and vital metrics directly back to the dashboard through mobile telemetry."
        },
        5: {
            title: "Hospital Arrival",
            desc: "The patient is successfully transferred to the target emergency ward. Integrated dashboard coordinates alert doctors beforehand, guaranteeing bed space and ICU preparation."
        },
        6: {
            title: "Incident Resolved",
            desc: "Emergency procedures conclude successfully. The log is marked as closed, emergency units return to active readiness, and patient reports are archived securely."
        }
    };

    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            const stepNum = index + 1;
            
            // Update Active and Completed steps
            steps.forEach((s, idx) => {
                s.classList.remove('active', 'completed');
                if (idx < index) {
                    s.classList.add('completed');
                } else if (idx === index) {
                    s.classList.add('active');
                }
            });

            // Calculate progress fill percentage (0% to 100% across steps)
            const fillPercent = (index / (steps.length - 1)) * 100;
            progressFill.style.width = `${fillPercent}%`;

            // Display step description with smooth cross-fade
            titleEl.style.opacity = '0';
            descEl.style.opacity = '0';
            setTimeout(() => {
                titleEl.textContent = pipelineData[stepNum].title;
                descEl.textContent = pipelineData[stepNum].desc;
                titleEl.style.opacity = '1';
                descEl.style.opacity = '1';
            }, 250);
        });
    });
}

/* ==========================================
   13. TESTIMONIAL SLIDER CAROUSEL
   ========================================== */
function initTestimonialSlider() {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dotContainer = document.getElementById('slider-dots');
    
    if (!track) return;
    const slides = Array.from(track.children);
    let activeIdx = 0;

    // Create Navigation Dots
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(idx));
        dotContainer.appendChild(dot);
    });

    const dots = Array.from(dotContainer.children);

    function moveToSlide(targetIdx) {
        if (targetIdx < 0) targetIdx = slides.length - 1;
        if (targetIdx >= slides.length) targetIdx = 0;
        
        track.style.transform = `translateX(-${targetIdx * 100}%)`;
        
        dots[activeIdx].classList.remove('active');
        dots[targetIdx].classList.add('active');
        
        activeIdx = targetIdx;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => moveToSlide(activeIdx - 1));
        nextBtn.addEventListener('click', () => moveToSlide(activeIdx + 1));
    }

    // Auto loop slide
    let sliderTimer = setInterval(() => moveToSlide(activeIdx + 1), 6000);
    
    track.addEventListener('mouseenter', () => clearInterval(sliderTimer));
    track.addEventListener('mouseleave', () => {
        sliderTimer = setInterval(() => moveToSlide(activeIdx + 1), 6000);
    });
}

/* ==========================================
   14. FAQ ACCORDION
   ========================================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question-btn');
        const answerPanel = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Collapse all other panels
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Toggle clicked panel
            if (!isActive) {
                item.classList.add('active');
                answerPanel.style.maxHeight = `${answerPanel.scrollHeight}px`;
            }
        });
    });
}

/* ==========================================
   15. BUTTON RIPPLE CLICKS EFFECT
   ========================================== */
function initButtonRipples() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/* ==========================================
   16. FORM VALIDATION & TOAST SYSTEM
   ========================================== */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} glass-panel`;
        
        let iconMarkup = '';
        if (type === 'success') {
            iconMarkup = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17L4 12"/></svg>`;
        } else {
            iconMarkup = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
        }

        toast.innerHTML = `
            <div class="toast-icon-wrap">${iconMarkup}</div>
            <div class="toast-message">${message}</div>
        `;

        toastContainer.appendChild(toast);
        
        // Trigger reflow to initiate entry slide
        void toast.offsetWidth;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4000);
    }

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredInputs = form.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--color-primary)';
                } else {
                    input.style.borderColor = 'var(--border-color)';
                }
            });

            if (!isValid) {
                showToast("Please fill in all required fields properly.", "error");
                return;
            }

            // Submit visual feedback simulation
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: logoPulseRing 1s linear infinite">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="16"/>
                </svg>
                Processing...
            `;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                form.reset();
                
                // Form specific success alerts
                if (form.id === 'report-emergency-form') {
                    showToast("Emergency reported successfully! Dispatches are underway.", "success");
                    triggerSimulatedAlert(); // Inject mock alert into dashboard
                } else if (form.id === 'contact-form') {
                    showToast("Message sent successfully. Support team will respond shortly.", "success");
                } else if (form.id === 'newsletter-footer-form') {
                    showToast("Subscribed! Thank you for staying updated.", "success");
                } else if (form.id === 'login-form') {
                    showToast("Authentication successful! Welcome to SOSync.", "success");
                    document.getElementById('login-modal').classList.remove('active');
                }
            }, 1800);
        });
    });

    // Share toast trigger function globally
    window.triggerToast = showToast;
}

/* ==========================================
   17. INTERACTIVE POPUP MODALS
   ========================================== */
function initModals() {
    const loginBtn = document.getElementById('nav-login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.getElementById('modal-close-btn');

    if (!loginModal) return;

    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });

    // Close on overlay click
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });

    // SOS Emergency Button Trigger
    const sosNavbarBtn = document.getElementById('nav-sos-btn');
    if (sosNavbarBtn) {
        sosNavbarBtn.addEventListener('click', () => {
            window.triggerToast("SOS Signal Broadcasted! Triangulating coordinate beacons...", "error");
            
            // Scroll to form automatically
            const reportSec = document.getElementById('report');
            if (reportSec) {
                reportSec.scrollIntoView({ behavior: 'smooth' });
                // Populate quick alert
                const descArea = reportSec.querySelector('#report-description');
                if (descArea) {
                    descArea.value = "CRITICAL SOS BROADCAST FROM NAVBAR TRIGGERS COORDINATE GPS BEACON AUTOMATICALLY.";
                    // Trigger label float
                    descArea.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        });
    }
}

/* ==========================================
   18. DASHBOARD LIVE MAP MOCK SYNC SIMULATION
   ========================================== */
function triggerSimulatedAlert() {
    const tableBody = document.querySelector('.db-table tbody');
    if (!tableBody) return;

    const row = document.createElement('tr');
    
    // Fetch mock input from form if available
    const name = document.getElementById('report-name').value || "Self-Alert Broadcast";
    const emergencyType = document.getElementById('report-type').value || "General Emergency";
    const priority = document.getElementById('report-priority').value || "High";
    const location = document.getElementById('report-location').value || "Zone-5 Sector C";
    
    let priorityClass = 'pb-high';
    if (priority.toLowerCase() === 'critical') priorityClass = 'pb-critical';
    if (priority.toLowerCase() === 'medium') priorityClass = 'pb-medium';

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    row.innerHTML = `
        <td><strong style="color:#FFF">${timeStr}</strong></td>
        <td>${emergencyType}</td>
        <td>${location}</td>
        <td><span class="priority-badge ${priorityClass}">${priority}</span></td>
        <td><span style="color:#10B981;font-weight:600">Pending</span></td>
    `;
    
    tableBody.insertBefore(row, tableBody.firstChild);
    
    // Crop excess rows to prevent layout breakage
    if (tableBody.children.length > 5) {
        tableBody.removeChild(tableBody.lastChild);
    }
}

/* ==========================================
   19. DARK/LIGHT THEME SWITCHING & PERSISTENCE
   ========================================== */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    
    if (!toggleBtn) return;

    // Load persisted theme or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        htmlEl.setAttribute('data-theme', 'dark');
    } else {
        htmlEl.setAttribute('data-theme', 'light');
    }

    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        window.triggerToast(`Theme switched to ${newTheme} mode!`, 'info');
    });
}

/* ==========================================
   20. EMERGENCY COMMAND CENTER (LEAFLET SIMULATOR)
   ========================================== */
function initEmergencyCommandCenter() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Check if Leaflet CDN is loaded properly
    if (typeof L === 'undefined') {
        console.warn("Leaflet Map CDN unavailable. Operating in Offline Triage Mode.");
        mapElement.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; padding:2rem; text-align:center; color:#94A3B8; background:#0F172A; font-family:var(--font-sans);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom:1rem; color:var(--color-primary)"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <h4 style="color:#FFF; margin-bottom:0.5rem; font-weight:700">Offline Telemetry Mode</h4>
                <p style="font-size:0.85rem; max-width:320px; margin:0; line-height:1.4">The Leaflet.js map network is offline. Please check your internet connectivity to load the dynamic Chandigarh vector coordinate grid.</p>
            </div>
        `;
        return;
    }

    // Centered on Chandigarh [30.7333, 76.7794] at Zoom level 12
    const ccMap = L.map('map', {
        center: [30.7333, 76.7794],
        zoom: 12,
        zoomControl: false
    });

    // Add Zoom Control on top-left
    L.control.zoom({ position: 'topleft' }).addTo(ccMap);

    // Standard OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(ccMap);

    // Operational Datasets
    const hospitals = [
        { name: "PGIMER Chandigarh", coords: [30.7624, 76.7723], beds: 24, doctors: 12, phone: "+91 172 274 7585" },
        { name: "GMCH Sector 32", coords: [30.7065, 76.7725], beds: 14, doctors: 8, phone: "+91 172 266 5253" },
        { name: "Fortis Hospital Mohali", coords: [30.6948, 76.7324], beds: 18, doctors: 10, phone: "+91 172 502 1222" },
        { name: "Max Hospital Mohali", coords: [30.7258, 76.7214], beds: 12, doctors: 6, phone: "+91 172 665 2000" }
    ];

    const policeStations = [
        { name: "Sector 17 Police Station", coords: [30.7431, 76.7790], badge: "Sect-17" },
        { name: "Sector 34 Police Station", coords: [30.7225, 76.7680], badge: "Sect-34" },
        { name: "Chandigarh Police HQ", coords: [30.7580, 76.8040], badge: "HQ" }
    ];

    const fireStations = [
        { name: "Sector 17 Fire Station", coords: [30.7410, 76.7820], id: "FS-17" },
        { name: "Industrial Area Fire Station", coords: [30.7050, 76.8010], id: "FS-IA" }
    ];

    const ambulances = [
        { id: "Amb A-101", coords: [30.7350, 76.7550], status: "On Route", driver: "Rajesh Kumar", eta: "6 Min", sector: "Sector 22" },
        { id: "Amb A-102", coords: [30.7180, 76.7450], status: "Available", driver: "Manpreet Singh", eta: "--", sector: "Sector 35" },
        { id: "Amb A-103", coords: [30.7480, 76.7650], status: "On Route", driver: "Sunil Dutt", eta: "3 Min", sector: "Sector 15" },
        { id: "Amb A-104", coords: [30.7200, 76.7280], status: "Available", driver: "Amit Sharma", eta: "--", sector: "Sector 43" },
        { id: "Amb A-105", coords: [30.7520, 76.7880], status: "On Route", driver: "Gurpreet Singh", eta: "8 Min", sector: "Sector 8" }
    ];

    const emergencies = [
        { id: "Em E-1", coords: [30.7390, 76.7590], type: "Road Accident", priority: "Critical", sector: "Sector 22", status: "Amb Assigned" },
        { id: "Em E-2", coords: [30.7140, 76.7230], type: "Structure Fire", priority: "Critical", sector: "Sector 43", status: "Fire Dispatched" },
        { id: "Em E-3", coords: [30.7460, 76.7960], type: "Cardiac Arrest", priority: "High", sector: "Sector 26", status: "Amb Assigned" }
    ];

    // Helper: HTML-based CSS DivIcons
    function createCustomIcon(className, iconChar) {
        return L.divIcon({
            className: `cc-marker ${className}`,
            html: `<span>${iconChar}</span>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        });
    }

    // Hospitals
    hospitals.forEach(h => {
        L.marker(h.coords, { icon: createCustomIcon('cc-marker-hospital', '🏥') })
            .addTo(ccMap)
            .bindPopup(`
                <div class="cc-popup-container">
                    <div class="cc-popup-title">${h.name}</div>
                    <div class="cc-popup-row"><span class="cc-popup-label">Status:</span><span class="cc-popup-val cc-popup-badge csb-available">Available</span></div>
                    <div class="cc-popup-row"><span class="cc-popup-label">Emergency Beds:</span><span class="cc-popup-val">${h.beds}</span></div>
                    <div class="cc-popup-row"><span class="cc-popup-label">Doctors Available:</span><span class="cc-popup-val">${h.doctors}</span></div>
                    <div class="cc-popup-row"><span class="cc-popup-label">Emergency Contact:</span><span class="cc-popup-val">${h.phone}</span></div>
                </div>
            `);
    });

    // Police
    policeStations.forEach(p => {
        L.marker(p.coords, { icon: createCustomIcon('cc-marker-police', '👮') })
            .addTo(ccMap)
            .bindPopup(`
                <div class="cc-popup-container">
                    <div class="cc-popup-title">${p.name}</div>
                    <div class="cc-popup-row"><span class="cc-popup-label">Status:</span><span class="cc-popup-val cc-popup-badge csb-available">Active Patrol</span></div>
                    <div class="cc-popup-row"><span class="cc-popup-label">Station Code:</span><span class="cc-popup-val">${p.badge}</span></div>
                </div>
            `);
    });

    // Fire
    fireStations.forEach(f => {
        L.marker(f.coords, { icon: createCustomIcon('cc-marker-fire', '🚒') })
            .addTo(ccMap)
            .bindPopup(`
                <div class="cc-popup-container">
                    <div class="cc-popup-title">${f.name}</div>
                    <div class="cc-popup-row"><span class="cc-popup-label">Status:</span><span class="cc-popup-val cc-popup-badge csb-available">Alert Ready</span></div>
                    <div class="cc-popup-row"><span class="cc-popup-label">Station Code:</span><span class="cc-popup-val">${f.id}</span></div>
                </div>
            `);
    });

    // Ambulances (cached markers for movement updates)
    const ambulanceMarkers = {};
    ambulances.forEach(a => {
        const marker = L.marker(a.coords, { icon: createCustomIcon('cc-marker-ambulance', '🚑') })
            .addTo(ccMap)
            .bindPopup(getAmbulancePopupHtml(a));
        ambulanceMarkers[a.id] = { marker, data: a };
    });

    function getAmbulancePopupHtml(a) {
        return `
            <div class="cc-popup-container">
                <div class="cc-popup-title">${a.id}</div>
                <div class="cc-popup-row"><span class="cc-popup-label">Driver:</span><span class="cc-popup-val">${a.driver}</span></div>
                <div class="cc-popup-row"><span class="cc-popup-label">Status:</span><span class="cc-popup-val cc-popup-badge ${a.status === 'Available' ? 'csb-available' : 'csb-on-route'}">${a.status}</span></div>
                <div class="cc-popup-row"><span class="cc-popup-label">ETA:</span><span class="cc-popup-val">${a.eta}</span></div>
                <div class="cc-popup-row"><span class="cc-popup-label">Sector:</span><span class="cc-popup-val">${a.sector}</span></div>
            </div>
        `;
    }

    // Emergencies
    const emergencyMarkers = {};
    emergencies.forEach(e => {
        const marker = L.marker(e.coords, { icon: createCustomIcon('cc-marker-emergency', '🚨') })
            .addTo(ccMap)
            .bindPopup(getEmergencyPopupHtml(e));
        emergencyMarkers[e.id] = { marker, data: e };
    });

    function getEmergencyPopupHtml(e) {
        return `
            <div class="cc-popup-container">
                <div class="cc-popup-title">${e.type}</div>
                <div class="cc-popup-row"><span class="cc-popup-label">Priority:</span><span class="cc-popup-val cc-popup-badge csb-critical">${e.priority}</span></div>
                <div class="cc-popup-row"><span class="cc-popup-label">Location:</span><span class="cc-popup-val">${e.sector}</span></div>
                <div class="cc-popup-row"><span class="cc-popup-label">Status:</span><span class="cc-popup-val">${e.status}</span></div>
            </div>
        `;
    }

    // DOM Bindings
    const ambulancesListContainer = document.getElementById('cc-ambulances-list');
    const hospitalsListContainer = document.getElementById('cc-hospitals-list');
    const feedTickerContainer = document.getElementById('live-dispatch-feed');

    function renderAmbulancesList() {
        if (!ambulancesListContainer) return;
        ambulancesListContainer.innerHTML = ambulances.map(a => `
            <div class="cc-resource-row">
                <div><strong>${a.id}</strong> <small style="color:#64748B">(${a.sector})</small></div>
                <span class="status-badge ${a.status === 'Available' ? 'csb-available' : 'csb-on-route'}">${a.status}</span>
            </div>
        `).join('');
    }

    function renderHospitalsList() {
        if (!hospitalsListContainer) return;
        hospitalsListContainer.innerHTML = hospitals.map(h => `
            <div class="cc-resource-row">
                <div><strong>${h.name.split(' ')[0]}</strong></div>
                <span class="status-badge csb-available">${h.beds} Beds</span>
            </div>
        `).join('');
    }

    function addFeedItem(text) {
        if (!feedTickerContainer) return;
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        const item = document.createElement('div');
        item.className = 'feed-item-ticker';
        item.innerHTML = `
            <span class="ticker-time">${timeStr}</span>
            <span class="ticker-text">${text}</span>
        `;
        
        feedTickerContainer.insertBefore(item, feedTickerContainer.firstChild);
        if (feedTickerContainer.children.length > 6) {
            feedTickerContainer.removeChild(feedTickerContainer.lastChild);
        }
    }

    // Initial renders
    renderAmbulancesList();
    renderHospitalsList();
    addFeedItem("🛰️ Chandigarh Telemetry Grid binding completed.");
    addFeedItem("🏥 Hospital networks connected: 4 operational wards.");
    addFeedItem("🚑 Ambulance beacons: 5 vehicles online.");

    // Simulation Engine Loop
    function runCommandCenterSimulation() {
        const actions = [
            // Move Ambulance slightly
            () => {
                const randomAmbIdx = Math.floor(Math.random() * ambulances.length);
                const amb = ambulances[randomAmbIdx];
                
                const latDelta = (Math.random() - 0.5) * 0.003;
                const lngDelta = (Math.random() - 0.5) * 0.003;
                amb.coords[0] += latDelta;
                amb.coords[1] += lngDelta;
                
                const prevStatus = amb.status;
                amb.status = Math.random() > 0.45 ? "On Route" : "Available";
                amb.eta = amb.status === "On Route" ? `${Math.floor(Math.random() * 8) + 2} Min` : "--";
                
                const sectors = ["Sector 22", "Sector 35", "Sector 15", "Sector 43", "Sector 8", "Sector 17", "Sector 34"];
                const randomSector = sectors[Math.floor(Math.random() * sectors.length)];
                amb.sector = randomSector;

                const ambObj = ambulanceMarkers[amb.id];
                if (ambObj) {
                    ambObj.marker.setLatLng(amb.coords);
                    ambObj.marker.setPopupContent(getAmbulancePopupHtml(amb));
                    if (amb.status === "On Route" && prevStatus === "Available") {
                        ambObj.marker.openPopup();
                    }
                }
                
                renderAmbulancesList();
                
                if (amb.status === "On Route") {
                    const msg = `🚑 ${amb.id} dispatched to ${randomSector}`;
                    window.triggerToast(msg, 'info');
                    addFeedItem(msg);
                } else {
                    const msg = `🚑 ${amb.id} back at standby in ${randomSector}`;
                    addFeedItem(msg);
                }
                
                // Update average response time UI metric
                const responseTimeEl = document.getElementById('cc-response-time');
                if (responseTimeEl) {
                    const currentResponse = (Math.random() * 1.5 + 3.8).toFixed(1);
                    responseTimeEl.textContent = `${currentResponse} Min`;
                }
            },
            // Hospital beds update
            () => {
                const randomHospIdx = Math.floor(Math.random() * hospitals.length);
                const hosp = hospitals[randomHospIdx];
                const delta = Math.random() > 0.5 ? 1 : -1;
                hosp.beds = Math.max(2, hosp.beds + delta);
                
                renderHospitalsList();
                
                const msg = `🏥 ${hosp.name} accepted patient. Beds: ${hosp.beds}`;
                addFeedItem(msg);
            },
            // Police / Fire dispatch alerts
            () => {
                const isPolice = Math.random() > 0.5;
                if (isPolice) {
                    const ps = policeStations[Math.floor(Math.random() * policeStations.length)];
                    const sectors = ["Sector 22", "Sector 34", "Sector 17", "Sector 15", "Sector 26"];
                    const sec = sectors[Math.floor(Math.random() * sectors.length)];
                    const msg = `👮 Police unit from ${ps.name.split(' ')[0]} assigned to ${sec}`;
                    window.triggerToast(msg, 'success');
                    addFeedItem(msg);
                } else {
                    const fs = fireStations[Math.floor(Math.random() * fireStations.length)];
                    const sectors = ["Industrial Area", "Sector 22", "Sector 17"];
                    const sec = sectors[Math.floor(Math.random() * sectors.length)];
                    const msg = `🚒 Fire unit ${fs.id} reached destination in ${sec}`;
                    window.triggerToast(msg, 'info');
                    addFeedItem(msg);
                }
            },
            // Emergency Alert toggle
            () => {
                const randomEmIdx = Math.floor(Math.random() * emergencies.length);
                const em = emergencies[randomEmIdx];
                
                const statuses = ["Ambulance Assigned", "First Responders Arrived", "Checkpoint Cleared", "Transport Pipeline active"];
                em.status = statuses[Math.floor(Math.random() * statuses.length)];
                
                const emObj = emergencyMarkers[em.id];
                if (emObj) {
                    emObj.marker.setPopupContent(getEmergencyPopupHtml(em));
                }
                
                const msg = `🚨 Alert Update [${em.type}] at ${em.sector}: ${em.status}`;
                addFeedItem(msg);
                
                const activeCasesEl = document.getElementById('cc-active-cases');
                if (activeCasesEl) {
                    const currentActive = Math.floor(Math.random() * 2) + 2;
                    activeCasesEl.textContent = `${currentActive} Active`;
                }
            }
        ];

        // Execute a random mock operational trigger
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        randomAction();
        
        // Loop again in 5 to 8 seconds
        const nextDelay = Math.floor(Math.random() * 3000) + 5000;
        setTimeout(runCommandCenterSimulation, nextDelay);
    }

    setTimeout(runCommandCenterSimulation, 6000);
}
