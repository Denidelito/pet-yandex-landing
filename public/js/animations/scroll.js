function smoothScroll(target, duration = 800) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    }
}

function handleLinkClick(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение ссылки
    const link = event.currentTarget;
    const target = link.getAttribute('href');
    if (target && target.startsWith('#')) {
        smoothScroll(target);
    }
}

export function initializeSmoothScroll() {
    const links = document.querySelectorAll('a.js-link');

    links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
}
