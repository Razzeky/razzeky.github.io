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