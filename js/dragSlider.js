const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const log = console.log;

const slider = document.querySelector('#slider_container');
let isDown = false;
let startX;
let scrollLeft;
let walk;
let position = 0;
let mouseMove = false;
let width = 320;
let focus;
slider.scrollLeft = 0;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.style.scrollBehavior = 'inherit';
    log(scrollLeft);
    mouseMove = false;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
    slider.style.scrollBehavior = 'smooth';
    mouseMove = false;
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
    slider.style.scrollBehavior = 'smooth';

    if ( position == 0 && walk > 0 ) {
        mouseMove = false;
        return;
    }

    if ( mouseMove ) {
        if ( slider.scrollLeft < 320 && position == 0 ) {

            position++; // 1
            log(`Focus: ${position}`);
            focus = position;
            slider.scrollLeft = width * position; // 320

        } else if ( slider.scrollLeft < 320 && position == 1 ) {

            position--; // 0
            log(`Focus: ${position}`);
            slider.scrollLeft = width * position; // 0

        } else if ( slider.scrollLeft > 320 && position == 1 ) {

            position++; // 2
            log(`Focus: ${position}`);
            slider.scrollLeft = width * position; // 640

        } else if ( slider.scrollLeft < 640 && position == 2 ) {

            position--; // 1
            log(`Focus: ${position}`);
            slider.scrollLeft = width * position; // 320

        } else if ( slider.scrollLeft > 640 && position == 2 ) {

            position++; // 3
            log(`Focus: ${position}`);
            slider.scrollLeft = width * position; // 960

        } else if ( slider.scrollLeft < 960 && position == 3 ) {

            position--; // 2
            log(`Focus: ${position}`);
            slider.scrollLeft = width * position; // 640

        } else if ( slider.scrollLeft > 960 && position == 3 ) {

            position++; // 4
            log(`Focus: ${position}`);
            slider.scrollLeft = width * position; // 1280

        } else if ( slider.scrollLeft < 1280 && position == 4 ) {

            position--; // 3
            log(`Focus: ${position}`);
            slider.scrollLeft = width * position; // 960
            
        }
    }

    mouseMove = false;
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return; // stop the fn from running
    e.preventDefault();
    mouseMove = true;
    const x = e.pageX - slider.offsetLeft;
    walk = (x - startX) * 1;
    slider.scrollLeft = scrollLeft - walk;
});