;(function ($) {
    'use strict';
    let windowWidth = $(window).width();

    let initSliderReview = function () {
        if ($('#slider-review').length) {
            new Swiper('#slider-review .swiper', {
                speed: 1000,
                spaceBetween: 30,
                loop: 0,
                pagination: {
                    el: '.slider-theme_actions--pagination',
                    clickable: true,
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 3,
                    },
                },
            });
        }
    }

    $(function () {
        initSliderReview();
    });
})(jQuery);