const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

/* === SCROLL SUAVE === */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

  /* === CARROSSEL (CORRIGIDO) === */

document.querySelectorAll('.carousel-container').forEach(container => {

    const track = container.querySelector('.carousel-track');
    const slides = container.querySelectorAll('.carousel-slide');
    const nextBtn = container.querySelector('.next');
    const prevBtn = container.querySelector('.prev');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoSlideTimer;

   function updateCarousel() {
    const containerWidth = container.getBoundingClientRect().width;
    track.style.transform = `translate3d(-${currentIndex * containerWidth}px, 0, 0)`;
}

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function startAutoSlide() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(() => {
            nextSlide();
        }, 4500);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideTimer);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide();
        });
    }

    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);

    window.addEventListener('resize', updateCarousel);

    updateCarousel();
    startAutoSlide();
});

/**
 * =========================================
 * TRADUÇÃO (NAV + FOOTER)
 * =========================================
 */
const translations = {
    pt: {
        trajetoria: "Minha trajetória",
        musicas: "Músicas",
        galeria: "Galeria",
        contatos: "Contatos",
        redes: "REDES SOCIAIS E CONTATOS",
        ingresso: "COMPRAR INGRESSO"
    },
    en: {
        trajetoria: "My Journey",
        musicas: "Songs",
        galeria: "Gallery",
        contatos: "Contacts",
        redes: "SOCIAL MEDIA & CONTACTS",
        ingresso: "BUY TICKET"
    },
    es: {
        trajetoria: "Mi Trayectoria",
        musicas: "Música",
        galeria: "Galería",
        contatos: "Contactos",
        redes: "REDES SOCIALES Y CONTACTOS",
        ingresso: "COMPRAR ENTRADA"
    }
};

function changeLanguage(lang) {

    currentLang = lang;

    const t = translations[lang];
    if (!t) return;

    const navLinks = document.querySelectorAll(".nav-links a");

    if (navLinks.length >= 4) {
        navLinks[0].innerText = t.trajetoria;
        navLinks[1].innerText = t.musicas;
        navLinks[2].innerText = t.galeria;
        navLinks[3].innerText = t.contatos;
    }

    const footerTitle = document.querySelector(".footer-content h2");

    if (footerTitle) {
        footerTitle.innerText = t.redes;
    }

    // 🔥 ATUALIZA EVENTOS NO NOVO IDIOMA
    if (typeof loadEvents === "function") {
        loadEvents();
    }
}


document.addEventListener("DOMContentLoaded", () => {
    changeLanguage("pt");
});
