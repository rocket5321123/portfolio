// ===================================
// NAVIGATION & MOBILE MENU
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
hamburger?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// ===================================
// SMOOTH SCROLL ANIMATION
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animatedElements = document.querySelectorAll('.about-content, .project-card, .social-card, .skill-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===================================
// PROJECT CARDS STAGGER ANIMATION
// ===================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================
window.addEventListener('mousemove', (e) => {
    const planetSystem = document.querySelector('.planet-system');
    if (!planetSystem) return;
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 20;
    
    planetSystem.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===================================
// TYPING EFFECT FOR HERO SUBTITLE
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect on page load
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 80);
        }, 1500);
    }
});

// ===================================
// DYNAMIC STAR CREATION
// ===================================
function createStars(containerId, count, size) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let boxShadow = '';
    for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        boxShadow += `${x}px ${y}px #fff${i < count - 1 ? ', ' : ''}`;
    }
    container.style.boxShadow = boxShadow;
}

// ===================================
// CURSOR GLOW EFFECT
// ===================================
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
    display: none;
`;
document.body.appendChild(cursorGlow);

// Only show on desktop
if (window.innerWidth > 968) {
    cursorGlow.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX - 150}px`;
        cursorGlow.style.top = `${e.clientY - 150}px`;
    });
}

// ===================================
// PROJECT CARD TILT EFFECT
// ===================================
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 10000;
    transition: width 0.1s ease;
    width: 0%;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// ===================================
// LAZY LOADING IMAGES
// ===================================
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// SOCIAL CARD HOVER EFFECT
// ===================================
const socialCards = document.querySelectorAll('.social-card');
socialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// ===================================
// NUMBER COUNTER ANIMATION
// ===================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ===================================
// RANDOM PARTICLE EFFECT
// ===================================
function createParticles() {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
        `;
        document.body.appendChild(particle);
    }
}

// Add float-particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles on desktop
if (window.innerWidth > 968) {
    createParticles();
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
let ticking = false;

function updateOnScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            highlightNavLink();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// ===================================
// PREVENT ANIMATION ON PAGE LOAD
// ===================================
window.addEventListener('load', () => {
    document.body.classList.remove('preload');
});

// ===================================
// EASTER EGG - KONAMI CODE
// ===================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

console.log('%c🚀 Welcome to FRICTIONisSICK! 🚀', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cTip: Try the Konami Code for a surprise! ↑↑↓↓←→←→BA', 'font-size: 14px; color: #764ba2;');

// ===================================
// DARK PARTICLES FROM PROFILE IMAGE
// ===================================
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = 350;
    canvas.height = 350;
    
    const particles = [];
    const particleCount = 60;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    class Particle {
        constructor() {
            this.reset();
            // Random initial position for variety
            this.angle = Math.random() * Math.PI * 2;
            this.distance = Math.random() * radius;
        }
        
        reset() {
            this.angle = Math.random() * Math.PI * 2;
            this.distance = radius * 0.8;
            this.speed = 0.3 + Math.random() * 0.5;
            this.size = 1 + Math.random() * 3;
            this.opacity = 0.8;
            this.fadeSpeed = 0.005 + Math.random() * 0.01;
            
            // Dark purple/blue colors matching website theme
            const colors = [
                'rgba(102, 126, 234, ', // Primary purple
                'rgba(118, 75, 162, ',  // Secondary purple
                'rgba(76, 81, 191, ',   // Deep blue
                'rgba(50, 50, 80, ',    // Dark blue-gray
                'rgba(40, 40, 60, '     // Very dark
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.distance += this.speed;
            this.opacity -= this.fadeSpeed;
            
            // Reset when particle fades out or moves too far
            if (this.opacity <= 0 || this.distance > radius * 2) {
                this.reset();
            }
        }
        
        draw() {
            const x = centerX + Math.cos(this.angle) * this.distance;
            const y = centerY + Math.sin(this.angle) * this.distance;
            
            ctx.beginPath();
            ctx.arc(x, y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.fill();
            
            // Add glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color + '0.5)';
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// ===================================
// LIVE STREAM NOTIFICATION FORM
// ===================================
const notifyForm = document.querySelector('.notify-form');
if (notifyForm) {
    notifyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('.email-input');
        const email = emailInput.value;
        
        if (email) {
            // Show success message
            const originalBtnText = this.querySelector('.notify-btn').textContent;
            this.querySelector('.notify-btn').textContent = 'Subscribed!';
            
            // Store email in localStorage (in a real app, you'd send to a backend)
            localStorage.setItem('streamNotificationEmail', email);
            
            // Reset form after 2 seconds
            setTimeout(() => {
                this.querySelector('.notify-btn').textContent = originalBtnText;
                emailInput.value = '';
            }, 2000);
        }
    });
}

// ===================================
// PAST STREAM RECORDINGS
// ===================================
const viewRecordingsBtn = document.getElementById('viewRecordings');
const pastStreamsSection = document.getElementById('pastStreamsSection');

if (viewRecordingsBtn) {
    viewRecordingsBtn.addEventListener('click', function() {
        // Toggle visibility of past streams section
        if (pastStreamsSection.style.display === 'none') {
            pastStreamsSection.style.display = 'block';
            this.textContent = 'Hide Past Streams';
            loadPastStreams();
        } else {
            pastStreamsSection.style.display = 'none';
            this.textContent = 'View Past Streams';
        }
    });
}

function loadPastStreams() {
    const pastStreamsGrid = document.getElementById('pastStreamsGrid');
    
    // Check if we already have streams loaded
    if (pastStreamsGrid.children.length > 1) return;
    
    // Clear placeholder
    pastStreamsGrid.innerHTML = '';
    
    // Load past streams from localStorage (in a real app, you'd fetch from a backend)
    const pastStreams = JSON.parse(localStorage.getItem('pastStreams') || '[]');
    
    if (pastStreams.length === 0) {
        pastStreamsGrid.innerHTML = `
            <div class="past-stream-placeholder">
                <p>No stream recordings available yet. Past streams will appear here after they end.</p>
            </div>
        `;
        return;
    }
    
    // Display past streams
    pastStreams.forEach(stream => {
        const streamCard = document.createElement('div');
        streamCard.className = 'past-stream-card';
        streamCard.innerHTML = `
            <div class="past-stream-thumbnail">
                <div class="play-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                </div>
            </div>
            <div class="past-stream-info">
                <h4>${stream.title}</h4>
                <div class="past-stream-meta">
                    <span>${stream.date}</span>
                    <span>${stream.duration}</span>
                </div>
            </div>
        `;
        pastStreamsGrid.appendChild(streamCard);
    });
}

// Function to save a stream recording (call this when your stream ends)
function saveStreamRecording(title, duration) {
    const pastStreams = JSON.parse(localStorage.getItem('pastStreams') || '[]');
    
    const newStream = {
        id: Date.now(),
        title: title,
        date: new Date().toLocaleDateString(),
        duration: duration
    };
    
    pastStreams.unshift(newStream); // Add to beginning
    localStorage.setItem('pastStreams', JSON.stringify(pastStreams));
    
    console.log('Stream recording saved:', newStream);
}

// Handle Twitch player connection errors
window.addEventListener('load', function() {
    const twitchPlayer = document.getElementById('twitchPlayer');
    const streamFallback = document.getElementById('streamFallback');
    
    if (twitchPlayer && streamFallback) {
        // Show fallback after 5 seconds if iframe doesn't load
        const fallbackTimeout = setTimeout(function() {
            twitchPlayer.style.display = 'none';
            streamFallback.style.display = 'block';
        }, 5000);
        
        // If iframe loads successfully, cancel the fallback
        twitchPlayer.addEventListener('load', function() {
            clearTimeout(fallbackTimeout);
        });
    }
});
