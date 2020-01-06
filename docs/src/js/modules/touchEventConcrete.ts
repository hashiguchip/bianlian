interface TouchEventPrams {
    right: () => any;
    left: () => any;
}
export const touchEventConcrete: (target: HTMLElement, params: TouchEventPrams) => (event) => any = function(
    target,
    params
) {
    return function(event) {
        let touchStartX;
        let touchMoveX;
        let drag;

        const BORDER = 50;

        target.addEventListener(
            'mousedown',
            function(event) {
                drag = true;
                touchStartX = event.offsetX;
            },
            false
        );

        target.addEventListener(
            'mousemove',
            function(event) {
                if (drag) {
                    touchMoveX = event.offsetX;
                    if (Math.abs(touchStartX - touchMoveX) > BORDER) {
                        if (touchStartX < touchMoveX - BORDER) {
                            params.right();
                            drag = false;
                        } else if (touchStartX > touchMoveX + BORDER) {
                            params.left();
                            drag = false;
                        }
                    }
                }
            },
            false
        );
        target.addEventListener(
            'mouseup',
            function(event) {
                drag = false;
            },
            false
        );

        target.addEventListener(
            'touchstart',
            function(event) {
                touchStartX = event.touches[0].pageX;
            },
            false
        );

        target.addEventListener(
            'touchmove',
            function(event) {
                touchMoveX = event.changedTouches[0].pageX;
            },
            false
        );

        target.addEventListener(
            'touchend',
            event => {
                if (touchStartX < touchMoveX - BORDER) {
                    params.right();
                } else if (touchStartX > touchMoveX + BORDER) {
                    params.left();
                }
            },
            false
        );
    };
};
