import '../css/index.scss';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/tomorrow-night-eighties.css';
import { ToggleColors } from './util';

import { SlideAnimation } from '../../../src/core/SlideAnimation';

hljs.initHighlightingOnLoad();

const copyButton = document.querySelector('.js-copy');
const modalCloseButton = document.querySelector('.js-modal-close');
const modalWrapper = document.querySelector('.js-modal-wrapper') as HTMLElement;
const modal = document.querySelector('.js-modal') as HTMLElement;
const page = document.querySelector('.js-page') as HTMLElement;

modal.addEventListener('click', target => {
    target.stopPropagation();
});

modalWrapper.addEventListener('click', target => {
    page.classList.remove('-blur');
    modalWrapper.classList.remove('-active');
    closeModal();
});
copyButton.addEventListener('click', target => {
    page.classList.add('-blur');
    modalWrapper.classList.add('-active');
    openModal();
});

modalCloseButton.addEventListener('click', target => {
    page.classList.remove('-blur');
    modalWrapper.classList.remove('-active');
    closeModal();
});

let scrollY = 0;

function openModal() {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
}

function closeModal() {
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollY);
}

const prev = document.querySelector('[data-prev]');
const next = document.querySelector('[data-next]');
const pause = document.querySelector('[data-pause]');
const block = document.querySelector('[data-block]');

const slideAnimation = new SlideAnimation({
    element: block as HTMLElement,
    easing: 'easeInOutCubic',
    duration: 1000,
});
const toggleColors = new ToggleColors(['#9a0014', 'black', 'blue']);

const half = function() {
    slideAnimation.element.style.background = toggleColors.getColor();
};

const finish = function() {
    console.log('完了');
};

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
