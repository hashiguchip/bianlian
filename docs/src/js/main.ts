import '../css/index.scss';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/tomorrow-night-eighties.css';

hljs.initHighlightingOnLoad();

const copyButton = document.querySelector('.js-copy');
const modalCloseButton = document.querySelector('.js-modal-close');
const modalWrapper = document.querySelector('.js-modal-wrapper') as HTMLElement;
const modal = document.querySelector('.js-modal') as HTMLElement;

modal.addEventListener('click', target => {
    target.stopPropagation();
});

modalWrapper.addEventListener('click', target => {
    modalWrapper.classList.remove('-active');
});
copyButton.addEventListener('click', target => {
    console.log(target);
    modalWrapper.classList.add('-active');
});

copyButton.addEventListener('click', target => {
    modalWrapper.classList.add('-active');
});

modalCloseButton.addEventListener('click', target => {
    modalWrapper.classList.remove('-active');
});
