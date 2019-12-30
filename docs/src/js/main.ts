import '../css/index.scss';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/tomorrow-night-eighties.css';

hljs.initHighlightingOnLoad();
