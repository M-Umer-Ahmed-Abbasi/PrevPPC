document.addEventListener("DOMContentLoaded", function () {
    // Hamburger Menu
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Toggle hamburger menu and dropdown
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        dropdownMenu.classList.toggle('show-dropdown');
    });

    // Close dropdown when clicking outside or on a menu item
    document.addEventListener('click', (event) => {
        if (!hamburgerMenu.contains(event.target) && !dropdownMenu.contains(event.target)) {
            hamburgerMenu.classList.remove('active');
            dropdownMenu.classList.remove('show-dropdown');
        }
    });

    // Update menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            hamburgerMenu.classList.remove('active');
            dropdownMenu.classList.remove('show-dropdown');
        }
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.hero-slider');
    const paginationDots = document.querySelector('.pagination-dots');
    let currentSlide = 0;
    const prevSlide = document.querySelector('.prev-slide');
    const nextSlide = document.querySelector('.next-slide');

    function showSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        updatePagination(index);
    }

    function updatePagination(index) {
        const dots = document.querySelectorAll('.pagination-dots span');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    prevSlide.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    nextSlide.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    setInterval(() => {
        nextSlide.click();
    }, 5000);

    showSlide(currentSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide.click();
        } else if (e.key === 'ArrowRight') {
            nextSlide.click();
        }
    });

    // Initialize pagination dots
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
        });
        paginationDots.appendChild(dot);
    });

    // Set the initial pagination
    updatePagination(currentSlide);

    // Intersection Observer for animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            setTimeout(() => {
                entry.target.classList.toggle('show', entry.isIntersecting);

                // Update counter if it exists within the target
                const counter = entry.target.querySelector('.number');
                if (counter) {
                    updateCount(counter);
                }
            }, index * 200); // Delay each animation by 200ms
        });
    }, { threshold: 0.1 });

    // Elements to observe
    const elementsToObserve = [
        ...document.querySelectorAll('.slide'),
        ...document.querySelectorAll('.cube'),
        ...document.querySelectorAll('.btn'),
        ...document.querySelectorAll('.floating-images'),
        ...document.querySelectorAll('.counter-box.animated'),
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.case-study'),
        ...document.querySelectorAll('.testimonial'),
        ...document.querySelectorAll('.brochure-box'),
        ...document.querySelectorAll('.faq')
    ];
    elementsToObserve.forEach(element => observer.observe(element));

    // Scroll to top button functionality
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            scrollToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Counter functionality
    function updateCount(counter) {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/[^0-9]/g, '');
        const increment = 1;
        const formattedTarget = formatNumber(target);

        if (count < 105 && count < target) {
            counter.innerText = formatNumber(Math.ceil(count + increment));
            setTimeout(() => updateCount(counter), 30);
        } else if (count < target) {
            counter.innerText = formattedTarget;
            counter.classList.add('formatted');
        } else {
            counter.innerText = formattedTarget;
            if (counter.parentElement.querySelector('.label').textContent.includes('Clients')) {
                counter.innerText += '+';
            } else if (counter.parentElement.querySelector('.label').textContent.includes('Growth')) {
                counter.innerText += 'X';
            }
        }
    }

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num;
        }
    }

    // Parallax Effect for Background Text
    document.addEventListener('scroll', function () {
        const bgText = document.querySelector('.bg-text');
        const scrollPosition = window.pageYOffset;
        bgText.style.transform = `translateX(${scrollPosition * 0.2}px)`;
    });

    // FAQ Toggle
    document.querySelectorAll('.faq').forEach(faq => {
        faq.addEventListener('click', () => {
            faq.classList.toggle('active');
        });
    });

    // scripts.js

// Toggle the display of case study details
document.querySelectorAll('.explore-button').forEach(button => {
    button.addEventListener('click', function() {
        const details = this.nextElementSibling;
        if (details.style.display === 'block') {
            details.style.display = 'none';
            this.textContent = 'Explore More';
        } else {
            details.style.display = 'block';
            this.textContent = 'Explore Less';
        }
    });
});

// Example charts using Chart.js
const ctx1 = document.getElementById('chart1').getContext('2d');
const chart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Sales', 'ACoS', 'ROAS'],
        datasets: [{
            label: 'May 2024 Performance',
            data: [25, -10, 20], // Sample data
            backgroundColor: ['#4CAF50', '#FF5722', '#FFC107'],
            borderColor: ['#388E3C', '#D84315', '#FFA000'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctx2 = document.getElementById('chart2').getContext('2d');
const chart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Impressions', 'Sales', 'CPC'],
        datasets: [{
            label: 'Last Week Performance',
            data: [30, 40, -5], // Sample data
            backgroundColor: '#03A9F4',
            borderColor: '#0288D1',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctx3 = document.getElementById('chart3').getContext('2d');
const chart3 = new Chart(ctx3, {
    type: 'pie',
    data: {
        labels: ['Sales Growth', 'ACoS Stability', 'ROAS Consistency'],
        datasets: [{
            label: 'Lifetime Performance',
            data: [50, 20, 5], // Sample data
            backgroundColor: ['#E91E63', '#9C27B0', '#3F51B5'],
            borderColor: ['#C2185B', '#7B1FA2', '#303F9F'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});

});
