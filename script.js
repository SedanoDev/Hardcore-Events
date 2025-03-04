// Selección de elementos del DOM
const navLinks = document.querySelectorAll('.nav-link');
const mobileToggle = document.querySelector('.nav-mobile-btn');
const navMenu = document.querySelector('.nav-menu');
const carouselContainers = document.querySelectorAll('.carousel-container');

// Función para desplazamiento suave en navegación
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Alternar menú móvil
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Funcionalidad del carrusel
carouselContainers.forEach(container => {
    const grid = container.querySelector('.event-grid');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    const cardWidth = 300; // Ancho de cada tarjeta
    const gap = 32; // Gap de 2rem (32px)
    let scrollAmount = cardWidth + gap; // Move one card at a time

    // Adjust scroll amount for mobile devices
    const updateScrollAmount = () => {
        if (window.innerWidth <= 768) {
            scrollAmount = cardWidth + gap; // Move one card at a time for mobile
        } else {
            scrollAmount = (cardWidth + gap) * 3; // Move three cards at a time for larger screens
        }
    };

    updateScrollAmount();
    window.addEventListener('resize', updateScrollAmount);

    prevBtn.addEventListener('click', () => {
        grid.scrollLeft -= scrollAmount;
    });

    nextBtn.addEventListener('click', () => {
        grid.scrollLeft += scrollAmount;
    });

    // Actualizar estado de los botones
    const updateButtons = () => {
        prevBtn.disabled = grid.scrollLeft <= 0;
        nextBtn.disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth;
    };

    grid.addEventListener('scroll', updateButtons);
    updateButtons(); // Estado inicial
});