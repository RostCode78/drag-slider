const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const log = console.log;

const slider = $('#slider_container');
const items = $$('.item');
let elementStyle = window.getComputedStyle(slider).getPropertyValue('width');
let isDown = false;
let startX, scrollLeft, walk, nextTarget;
let position = 0;
let mouseMove = false;
let width = elementStyle.slice(0,-2);
let target = 0;
slider.scrollLeft = 0;

// Variables para auto-slider
let direction = true; // True = Next - False = Prev
let autoSlider = true;
let count = 1;

let autoSliderInterval = () => {

    if ( count == 1 ) {
        direction = true;
    } else if ( count >= items.length ) {
        direction = false;
    }

    if ( direction ) {
        count++;
        position++;
        target = position;
        slider.scrollLeft = width * target;
        nextTarget = width * target;
    } else {
        count--;
        position--;
        target = position;
        slider.scrollLeft = width * target;
        nextTarget = width * target;
    }

};

let counter = setInterval(autoSliderInterval, 5000);

let stopInterval = () => {
    clearInterval(counter);
};

let restartInterval = () => {
    clearInterval(counter);
    counter = setInterval(autoSliderInterval, 5000);
}

slider.addEventListener('pointerdown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.style.scrollBehavior = 'inherit';
    mouseMove = false;
    stopInterval();
});

slider.addEventListener('pointerleave', () => {
    isDown = false;
    slider.classList.remove('active');
    slider.style.scrollBehavior = 'smooth';

    if ( position == 0 && walk > 0 ) {
        mouseMove = false;
        return;
    }

    if ( mouseMove ) {
        if ( slider.scrollLeft < width && position == 0 ) {

            position++;
            target = position;
            slider.scrollLeft = width * target;
            nextTarget = width * target;

        } else if ( slider.scrollLeft < nextTarget && position == target ) {

            position--;
            target = position;
            slider.scrollLeft = width * target;
            nextTarget = width * target;
            direction = false;

        } else if ( slider.scrollLeft > nextTarget && position == target ) {

            position++;
            target = position;
            slider.scrollLeft = width * target;
            nextTarget = width * target;
            direction = true;

        }
    }
    
    mouseMove = false;
    count = target + 1;
    restartInterval();
});

slider.addEventListener('pointerup', () => {
    isDown = false;
    slider.classList.remove('active');
    slider.style.scrollBehavior = 'smooth';

    if ( position == 0 && walk > 0 ) {
        mouseMove = false;
        return;
    }

    if ( mouseMove ) {
        if ( slider.scrollLeft < width && position == 0 ) {

            position++;
            target = position;
            slider.scrollLeft = width * target;
            nextTarget = width * target;

        } else if ( slider.scrollLeft < nextTarget && position == target ) {

            position--;
            target = position;
            slider.scrollLeft = width * target;
            nextTarget = width * target;
            direction = false;

        } else if ( slider.scrollLeft > nextTarget && position == target ) {

            position++;
            target = position;
            slider.scrollLeft = width * target;
            nextTarget = width * target;
            direction = true;

        }
    }

    mouseMove = false;
    count = target + 1;
    restartInterval();
});

slider.addEventListener('pointermove', (e) => {
    if (!isDown) return; // stop the fn from running
    e.preventDefault();
    mouseMove = true;
    const x = e.pageX - slider.offsetLeft;
    walk = (x - startX) * 1;
    slider.scrollLeft = scrollLeft - walk;
});