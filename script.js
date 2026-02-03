// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksForActive = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        const scrollPosition = window.scrollY;
        const navHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinksForActive.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Throttle scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                highlightNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Contact Form Submission (demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message (demo)
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-category, .project-card, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Utility function to debounce
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

// Code Viewer Functions
function toggleCode(projectId) {
    const codeViewer = document.getElementById(projectId);
    const allViewers = document.querySelectorAll('.code-viewer');
    const allButtons = document.querySelectorAll('.action-btn');
    
    // Close all other code viewers
    allViewers.forEach(viewer => {
        if (viewer.id !== projectId) {
            viewer.style.display = 'none';
        }
    });
    
    // Reset all buttons
    allButtons.forEach(btn => {
        btn.innerHTML = '<i class="fas fa-code"></i> View Code';
    });
    
    // Toggle current viewer
    if (codeViewer) {
        if (codeViewer.style.display === 'none') {
            codeViewer.style.display = 'block';
            // Update button text
            const btn = codeViewer.previousElementSibling.querySelector('.action-btn');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-code"></i> Hide Code';
            }
        } else {
            codeViewer.style.display = 'none';
            const btn = codeViewer.previousElementSibling.querySelector('.action-btn');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-code"></i> View Code';
            }
        }
    }
}

function showCodeTab(tabId, button) {
    const parent = button.closest('.code-viewer');
    const allBlocks = parent.querySelectorAll('.code-block');
    const allTabs = parent.querySelectorAll('.code-tab');
    
    // Hide all blocks
    allBlocks.forEach(block => {
        block.classList.remove('active');
    });
    
    // Remove active from all tabs
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected block
    const selectedBlock = document.getElementById(tabId);
    if (selectedBlock) {
        selectedBlock.classList.add('active');
    }
    
    // Add active to clicked button
    button.classList.add('active');
}

