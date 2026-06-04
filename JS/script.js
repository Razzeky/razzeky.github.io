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

/* === CARROSSEL === */
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
 * SISTEMA DE TRADUÇÃO ATUALIZADO (POR IDS)
 * =========================================
 */
const translations = {
    pt: {
        redes: "REDES SOCIAIS E CONTATOS",
        contratacoes: "CONTRATAÇÕES PARA SHOWS",
        marketing: "CAMPANHAS, MARKETING E PUBLICIDADE",
        email: "contato.razzeky@outlook.com",
        contatoLabel: "Contato",
        proximosEventos: "PRÓXIMOS EVENTOS"
    },
    en: {
        redes: "SOCIAL MEDIA & CONTACTS",
        contratacoes: "SHOW BOOKINGS",
        marketing: "CAMPAIGNS, MARKETING & ADVERTISING",
        email: "contact.razzeky@outlook.com",
        contatoLabel: "Contact",
        proximosEventos: "UPCOMING EVENTS"
    },
    es: {
        redes: "REDES SOCIALES Y CONTACTOS",
        contratacoes: "CONTRATACIONES PARA SHOWS",
        marketing: "CAMPAÑAS, MARKETING Y PUBLICIDAD",
        email: "contacto.razzeky@outlook.com",
        contatoLabel: "Contacto",
        proximosEventos: "PRÓXIMOS EVENTOS"
    }
};

function changeLanguage(lang) {
    window.currentLang = lang;

    const t = translations[lang];
    if (!t) return;

    // Tradução cirúrgica pelos IDs do HTML
    const elEventos = document.getElementById("id-eventos");
    const elContratacoes = document.getElementById("id-contratacoes");
    const elMarketing = document.getElementById("id-marketing");
    const elRedes = document.getElementById("id-redes");

    if (elEventos) elEventos.innerText = t.proximosEventos;
    if (elContratacoes) elContratacoes.innerText = t.contratacoes;
    if (elMarketing) elMarketing.innerText = t.marketing;
    if (elRedes) elRedes.innerText = t.redes;

    // Traduz textos menores internos (Emails e fones)
    document.querySelectorAll(".contact-card p").forEach(p => {
        if (p.innerText.includes("contato.razzeky") || p.innerText.includes("contact.razzeky")) {
            p.innerText = t.email;
        }
        if (p.innerText.includes("Contato:") || p.innerText.includes("Contact:") || p.innerText.includes("Contacto:")) {
            const content = p.innerText.split(":")[1] || ""; 
            p.innerText = t.contatoLabel + ":" + content;
        }
    });

    // Dispara a atualização do eventos.js
    if (typeof loadEvents === "function") {
        loadEvents();
    }
}

/* === OTIMIZAÇÃO DE CARREGAMENTO DE IMAGENS === */
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (!img.getAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
                img.style.opacity = "1";
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = "0";
        img.style.transition = "opacity 0.5s ease-in-out";
        imageObserver.observe(img);
    });
});
