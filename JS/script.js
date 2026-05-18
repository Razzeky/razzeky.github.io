/**
 * Otimização e Inicialização Geral
 */
document.addEventListener('DOMContentLoaded', () => {
    
    /* === 1. PERFORMANCE DE SCROLL === */
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

    /* === 2. LINKS INTERNOS === */
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

    /* === 3. CARROSSEL DE FOTOS (CORRIGIDO) === */
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    let currentIndex = 0;
    let autoSlideTimer; // Variável para armazenar o controle do tempo

    function updateCarousel() {
        if (track) {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        updateCarousel();
    }

    // Função para iniciar/reiniciar o temporizador automático
    function startAutoSlide() {
        clearInterval(autoSlideTimer); // Limpa o timer anterior para evitar loops duplicados
        autoSlideTimer = setInterval(nextSlide, 2000); // Passa a cada 2 segundos
    }

    // Eventos dos botões (com reset do tempo automático)
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide(); // Reinicia o contador para não pular logo em seguida
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide(); // Reinicia o contador
        });
    }

    // Inicia o carrossel automático assim que a página carrega
    if (slides.length > 0) {
        startAutoSlide();
    }
});


/* ============================================================
   TRADUÇÃO DO SITE
   ============================================================ */
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
}


/* ============================================================
   PARTÍCULAS (tsParticles)
   ============================================================ */
window.addEventListener("load", async () => {
    if (typeof tsParticles !== "undefined") {
        await tsParticles.load({
            id: "particles-js",
            options: {
                background: {
                    color: "transparent"
                },
                fpsLimit: 60,
                particles: {
                    number: {
                        value: 60
                    },
                    color: {
                        value: ["#ff00aa", "#7c3aed", "#00ffff"]
                    },
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
                    opacity: {
                        value: 0.3
                    },
                    size: {
                        value: { min: 1, max: 4 }
                    }
                },
                detectRetina: true
            }
        });
    }
});
