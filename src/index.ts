import './main.scss';
import { SlideAnimation } from './core/SlideAnimation';

const prev = document.querySelector('[data-prev]');
const next = document.querySelector('[data-next]');
const pause = document.querySelector('[data-pause]');
const block = document.querySelector('[data-block]');

const targets = [{ key: 'prev', element: prev }, { key: 'next', element: next }, { key: 'pause', element: pause }];

const slideAnimation = new SlideAnimation(block);

targets.forEach(function(target) {
    target.element.addEventListener(
        'click',
        function() {
            slideAnimation[target.key]();
        },
        false
    );
});
