// Register SVG icons
import 'virtual:svg-icons-register'

// animations
import {animateMarquee} from "./animations/marquee.js";
animateMarquee(.5);


// swiper
import { initializeSwiper, destroySwiper, checkScreenWidth } from './sliders/swiper.js';

document.addEventListener('DOMContentLoaded', function() {
    checkScreenWidth();
});

window.addEventListener('resize', function() {
    checkScreenWidth();
});