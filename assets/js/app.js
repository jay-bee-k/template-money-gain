;(function ($) {
	'use strict';
	let windowWidth = $(window).width();
	let initSliderArtcile = function () {
		if ($('#slider-article').length) {
			new Swiper('#slider-article .swiper', {
				speed: 1000,
				spaceBetween: 30,
				loop: 0,
				navigation: {
					nextEl: '#slider-article .slider-theme_actions--next',
					prevEl: '#slider-article .slider-theme_actions--prev',
				},
				breakpoints: {
					1200: {
						slidesPerView: 4,
					},
				},
			});
		}
	}
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
		initSliderArtcile();
		initSliderReview();
	});
})(jQuery);