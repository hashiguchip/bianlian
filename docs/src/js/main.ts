import '../css/index.scss';

if (location.hash) {
    setTimeout(function() {
        // todo: scroll animation
        window.scrollTo(0, 0);
    }, 1);
}

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/tomorrow-night-eighties.css';
import { ToggleColors } from './util';
import jump from 'jump.js';
import copy from 'copy-to-clipboard';

import { SlideAnimation } from '../../../src/core/SlideAnimation';
import { touchEventConcrete } from './modules/touchEventConcrete';

hljs.initHighlightingOnLoad();

const copyButton = document.querySelector('.js-copy');
const buttons = document.getElementsByTagName('button');
const modalCloseButton = document.querySelector('.js-modal-close');
const modalWrapper = document.querySelector('.js-modal-wrapper') as HTMLElement;
const modal = document.querySelector('.js-modal') as HTMLElement;
const page = document.querySelector('.js-page') as HTMLElement;
const overview = document.querySelector('.js-overview') as HTMLElement;
const demo = document.querySelector('.js-demo') as HTMLElement;

for (const button of buttons) {
    button.addEventListener('mousedown', event => {
        const element = <HTMLElement>event.target;
        element.classList.add('-active');
    });
    button.addEventListener('touchstart', event => {
        const element = <HTMLElement>event.target;
        element.classList.add('-active');
    });
    // express reverberations
    button.addEventListener('mouseup', event => {
        const element = <HTMLElement>event.target;
        setTimeout(function() {
            element.classList.remove('-active');
        }, 150);
    });
    button.addEventListener('touchend', event => {
        const element = <HTMLElement>event.target;
        setTimeout(function() {
            element.classList.remove('-active');
        }, 150);
    });
}

modal.addEventListener('click', target => {
    target.stopPropagation();
});

modalWrapper.addEventListener('click', target => {
    page.classList.remove('-blur');
    modalWrapper.classList.remove('-active');
    closeModal();
});
const source = `
const slideAnimation = new SlideAnimation({
    element: block as HTMLElement,
    easing: 'easeInOutCubic',
    duration: 1000,
});
const halfEvent = function() {
    // change element contents
    slideAnimation.element.style.background = red;
};
const endEvent = function() {
    console.log('end!');
};
prev.addEventListener(
    'click',
    () => {
        slideAnimation.prev({ halfEvent, endEvent });
    },
    false
);`;
copyButton.addEventListener('click', target => {
    page.classList.add('-blur');
    modalWrapper.classList.add('-active');
    copy(source);
    openModal();
});

copyButton.addEventListener('click', target => {
    page.classList.add('-blur');
    modalWrapper.classList.add('-active');
    copy(source);
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
const toggleColors = new ToggleColors(['#289a2e', '#9a9700', '#9a0014']);

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

const test = function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
};

/**
 * https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
 * @param t
 * @param b
 * @param c
 * @param d
 */
function easeOutElastic(t, b, c, d) {
    return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
}

overview.addEventListener(
    'click',
    () => {
        jump('#overview', {
            duration: 350,
            offset: 0,
            easing: easeOutElastic,
        });
    },
    false
);

demo.addEventListener(
    'click',
    () => {
        jump('#demo', {
            duration: 350,
            offset: 0,
            easing: easeOutElastic,
        });
    },
    false
);

const touchEvent = touchEventConcrete(block as HTMLElement, {
    right: () => {
        slideAnimation.next({ half, finish });
    },
    left: () => {
        slideAnimation.prev({ half, finish });
    },
});

window.addEventListener('load', touchEvent, false);
