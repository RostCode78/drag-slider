const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const log = console.log;

const slider = $('#slider_container');
const items = $$('.item');
let elementStyle = window.getComputedStyle(slider).getPropertyValue('width');
let isDown = false;
let startX;
let scrollLeft;
let walk;
let position = 0;
let mouseMove = false;
let width = elementStyle.slice(0,-2);
let target = 0;
let nextTarget;
slider.scrollLeft = 0;

const intervalFunction = () => {

    slider.style.scrollBehavior = 'smooth';

    if ( intervalCount == 1 ) {
        subir = true;
    } else if ( intervalCount >= items.length ) {
        subir = false;
    }

    if( subir ) {

        intervalCount++;

        position++;
        target = position;
        slider.scrollLeft = width * target;
        nextTarget = width * target;

    } else {

        intervalCount--;

        position--;
        target = position;
        slider.scrollLeft = width * target;
        nextTarget = width * target;

    }

}

let auto = setInterval(intervalFunction, 5000); // Ejecuta el setInterval

slider.addEventListener('pointerdown', (e) => {
    clearInterval(auto);
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.style.scrollBehavior = 'inherit';
    mouseMove = false;
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
            subir = false;

        } else if ( slider.scrollLeft > nextTarget && position == target ) {

            position++;
            target = position;
            slider.scrollLeft = width * target;
            nextTarget = width * target;
            subir = true;

        }
    }
    
    mouseMove = false;
    intervalCount = target + 1;
    auto = setInterval(intervalFunction, 5000); // Retorna el setInterval
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
            log('start');

        } else if ( slider.scrollLeft < nextTarget && position == target ) {

            position--;
            target = position;
            slider.scrollLeft = width * target;
            nextTarget = width * target;
            log('prev');
            subir = false;

        } else if ( slider.scrollLeft > nextTarget && position == target ) {

            position++;
            target = position;
            slider.scrollLeft = width * target;
            nextTarget = width * target;
            log('next');
            subir = true;

        }
    }

    mouseMove = false;
    intervalCount = target + 1;
    auto = setInterval(intervalFunction, 5000); // Retorna el setInterval
});

slider.addEventListener('pointermove', (e) => {
    if (!isDown) return; // stop the fn from running
    e.preventDefault();
    clearInterval(auto);
    mouseMove = true;
    const x = e.pageX - slider.offsetLeft;
    walk = (x - startX) * 1;
    slider.scrollLeft = scrollLeft - walk;
});