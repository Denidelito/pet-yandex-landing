import Swiper from 'swiper';
import {Navigation, Pagination, Autoplay} from "swiper/modules";
import "swiper/swiper-bundle.css";

let swiper = null;
let swiperParticipants = null;

export function initializeSwiper() {
    const swiperElement = document.querySelector('.js-swiper');

    if (swiperElement && !swiper) {
        swiper = new Swiper(swiperElement, {
            modules: [Navigation, Pagination],
            grabCursor: true,
            slidesPerView: 1,
            mousewheel: true,
            loop: false,
            speed: 800,
            navigation: {
                nextEl: '.js-swiper-button-next',
                prevEl: '.js-swiper-button-prev',
            },
            pagination: {
                el: '.js-swiper-pagination',
                clickable: true,
                type: 'bullets',
            },
            wrapperClass: 'js-swiper-wrapper',
            slideClass: 'js-swiper-slide',
        });
    }
}

export function initializeSwiperParticipants() {
    const swiperElementParticipants = document.querySelector('.js-swiperParticipants');

    if (swiperElementParticipants && !swiperParticipants) {
        swiperParticipants = new Swiper(swiperElementParticipants, {
            modules: [Navigation, Pagination, Autoplay],
            grabCursor: true,
            autoplay: {
                delay: 4000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            speed: 800,
            slidesPerView: 1,
            mousewheel: true,
            loop: true,
            navigation: {
                nextEl: '.js-swiperParticipants-button-next',
                prevEl: '.js-swiperParticipants-button-prev',
            },
            pagination: {
                el: '.js-swiperParticipants-pagination',
                clickable: true,
                type: 'fraction',
            },
            wrapperClass: 'js-swiperParticipants-wrapper',
            slideClass: 'js-swiperParticipants-slide',
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
            },
        });
    }
}

export function destroySwiper() {
    if (swiper) {
        swiper.destroy();
        swiper = null;
    }
}

export function checkScreenWidth() {
    const isMobile = window.outerWidth <= 768|| window.innerWidth <= 768;

    initializeSwiperParticipants();

    if (isMobile) {
        initializeSwiper();
    } else {
        destroySwiper();
    }
}