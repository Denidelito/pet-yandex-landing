// Register SVG icons
import 'virtual:svg-icons-register'

// animations
import { initializeMarquee, initializeAllMarquees } from './animations/marquee.js'

// swiper
import { initializeSwiper, initializeSwiperParticipants, destroySwiper, checkScreenWidth } from './sliders/swiper.js';

document.addEventListener('DOMContentLoaded', function() {
    initializeAllMarquees(.5);

    checkScreenWidth();
});

window.addEventListener('resize', function() {
    checkScreenWidth();
});