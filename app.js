// Mohammed Fahed Ahmed Khan Portfolio - JavaScript (Fixed)

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Contact Form
    const contactForm = document.getElementById('contact-form');

    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializeSmoothScrolling();

    // Navigation functionality
    function initializeNavigation() {
        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileMenu);
        }

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                closeMobileMenu();
                // Don't prevent default here, let smooth scrolling handle it
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navToggle && navMenu && 
                !navToggle.contains(event.target) && 
                !navMenu.contains(event.target)) {
                closeMobileMenu();
            }
        });
    }

    function toggleMobileMenu() {
        if (navMenu) {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                }
            });
        }
    }

    function closeMobileMenu() {
        if (navMenu) {
            navMenu.classList.remove('active');
            
            // Reset hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = '';
                bar.style.opacity = '';
            });
        }
    }

    // Scroll effects
    function initializeScrollEffects() {
        window.addEventListener('scroll', handleScroll);
        
        // Set active navigation link on scroll
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => setActiveNavLink(sections));
    }

    function handleScroll() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function setActiveNavLink(sections) {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Fixed smooth scrolling
    function initializeSmoothScrolling() {
        // Handle all anchor links that start with #
        document.addEventListener('click', function(e) {
            const target = e.target.closest('a[href^="#"]');
            if (!target) return;

            const href = target.getAttribute('href');
            if (!href || href === '#') return;

            // Prevent default behavior
            e.preventDefault();

            const targetSection = document.querySelector(href);
            if (targetSection) {
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const offsetTop = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu after navigation
                closeMobileMenu();
            }
        });
    }

    // Contact form functionality
    function initializeContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactFormSubmission);
            
            // Real-time validation
            const formInputs = contactForm.querySelectorAll('input, textarea');
            formInputs.forEach(input => {
                input.addEventListener('blur', validateField);
                input.addEventListener('input', clearFieldError);
            });
        }
    }

    function handleContactFormSubmission(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            subject: formData.get('subject').trim(),
            message: formData.get('message').trim()
        };

        // Validate form
        if (validateForm(data)) {
            // Show success message
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send the data to a server
            console.log('Form data:', data);
        }
    }

    function validateForm(data) {
        let isValid = true;
        
        // Clear previous errors
        clearAllErrors();
        
        // Validate name
        if (!data.name || data.name.length < 2) {
            showFieldError('name', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (!data.subject || data.subject.length < 3) {
            showFieldError('subject', 'Please enter a subject (at least 3 characters)');
            isValid = false;
        }
        
        // Validate message
        if (!data.message || data.message.length < 10) {
            showFieldError('message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }
        
        return isValid;
    }

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const fieldName = field.name;
        
        clearFieldError(fieldName);
        
        switch (fieldName) {
            case 'name':
                if (!value || value.length < 2) {
                    showFieldError(fieldName, 'Name must be at least 2 characters long');
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value || !emailRegex.test(value)) {
                    showFieldError(fieldName, 'Please enter a valid email address');
                }
                break;
            case 'subject':
                if (!value || value.length < 3) {
                    showFieldError(fieldName, 'Subject must be at least 3 characters long');
                }
                break;
            case 'message':
                if (!value || value.length < 10) {
                    showFieldError(fieldName, 'Message must be at least 10 characters long');
                }
                break;
        }
    }

    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        if (!field) return;
        
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        // Remove existing error
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class to field
        field.classList.add('error');
        
        // Create and add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--color-error)';
        errorDiv.style.fontSize = 'var(--font-size-sm)';
        errorDiv.style.marginTop = 'var(--space-4)';
        
        formGroup.appendChild(errorDiv);
    }

    function clearFieldError(fieldName) {
        const field = typeof fieldName === 'string' ? document.getElementById(fieldName) : fieldName.target;
        if (!field) return;
        
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        const errorDiv = formGroup.querySelector('.field-error');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        
        field.classList.remove('error');
    }

    function clearAllErrors() {
        if (!contactForm) return;
        
        const errorElements = contactForm.querySelectorAll('.field-error');
        const errorFields = contactForm.querySelectorAll('.error');
        
        errorElements.forEach(el => el.remove());
        errorFields.forEach(field => field.classList.remove('error'));
    }

    function showFormMessage(message, type) {
        if (!contactForm) return;
        
        // Remove existing message
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.padding = 'var(--space-12) var(--space-16)';
        messageDiv.style.borderRadius = 'var(--radius-base)';
        messageDiv.style.marginBottom = 'var(--space-16)';
        messageDiv.style.fontWeight = 'var(--font-weight-medium)';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = 'var(--color-bg-3)';
            messageDiv.style.color = 'var(--color-success)';
            messageDiv.style.border = '1px solid var(--color-success)';
        } else {
            messageDiv.style.backgroundColor = 'var(--color-bg-4)';
            messageDiv.style.color = 'var(--color-error)';
            messageDiv.style.border = '1px solid var(--color-error)';
        }
        
        // Add message to form
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        // Auto-remove success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }

    // Add scroll animations for elements coming into view
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.timeline-item, .skill-category, .project-card, .achievement-card'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Initialize scroll animations if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        initializeScrollAnimations();
    }

    // Add CSS for error state and animations
    const errorStyles = document.createElement('style');
    errorStyles.textContent = `
        .form-control.error {
            border-color: var(--color-error);
            box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.2);
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .timeline-item, .skill-category, .project-card, .achievement-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(errorStyles);

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Add focus management for accessibility
    navLinks.forEach(link => {
        link.addEventListener('focus', function() {
            if (window.innerWidth <= 768 && navMenu && !navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Print styles (if user wants to print the portfolio)
    window.addEventListener('beforeprint', function() {
        // Ensure all sections are visible for printing
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        closeMobileMenu();
    });
});

// Global utility functions
window.portfolioUtils = {
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 70;
            const offsetTop = section.offsetTop - navbarHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    },

    sendEmail: function(email) {
        window.open(`mailto:${email}`, '_blank');
    },

    callPhone: function(phone) {
        window.open(`tel:${phone}`, '_blank');
    }
};