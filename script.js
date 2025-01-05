// Utility Functions
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Main Initialization
document.addEventListener('DOMContentLoaded', function () {
    initializeAccordion();
    initializeSearch();
    initializeProductCards();
    initializeCarousel();
    initializeNewsletter();
    initializeCategories();
    initializeLazyLoading();
    initializeMobileMenu();
    initializeHeaderEffects();
    initializeRegionsTable();
});

// Accordion Functionality
function initializeAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-btn');
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            document.querySelectorAll('.accordion-content')
                .forEach(item => item.style.maxHeight = null);
            if (!content.style.maxHeight) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-btn');

    searchInput.addEventListener('focus', () => 
        searchInput.parentElement.style.boxShadow = '0 0 0 2px var(--accent-color)');
    searchInput.addEventListener('blur', () => 
        searchInput.parentElement.style.boxShadow = 'none');
    searchInput.addEventListener('input', debounce(() => 
        console.log('Searching:', searchInput.value), 300));

    if (searchBtn) {
        searchBtn.addEventListener('mouseenter', () => 
            searchBtn.style.borderRadius = '20px');
        searchBtn.addEventListener('mouseleave', () => 
            searchBtn.style.borderRadius = '50%');
    }
}

// Product Cards
function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.2s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Carousel
function initializeCarousel() {
    const carousel = document.querySelector('.occasion-cards');
    const prevButton = document.querySelector('.scrl-btn.prev');
    const nextButton = document.querySelector('.scrl-btn.next');

    if (carousel && prevButton && nextButton) {
        const scrollAmount = 300;

        function updateButtonVisibility() {
            const isAtStart = carousel.scrollLeft === 0;
            const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth;
            prevButton.style.opacity = isAtStart ? '0.5' : '1';
            prevButton.style.cursor = isAtStart ? 'not-allowed' : 'pointer';
            nextButton.style.opacity = isAtEnd ? '0.5' : '1';
            nextButton.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
        }

        nextButton.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            updateButtonVisibility();
        });

        prevButton.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            updateButtonVisibility();
        });

        carousel.addEventListener('scroll', updateButtonVisibility);
        updateButtonVisibility();
    }
}

// Newsletter
function initializeNewsletter() {
    const form = document.querySelector('.subscribe');
    const emailInput = form?.querySelector('input[type="email"]');
    const submitButton = form?.querySelector('button');

    submitButton?.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (email && email.includes('@') && email.includes('.')) {
            alert('Thank you for subscribing!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address');
        }
    });
}

//Categories
function initializeCategories() {
    const dropdownBtn = document.querySelector('.categories-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const parentItems = document.querySelectorAll('.dropdown-item.parent');

    let activeSubmenu = null;

    // Toggle the main dropdown menu
    dropdownBtn?.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropdownMenu?.classList.toggle('active');

        if (activeSubmenu) {
            activeSubmenu.style.display = 'none';
            activeSubmenu = null;
        }
    });

    parentItems.forEach((item) => {
        const submenu = item.querySelector('.submenu');
        item.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (activeSubmenu && activeSubmenu !== submenu) {
                activeSubmenu.style.display = 'none';
            }

            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                activeSubmenu = submenu.style.display === 'block' ? submenu : null;
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (!dropdownMenu?.contains(e.target) && !dropdownBtn?.contains(e.target)) {
            dropdownMenu?.classList.remove('active');
            if (activeSubmenu) {
                activeSubmenu.style.display = 'none';
                activeSubmenu = null;
            }
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            dropdownMenu?.classList.remove('active');
            if (activeSubmenu) {
                activeSubmenu.style.display = 'none';
                activeSubmenu = null;
            }
        }
    });
}

// Lazy Loading
function initializeLazyLoading() {
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
    }, { threshold: 0, rootMargin: '0px 0px 50px 0px' });

    document.querySelectorAll('img[data-src]')
        .forEach(img => imageObserver.observe(img));
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const categoriesNav = document.querySelector('.categories-nav');

    mobileMenuButton?.addEventListener('click', () => 
        categoriesNav?.classList.toggle('show'));
}

// Header Effects
function initializeHeaderEffects() {
    const headerButtons = document.querySelectorAll('.nav-right button');
    headerButtons.forEach(button => {
        const tooltip = button.querySelector('.hover-text');
        if (tooltip) {
            button.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            });
            button.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            });
        }
    });
}

// Regions Table
function initializeRegionsTable() {
    const regionsLink = document.getElementById('regions-link');
    const regionsTable = document.getElementById('regions-table');
    const closeBtn = document.getElementById('close-btn');

    if (regionsLink && regionsTable && closeBtn) {
        regionsLink.addEventListener('click', function(e) {
            e.preventDefault();
            regionsTable.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', function() {
            regionsTable.style.display = 'none';
            document.body.style.overflow = '';
        });

        regionsTable.addEventListener('click', function(e) {
            if (e.target === regionsTable) {
                regionsTable.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
}
