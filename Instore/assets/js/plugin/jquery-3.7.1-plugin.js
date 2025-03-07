(function ($) {
    $.fn.exists = function () {
        return (this.length > 0);
    };

    $.fn.animateHoverColor = function (color, duration = 200, child = null) {
        return this.each(function () {
            let target = child ? $(this).find(child) : $(this);

            $(this).hover(
                function () {
                    target.css("transition", `color ${duration}ms ease-in-out`)
                        .css("color", color);
                },
                function () {
                    target.css("color", "");
                }
            );
        });
    };

    $.fn.animateHoverTransform = function (transformValue, duration = 200, child = null) {
        return this.each(function () {
            let target = child ? $(this).find(child) : $(this);

            $(this).hover(
                function () {
                    target.stop(true, false).css("transition", `transform ${duration}ms ease-in-out`)
                        .css("transform", transformValue);
                },
                function () {
                    target.stop(true, false).css("transition", `transform ${duration}ms ease-in-out`)
                        .css("transform", "none");
                }
            );
        });
    };
})(jQuery);