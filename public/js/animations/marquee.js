const marquee = document.querySelector('.js-marquee');
const marqueeContent = document.querySelector('.js-marquee-content');
const cloneContent = marqueeContent.cloneNode(true);
marquee.appendChild(cloneContent);

const contentWidth = marqueeContent.offsetWidth;

const totalWidth = contentWidth * 2;

let currentPosition = 0;

export function animateMarquee(speed) {
    currentPosition -= speed;

    if (currentPosition <= -contentWidth) {
        currentPosition += contentWidth;
    }

    marqueeContent.style.transform = `translateX(${currentPosition}px)`;
    cloneContent.style.transform = `translateX(${currentPosition + contentWidth}px)`;

    requestAnimationFrame(() => animateMarquee(speed));
}
