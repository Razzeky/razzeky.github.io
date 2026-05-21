/**
 * =========================================
 * CONTROLE GLOBAL DE IDIOMA
 * =========================================
 */
let currentLang = "pt";

function getText(key) {

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
        }

    };

    return translations[key][currentLang] || translations[key]["pt"];
}


/**
 * =========================================
 * OTIMIZAÇÃO E INICIALIZAÇÃO
 * =========================================
 */
document.addEventListener('DOMContentLoaded', () => {

    /* === NAVBAR SCROLL === */
    const navbar = document.querySelector('.navbar');
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                isScrolling = false;
            });
            isScrolling = true;
        }
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
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    let currentIndex = 0;
    let autoSlideTimer;

    function updateCarousel() {
        if (track) {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
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
        autoSlideTimer = setInterval(nextSlide, 4000);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide();
        });
    }

    if (slides.length > 0) {
        startAutoSlide();
    }

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


/**
 * =========================================
 * PARTÍCULAS
 * =========================================
 */
window.addEventListener("load", async () => {

    if (typeof tsParticles !== "undefined") {

        await tsParticles.load({
            id: "particles-js",
            options: {
                background: { color: "transparent" },
                fpsLimit: 60,
                particles: {
                    number: { value: 60 },
                    color: { value: ["#ff00aa", "#7c3aed", "#00ffff"] },
                    links: {
                        enable: true,
                        color: "#ff00aa",
                        distance: 140,
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1.5
                    },
                    opacity: { value: 0.3 },
                    size: { value: { min: 1, max: 4 } }
                },
                detectRetina: true
            }
        });

    }

});
