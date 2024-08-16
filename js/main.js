"use strict";

import { initRunningLine } from "./components/running-line.js";
import Slider from "./slider/slider.js";

const optionsSliderSteps = {
    infinite: false,
    autoplay: {
        enabled: false,
        interval: 2000,
    },
    dots: {
        type: 'dots',
    },
}
const optionsSliderParticipants = {
    infinite: true,
    autoplay: {
        enabled: false,
        interval: 2000,
    },
    dots: {
        type: 'number',
    },
    view: 3,
    breakpoints: {
        998: {
            view: 1,
        },
    }
}
let sliderSteps = null;
let sliderParticipants = new Slider('#slider-participants', optionsSliderParticipants);

function checkSliderInitialization() {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 998 && !sliderSteps) {
        sliderSteps = new Slider('#steps-slider', optionsSliderSteps);
    } else if (windowWidth > 998 && sliderSteps) {
        sliderSteps.destroy();
        sliderSteps = null;
    }
}

checkSliderInitialization();

window.addEventListener('resize', checkSliderInitialization);
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация бегущей строки с id 'running-line' и скоростью 1
    initRunningLine('running-line', .5);
    initRunningLine('running-line2', .5);
});