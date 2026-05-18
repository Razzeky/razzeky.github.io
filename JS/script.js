/**
 * Otimização 
 */
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    let isScrolling = false;

    // performance de scroll
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // links internos 
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
});


/**
 * carrosel de fotos
 */


const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    currentIndex++;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }

    updateCarousel();
});

/* Auto slide */

setInterval(() => {
    currentIndex++;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    updateCarousel();
}, 5000);



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

    document.querySelectorAll(".nav-links a")[0].innerText = t.trajetoria;
    document.querySelectorAll(".nav-links a")[1].innerText = t.musicas;
    document.querySelectorAll(".nav-links a")[2].innerText = t.galeria;
    document.querySelectorAll(".nav-links a")[3].innerText = t.contatos;

    document.querySelector(".footer-content h2").innerText = t.redes;
}





window.addEventListener("load", async () => {

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

});
```
