import './main.scss';
import { SlideAnimation } from './core/SlideAnimation';
import { awaitForClick } from './util/asyncAddEventListener';

const prev = document.querySelector('[data-prev]');
const next = document.querySelector('[data-next]');
const pause = document.querySelector('[data-pause]');
const block = document.querySelector('[data-block]');

const slideAnimation = new SlideAnimation({
    element: block as HTMLElement,
    easing: 'easeInOutCubic',
    duration: 3000,
});

const half = function() {
    slideAnimation.element.style.background = 'white';
};

const finish = function() {
    // slideAnimation.element.style.background = 'blue';
    console.log('完了');
};

// awaitForClick(prev as HTMLElement);
prev.addEventListener(
    'click',
    () => {
        slideAnimation.prev({ half, finish });
    },
    false
);

next.addEventListener(
    'click',
    () => {
        slideAnimation.next({ half, finish });
    },
    false
);

pause.addEventListener(
    'click',
    () => {
        slideAnimation.pause();
    },
    false
);
