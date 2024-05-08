// Register SVG icons
import 'virtual:svg-icons-register'

// animations
import { initializeMarquee, initializeAllMarquees } from './animations/marquee.js'
import { initializeSmoothScroll } from './animations/scroll.js'
// swiper
import { initializeSwiper, initializeSwiperParticipants, destroySwiper, checkScreenWidth } from './sliders/swiper.js';

document.addEventListener('DOMContentLoaded', function() {
    initializeAllMarquees(.5);
    initializeSmoothScroll();
    checkScreenWidth();
});

window.addEventListener('resize', function() {
    checkScreenWidth();
});

