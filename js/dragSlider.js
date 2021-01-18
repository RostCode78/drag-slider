const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const log = console.log;

const slider = document.querySelector('#slider_container');
let isDown = false;
let startX;
let scrollLeft;
let walk;
slider.scrollLeft = 0;

let position = 0;
let mouseMove = false;
let width = 320;
let target = 0;
let nextTarget;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.style.scrollBehavior = 'inherit';
    log({scrollLeft, position, width, target, nextTarget});
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
        if ( slider.scrollLeft < width && position == 0 ) {

            position++; // 1
            target = position;
            slider.scrollLeft = width * target; // 320
            nextTarget = width * target;

        } else if ( slider.scrollLeft < nextTarget && position == target ) {

            position--; // 0
            target = position;
            slider.scrollLeft = width * target; // 0

        } else if ( slider.scrollLeft > width && position == target ) {

            position++; // 2
            target = position;
            slider.scrollLeft = width * target; // 640
            nextTarget = width * target;

        } else if ( slider.scrollLeft < nextTarget && position == target ) {

            position--; // 1
            target = position;
            slider.scrollLeft = width * target; // 320

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