export function initializeMarquee(marqueeElement, speed) {
    const marqueeContent = marqueeElement.querySelector('.js-marquee-content');

    const cloneContent = marqueeContent.cloneNode(true);
    marqueeElement.appendChild(cloneContent);

    function calculateContentWidth() {
        return marqueeContent.offsetWidth;
    }

    let contentWidth = calculateContentWidth();
    let totalWidth = contentWidth * 2;
    let currentPosition = 0;

    function animateMarquee() {
        currentPosition -= speed;

        if (currentPosition <= -contentWidth) {
            currentPosition += contentWidth;
        }

        marqueeContent.style.transform = `translateX(${currentPosition}px)`;
        cloneContent.style.transform = `translateX(${currentPosition + contentWidth}px)`;

        requestAnimationFrame(animateMarquee);
    }

    animateMarquee();

    window.addEventListener('resize', () => {
        contentWidth = calculateContentWidth();
        totalWidth = contentWidth * 2;
        currentPosition = 0;
    });
}

export function initializeAllMarquees(speed) {
    const marquees = document.querySelectorAll('.js-marquee');

    marquees.forEach(marquee => {
        initializeMarquee(marquee, speed);
    });
}
