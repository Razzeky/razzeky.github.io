/**
 * =========================================
 * CONTROLE GLOBAL DE IDIOMA
 * =========================================
 */
let currentLang = "pt";

const translations = {

    buy: {
        pt: "COMPRAR INGRESSO",
        en: "BUY TICKETS",
        es: "COMPRAR ENTRADA"
    },

    soon: {
        pt: "EM BREVE",
        en: "COMING SOON",
        es: "PRÓXIMAMENTE"
    },

    trajetoria: {
        pt: "Minha trajetória",
        en: "My Journey",
        es: "Mi Trayectoria"
    },

    musicas: {
        pt: "Músicas",
        en: "Songs",
        es: "Música"
    },

    galeria: {
        pt: "Galeria",
        en: "Gallery",
        es: "Galería"
    },

    contatos: {
        pt: "Contatos",
        en: "Contacts",
        es: "Contactos"
    },

    redes: {
        pt: "REDES SOCIAIS E CONTATOS",
        en: "SOCIAL MEDIA & CONTACTS",
        es: "REDES SOCIALES Y CONTACTOS"
    }
};


function getText(key) {
    return translations[key]?.[currentLang] || translations[key]?.pt || "";
}

function changeLanguage(lang) {

    currentLang = lang;

    const navLinks = document.querySelectorAll(".nav-links a");

    if (navLinks.length >= 4) {
        navLinks[0].innerText = getText("trajetoria");
        navLinks[1].innerText = getText("musicas");
        navLinks[2].innerText = getText("galeria");
        navLinks[3].innerText = getText("contatos");
    }

    const footerTitle = document.querySelector(".footer-content h2");

    if (footerTitle) {
        footerTitle.innerText = getText("redes");
    }

    if (typeof loadEvents === "function") {
        loadEvents();
    }
}

document.addEventListener('DOMContentLoaded', () => {

const navbar = document.querySelector('.navbar'); // 👈 ADICIONADO

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

  /* === CARROSSEL === */

document.querySelectorAll('.carousel-container').forEach(container => {

    const track = container.querySelector('.carousel-track');
    const slides = container.querySelectorAll('.carousel-slide');
    const nextBtn = container.querySelector('.next');
    const prevBtn = container.querySelector('.prev');

    let currentIndex = 0;
    let autoSlideTimer;
    
function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}
   function updateCarousel() {
    const slideWidth = container.clientWidth;
    track.style.transform = `translate3d(-${currentIndex * slideWidth}px, 0, 0)`;
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
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }, 4500);
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

    if (slides.length > 0) {
        updateCarousel();
        startAutoSlide();
    }
container.addEventListener('mouseenter', () => {
    clearInterval(autoSlideTimer);
});

container.addEventListener('mouseleave', startAutoSlide);

window.addEventListener('resize', updateCarousel);
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
        redes: "REDES SOCIAIS E CONTATOS"
    },
    en: {
        trajetoria: "My Journey",
        musicas: "Songs",
        galeria: "Gallery",
        contatos: "Contacts",
        redes: "SOCIAL MEDIA & CONTACTS"
    },
    es: {
        trajetoria: "Mi Trayectoria",
        musicas: "Música",
        galeria: "Galería",
        contatos: "Contactos",
        redes: "REDES SOCIALES Y CONTACTOS"
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
