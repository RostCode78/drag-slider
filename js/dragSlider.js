const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const log = console.log;

const slider = $('#slider_container');
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

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.style.scrollBehavior = 'inherit';
    mouseMove = false;
});

slider.addEventListener('mouseleave', () => {
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
            nextTarget = width * target;

        } else if ( slider.scrollLeft > nextTarget && position == target ) {

            position++; // 2
            target = position;
            slider.scrollLeft = width * target; // 640
            nextTarget = width * target;

        } else if ( slider.scrollLeft < nextTarget && position == target ) {

            position--; // 1
            target = position;
            slider.scrollLeft = width * target; // 320
            nextTarget = width * target;

        }
    }
    
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
            nextTarget = width * target;

        } else if ( slider.scrollLeft > nextTarget && position == target ) {

            position++; // 2
            target = position;
            slider.scrollLeft = width * target; // 640
            nextTarget = width * target;

        } else if ( slider.scrollLeft < nextTarget && position == target ) {

            position--; // 1
            target = position;
            slider.scrollLeft = width * target; // 320
            nextTarget = width * target;

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

