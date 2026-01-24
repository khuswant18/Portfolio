// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.nav-container');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(74, 144, 226, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.6)';
        navbar.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation and initialize image slideshow
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll(
        '.project-showcase-item, .stat-card-large, .highlight-modern, .achievement-banner, .skill-item, .college-container, .school-container'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.2s ease ${index * 0.02}s`;
        observer.observe(el);
    });
    
    // Project Image Cycling
    const previewContainers = document.querySelectorAll('.preview-images');
    console.log('Found preview containers:', previewContainers.length);
    
    previewContainers.forEach((container, containerIndex) => {
        const images = container.querySelectorAll('img');
        console.log(`Container ${containerIndex} has ${images.length} images`);
        
        if (images.length <= 1) return;
        
        let currentIndex = 0;
        
        // Remove all active classes first
        images.forEach(img => img.classList.remove('active'));
        // Set first image as active
        images[0].classList.add('active');
        console.log(`Container ${containerIndex}: First image set as active`);
        
        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
            console.log(`Container ${containerIndex}: Switched to image ${currentIndex}`);
        }, 1000);
    });
});

// Add animate-in class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Typing effect for role (optional enhancement)
const roles = ['Full-Stack Developer', 'Mentor @ MentorMap', 'Problem Solver', 'Tech Enthusiast'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleElement = document.querySelector('.text-role');

function typeRole() {
    if (!roleElement) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }
    
    // Don't modify the role element to keep the badges visible
    // This is just for potential future use
    
    if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    
    // setTimeout(typeRole, isDeleting ? 50 : 100);
}

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
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

// Add active link styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: #4a90e2;
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// Console greeting
console.log('%c👋 Hello there!', 'font-size: 24px; font-weight: bold;');
console.log('%cWelcome to Khuswant Rajpurohit\'s Portfolio', 'font-size: 14px; color: #4a90e2;');
console.log('%cFeel free to explore the code!', 'font-size: 12px; color: #666;');
