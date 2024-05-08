import Swiper from 'swiper';
import {Navigation, Pagination} from "swiper/modules";
import "swiper/swiper-bundle.css";

let swiper = null;

export function initializeSwiper() {
    const swiperElement = document.querySelector('.js-swiper');

    if (swiperElement && !swiper) {
        swiper = new Swiper(swiperElement, {
            modules: [Navigation, Pagination],
            grabCursor: true,
            slidesPerView: 1,
            mousewheel: true,
            loop: false,
            navigation: {
                nextEl: '.js-swiper-button-next',
                prevEl: '.js-swiper-button-prev',
            },
            pagination: {
                el: '.js-swiper-pagination',
                clickable: true,
            },
            wrapperClass: 'js-swiper-wrapper',
            slideClass: 'js-swiper-slide',

            breakpoints: {
                768: {
                    slidesPerView: 1,
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
    console.log(document.outerWidth)
    if (isMobile) {
        initializeSwiper();
    } else {
        destroySwiper();
    }
}