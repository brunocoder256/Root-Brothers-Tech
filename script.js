document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.slide-item');
    let current = 0;

    function slide() {
        // Start exiting the current item
        items[current].classList.remove('active');
        items[current].classList.add('exiting');

        // After transition, switch to next
        setTimeout(() => {
            items[current].classList.remove('exiting');
            current = (current + 1) % items.length;
            items[current].classList.add('active');
        }, 1000); // Match transition duration
    }

    // Start the cycle every 3 seconds
    setInterval(slide, 3000);

    // Services interaction
    const serviceCards = document.querySelectorAll('.service-card');
    const previewContents = document.querySelectorAll('.preview-content');

    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceIndex = this.dataset.service;

            // Remove active class from all cards
            serviceCards.forEach(c => c.classList.remove('active'));

            // Add active class to clicked card
            this.classList.add('active');

            // Hide all preview contents
            previewContents.forEach(content => content.classList.remove('active'));

            // Show the corresponding preview content
            const targetPreview = document.querySelector(`.preview-content[data-preview="${serviceIndex}"]`);
            if (targetPreview) {
                targetPreview.classList.add('active');
            }
        });
    });

    // Portfolio card interaction
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const portfolioDetail = document.querySelector('.portfolio-detail');
    const detailContents = document.querySelectorAll('.detail-content');
    const closeButtons = document.querySelectorAll('.close-detail');

    // Prevent default action on View Project buttons to avoid scrolling to home
    const viewButtons = document.querySelectorAll('.portfolio-card .cta-button');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // The click event will bubble up to the card
        });
    });

    portfolioCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectIndex = this.dataset.index;

            // Remove active class from all cards
            portfolioCards.forEach(c => c.classList.remove('active'));

            // Add active class to clicked card
            this.classList.add('active');

            // Hide all detail contents
            detailContents.forEach(content => content.classList.remove('active'));

            // Show the corresponding detail content
            const targetDetail = document.querySelector(`.detail-content[data-project="${projectIndex}"]`);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }

            // Show the detail panel
            portfolioDetail.classList.add('active');

            // Reorder cards: active card first, then others in original order
            const container = document.querySelector('.portfolio-cards');
            const cardsArray = Array.from(portfolioCards);

            // Sort cards: active first, then by original index
            cardsArray.sort((a, b) => {
                if (a === this) return -1;
                if (b === this) return 1;
                return parseInt(a.dataset.index) - parseInt(b.dataset.index);
            });

            // Re-append cards in new order
            cardsArray.forEach(card => {
                container.appendChild(card);
            });

            // Update positions after reordering
            setTimeout(() => {
                cardsArray.forEach((card, index) => {
                    card.style.top = `${index * 80}px`;
                    card.style.left = `${index * 20}px`;
                    card.style.transform = `translateX(${index * 10}px)`;
                    if (card.classList.contains('active')) {
                        card.style.transform += ' scale(1.05)';
                        card.style.zIndex = '10';
                    } else {
                        card.style.zIndex = '1';
                    }
                });
            }, 10);
        });
    });

    // Close detail panel
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            portfolioDetail.classList.remove('active');
            // Remove active class from all cards
            portfolioCards.forEach(c => c.classList.remove('active'));
            // Add active to first card
            portfolioCards[0].classList.add('active');
        });
    });

    // Gallery slider functionality
    const gallerySliders = document.querySelectorAll('.gallery-slider');

    gallerySliders.forEach(slider => {
        const images = slider.querySelector('.gallery-images');
        const prevBtn = slider.querySelector('.gallery-prev');
        const nextBtn = slider.querySelector('.gallery-next');
        let currentIndex = 0;

        function updateSlider() {
            const translateX = -currentIndex * 100;
            images.style.transform = `translateX(${translateX}%)`;
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.children.length - 1;
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < images.children.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });
    });

    // Contact section animations on scroll
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const contactElements = entry.target.querySelectorAll('.info-block, .contact-cta');
                contactElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.1 });

    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');

    if (hamburger && navUl) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navUl.classList.toggle('show');
        });

        // Close menu when clicking on a link
        navUl.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                hamburger.classList.remove('active');
                navUl.classList.remove('show');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navUl.contains(e.target)) {
                hamburger.classList.remove('active');
                navUl.classList.remove('show');
            }
        });
    }

    // Dropdown menu functionality
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        // Check if device is mobile
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Mobile: click to toggle
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                dropdownMenu.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdownToggle.closest('.dropdown').contains(e.target)) {
                    dropdownMenu.classList.remove('show');
                }
            });
        } else {
            // Desktop: hover to show/hide
            const dropdown = dropdownToggle.closest('.dropdown');

            dropdown.addEventListener('mouseenter', function() {
                dropdownMenu.classList.add('show');
            });

            dropdown.addEventListener('mouseleave', function() {
                dropdownMenu.classList.remove('show');
            });
        }
    }

    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;

            // Remove active class from all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to the clicked FAQ item
            faqItem.classList.add('active');
        });
    });

    // About section scroll-triggered animations
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const aboutText = entry.target.querySelector('.about-text');
                const aboutImages = entry.target.querySelector('.about-images');

                // Add animation classes with slight delay for staggered effect
                setTimeout(() => {
                    aboutText.classList.add('animate');
                }, 200);

                setTimeout(() => {
                    aboutImages.classList.add('animate');
                }, 400);

                aboutObserver.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.3 });

    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    // Team Skills progress bar animations
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const skillValue = bar.getAttribute('data-skill');
                        bar.style.width = skillValue + '%';
                    }, index * 200); // Stagger animations
                });
                skillsObserver.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.5 });

    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        skillsObserver.observe(member);
    });
});
