"use strict"

export default class Slider {
    #indexSlide = 0;
    #slider = {
        width: 0,
        container: null,
        nav: null,
        btnNext: null,
        btnPrev: null,
        pagination: null,
        length: 0,
    };
    #resizeObserver = null;
    #autoplayInterval = null;
    #currentView = 1;

    constructor(element, options) {
        this.element = element;
        this.options = options;
        this.#currentView = this.options.view || 1;

        this.init();
    }

    init() {
        const slider = document.querySelector(this.element);
        const sliderChild = slider.children[0];

        slider.classList.add('slider');
        sliderChild.classList.add('slider__container');

        this.applyBreakpoints();

        this.#slider.container = slider.querySelector('.slider__container');
        const slides = this.#slider.container.children;
        this.#slider.length = slides.length;
        this.#slider.width = slider.offsetWidth / this.#currentView;

        for (let slide of slides) {
            slide.classList.add('slide');
            slide.style.width = this.#slider.width + 'px';
        }

        this.setTransform(this.#indexSlide);
        this.#slider.container.style.width = `${this.#slider.width * this.#slider.length}px`;

        this.#slider.nav = document.createElement('div');
        this.#slider.nav.className = 'slider__nav';
        slider.append(this.#slider.nav);

        this.createNavButtons();

        if (this.options.dots) {
            this.createPagination();
        }

        this.updateButtonState();

        if (this.options.autoplay.enabled) {
            this.autoplay();
        }

        this.resize();
    }

    destroy() {
        const slider = document.querySelector(this.element);
        const sliderChild = slider.querySelector('.slider__container');
        const slides = sliderChild.children;

        this.setTransform(0);

        slider.classList.remove('slider');
        sliderChild.classList.remove('slider__container');

        for (let slide of slides) {
            slide.classList.remove('slide');
            slide.style.width = '';
        }

        sliderChild.style.width = '';

        if (this.#slider.btnNext) {
            this.#slider.btnNext.removeEventListener('click', this.slideNext);
        }
        if (this.#slider.btnPrev) {
            this.#slider.btnPrev.removeEventListener('click', this.slidePrev);
        }

        if (this.#slider.nav) this.#slider.nav.remove();

        if (this.#autoplayInterval) {
            clearInterval(this.#autoplayInterval);
        }

        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
    }

    resize() {
        this.#resizeObserver = new ResizeObserver(entries => {
            this.applyBreakpoints();
            const slider = document.querySelector(this.element);
            const slides = this.#slider.container.children;
            this.#slider.width = slider.offsetWidth / this.#currentView;
            this.#slider.container.style.width = `${this.#slider.width * this.#slider.length}px`;

            for (let slide of slides) {
                slide.style.width = this.#slider.width + 'px';
            }
        });

        this.#resizeObserver.observe(this.#slider.container);
    }

    setTransform(index) {
        this.#slider.container.style.transform = `translateX(${-index * this.#slider.width}px)`;
    }

    updateButtonState() {
        if (!this.options.infinite) {
            this.#slider.btnPrev.disabled = this.#indexSlide === 0;
            this.#slider.btnNext.disabled = this.#indexSlide === this.#slider.length - 1;
        }
    }

    createNavButtons() {
        this.#slider.btnNext = document.createElement('button');
        this.#slider.btnNext.className = 'slider__button slider__button_next';

        this.#slider.btnPrev = document.createElement('button');
        this.#slider.btnPrev.className = 'slider__button slider__button_prev';

        this.#slider.nav.append(this.#slider.btnNext);
        this.#slider.nav.append(this.#slider.btnPrev);

        this.#slider.btnNext.innerHTML = '<img src="./assets/images/icon-arrow.svg" alt="arrow-right"/>';
        this.#slider.btnPrev.innerHTML = `<img src="./assets/images/icon-arrow.svg" alt="arrow-left"/>`;

        this.#slider.btnNext.addEventListener('click', () => this.slideNext());
        this.#slider.btnPrev.addEventListener('click', () => this.slidePrev());
    }

    createPagination() {
        const pagination = document.createElement('div');
        pagination.className = 'slider__pagination';

        if (this.options.dots.type === 'dots') {
            for (let i = 0; i < this.#slider.length; i++) {
                const dot = document.createElement('button');
                dot.className = 'slider__dot';
                dot.dataset.index = i;
                dot.addEventListener('click', () => this.goToSlide(i));
                pagination.append(dot);
            }
        } else if (this.options.dots.type === 'number') {
            const numberDisplay = document.createElement('div');
            numberDisplay.className = 'slider__number';
            pagination.append(numberDisplay);
        }

        this.#slider.nav.append(pagination);
        this.#slider.pagination = pagination;

        this.updatePagination();
    }

    updatePagination() {
        if (this.options.dots.type === 'dots') {
            const dots = this.#slider.pagination.querySelectorAll('.slider__dot');
            dots.forEach(dot => dot.classList.remove('slider__dot_active'));
            dots[this.#indexSlide].classList.add('slider__dot_active');
        } else if (this.options.dots.type === 'number') {
            const numberDisplay = this.#slider.pagination.querySelector('.slider__number');
            numberDisplay.innerHTML = `${this.#indexSlide + 1} <span>/ ${this.#slider.length}</span>`;
        }
    }

    autoplay() {
        this.#autoplayInterval = setInterval(() => {
            this.slideNext();
        }, this.options.autoplay.interval);
    }

    goToSlide(index) {
        this.#indexSlide = index;
        this.setTransform(this.#indexSlide);
        this.updateButtonState();
        this.updatePagination();
    }

    slideNext() {
        this.#indexSlide += 1;

        if (this.#indexSlide >= this.#slider.length) {
            if (this.options.infinite) {
                this.#indexSlide = 0;
            } else {
                this.#indexSlide = this.#slider.length - 1;
            }
        }

        this.setTransform(this.#indexSlide);
        this.updateButtonState();
        this.updatePagination();
    }

    slidePrev() {
        this.#indexSlide -= 1;

        if (this.#indexSlide < 0) {
            if (this.options.infinite) {
                this.#indexSlide = this.#slider.length - 1;
            } else {
                this.#indexSlide = 0;
            }
        }

        this.setTransform(this.#indexSlide);
        this.updateButtonState();
        this.updatePagination();
    }

    applyBreakpoints() {
        const screenWidth = window.innerWidth;

        if (!this.options.breakpoints) {
            return
        }

        const matchedBreakpoint = Object.keys(this.options.breakpoints)
            .map(bp => parseInt(bp, 10))
            .sort((a, b) => b - a)
            .find(bp => screenWidth <= bp);

        if (matchedBreakpoint) {
            this.#currentView = this.options.breakpoints[matchedBreakpoint].view || this.options.view;
        } else {
            this.#currentView = this.options.view;
        }
    }
}