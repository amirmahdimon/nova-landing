// Loading Screen Handler
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 800);
    }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Theme Toggle (Dark/Light Mode)
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
let isDarkMode = localStorage.getItem('theme') === 'dark' || 
                 (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

function applyTheme() {
    const html = document.documentElement;
    if (isDarkMode) {
        html.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        html.removeAttribute('data-theme');
        if (themeIcon) themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Initialize theme
applyTheme();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        applyTheme();
    });
}

// Language Toggle (English/Farsi)
const langToggle = document.getElementById('lang-toggle');
const langText = langToggle?.querySelector('.lang-text');
let currentLang = localStorage.getItem('language') || 'en';

function applyLanguage(lang) {
    const html = document.documentElement;
    const body = document.body;
    const elements = document.querySelectorAll('[data-en][data-fa]');
    
    if (lang === 'fa') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'fa');
        body.style.direction = 'rtl';
        body.style.textAlign = 'right';
        elements.forEach(el => {
            const faText = el.getAttribute('data-fa');
            if (faText) {
                el.textContent = faText;
                // Preserve HTML structure for elements with children
                if (el.children.length === 0) {
                    el.textContent = faText;
                } else {
                    // Only update text content, not innerHTML
                    const textNodes = Array.from(el.childNodes).filter(node => node.nodeType === 3);
                    if (textNodes.length > 0) {
                        textNodes[0].textContent = faText;
                    }
                }
            }
        });
        if (langText) langText.textContent = 'EN';
        localStorage.setItem('language', 'fa');
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        body.style.direction = 'ltr';
        body.style.textAlign = 'left';
        elements.forEach(el => {
            const enText = el.getAttribute('data-en');
            if (enText) {
                el.textContent = enText;
                if (el.children.length === 0) {
                    el.textContent = enText;
                } else {
                    const textNodes = Array.from(el.childNodes).filter(node => node.nodeType === 3);
                    if (textNodes.length > 0) {
                        textNodes[0].textContent = enText;
                    }
                }
            }
        });
        if (langText) langText.textContent = 'FA';
        localStorage.setItem('language', 'en');
    }
}

// Initialize language
applyLanguage(currentLang);

if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'fa' : 'en';
        applyLanguage(currentLang);
    });
}

// Smooth scrolling for anchor links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu) {
                navMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
            }
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.problem-side, .solution-side, .flow-step, .feature-card, .scale-point, .model-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Button click handlers (placeholder for actual functionality)
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Parallax effect for hero section (lightweight)
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroIllustration = document.querySelector('.hero-illustration');
    
    if (heroIllustration && scrollTop < window.innerHeight) {
        const speed = scrollTop * 0.3;
        heroIllustration.style.transform = `translateY(${speed}px)`;
    }
});

// Animate chart bars on scroll
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.chart-bar');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.animation = 'grow 1s ease-out forwards';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.5 });

const chartVisual = document.querySelector('.chart-visual');
if (chartVisual) {
    chartObserver.observe(chartVisual);
}

// Hover effects for floating cards are handled by CSS, but we can add additional effects here if needed
document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // CSS handles the transform and scale
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        // CSS will reset the transform automatically
        this.style.zIndex = '1';
    });
});

// Pack box click animation
const packBox = document.querySelector('.pack-box');
if (packBox) {
    packBox.addEventListener('click', function() {
        this.style.animation = 'pack-box-bounce 0.5s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
}

// Smooth reveal for collection explanation items
const explanationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.explanation-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    explanationObserver.observe(item);
});

// Animate floating cards on scroll
const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'float 4s ease-in-out infinite, card-glow 4s ease-in-out infinite';
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.floating-card').forEach(card => {
    cardsObserver.observe(card);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const offset = 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - offset;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scroll-to-top');
const progressIndicator = document.createElement('div');
progressIndicator.className = 'progress-indicator';
document.body.appendChild(progressIndicator);

function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / documentHeight) * 100;
    
    progressIndicator.style.width = scrollPercent + '%';
    
    if (scrollTop > 300) {
        scrollToTopBtn?.classList.add('visible');
    } else {
        scrollToTopBtn?.classList.remove('visible');
    }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

scrollToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced Mobile Menu Toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active', isActive);
        mobileMenuToggle.setAttribute('aria-expanded', isActive);
        
        // Prevent body scroll when menu is open
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle?.classList.remove('active');
            mobileMenuToggle?.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
});

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    updateScrollProgress();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Lazy load images (if any are added in the future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading state to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Only add loading state if button doesn't have a href or isn't a link
        if (this.tagName === 'BUTTON' && !this.hasAttribute('disabled')) {
            // Add ripple effect (existing code)
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle?.classList.remove('active');
        mobileMenuToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Error handling for missing elements
const safeQuerySelector = (selector, callback) => {
    const element = document.querySelector(selector);
    if (element && callback) {
        callback(element);
    }
};

// Pitch Deck Mode
const pitchModeToggle = document.getElementById('pitch-mode-toggle');
const pitchControls = document.getElementById('pitch-controls');
const pitchPrev = document.getElementById('pitch-prev');
const pitchNext = document.getElementById('pitch-next');
const pitchExit = document.getElementById('pitch-exit');
const pitchCurrent = document.getElementById('pitch-current');
const pitchTotal = document.getElementById('pitch-total');

// Sections that should be slides in pitch mode
const pitchSections = [
    'hero',
    'problem-solution',
    'collection',
    'arena',
    'features',
    'innovation',
    'scalability',
    'business'
];

// Exclude final-cta and footer from pitch mode
const excludedSections = ['final-cta'];

let currentSlide = 0;
let isPitchMode = false;

function initPitchMode() {
    pitchTotal.textContent = pitchSections.length;
    
    // Set initial slide
    if (isPitchMode) {
        goToSlide(0);
    }
}

function enterPitchMode() {
    isPitchMode = true;
    document.body.classList.add('pitch-mode');
    pitchModeToggle?.classList.add('active');
    currentSlide = 0;
    goToSlide(0);
    
    // Disable scroll
    document.body.style.overflow = 'hidden';
    
    // Save scroll position
    window.pitchScrollPos = window.pageYOffset;
}

function exitPitchMode() {
    isPitchMode = false;
    document.body.classList.remove('pitch-mode');
    pitchModeToggle?.classList.remove('active');
    
    // Re-enable scroll
    document.body.style.overflow = '';
    
    // Restore scroll position
    if (window.pitchScrollPos !== undefined) {
        window.scrollTo(0, window.pitchScrollPos);
    }
    
    // Show all sections normally
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        section.classList.remove('active', 'prev');
    });
}

function goToSlide(index) {
    if (index < 0 || index >= pitchSections.length) return;
    
    currentSlide = index;
    pitchCurrent.textContent = index + 1;
    
    // Update button states
    if (pitchPrev) {
        pitchPrev.disabled = index === 0;
    }
    if (pitchNext) {
        pitchNext.disabled = index === pitchSections.length - 1;
    }
    
    // Show/hide sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
        const sectionId = section.getAttribute('id');
        const slideIndex = pitchSections.indexOf(sectionId);
        
        // Skip excluded sections
        if (excludedSections.includes(sectionId)) {
            return;
        }
        
        section.classList.remove('active', 'prev');
        
        if (slideIndex === index) {
            section.classList.add('active');
            // Scroll section to top
            section.scrollTop = 0;
        } else if (slideIndex < index && slideIndex !== -1) {
            section.classList.add('prev');
        }
    });
}

function nextSlide() {
    if (currentSlide < pitchSections.length - 1) {
        goToSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

// Event Listeners
pitchModeToggle?.addEventListener('click', () => {
    if (isPitchMode) {
        exitPitchMode();
    } else {
        enterPitchMode();
    }
});

pitchNext?.addEventListener('click', nextSlide);
pitchPrev?.addEventListener('click', prevSlide);
pitchExit?.addEventListener('click', exitPitchMode);

// Keyboard navigation for pitch mode
document.addEventListener('keydown', (e) => {
    if (!isPitchMode) return;
    
    // Prevent default scrolling
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        e.preventDefault();
    }
    
    // Don't trigger if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
    }
    
    switch(e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ': // Spacebar
            e.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
        case 'PageUp':
            e.preventDefault();
            prevSlide();
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(pitchSections.length - 1);
            break;
        case 'Escape':
            e.preventDefault();
            exitPitchMode();
            break;
    }
});

// Swipe gestures for mobile (optional enhancement)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    if (!isPitchMode) return;
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (!isPitchMode) return;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// Initialize pitch mode on load
initPitchMode();

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateScrollProgress();
        initPitchMode();
    });
} else {
    updateScrollProgress();
    initPitchMode();
}


