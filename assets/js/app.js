;(function ($) {
	'use strict';
	let windowWidth = $(window).width();

	let initNavigationMobile = function () {
		if (windowWidth < 1023) {
			$('#header .header-navigation').css('--header-height', $('#header').height() + 'px');

			if ($("#header .header-navigation > ul > li > .navigation-sub").length) {
				$("#header .header-navigation").attr('id', 'hasMenu');
				$("#header .header-navigation > ul > li > .navigation-sub").each(function (index) {
					$(this).prev().attr({
						"href": "#subMenu" + index, "data-bs-toggle": "collapse"
					});
					$(this).attr({
						"id": "subMenu" + index, "class": "collapse navigation-sub", "data-bs-parent": "#hasMenu"
					});
				})
			}

			$('#call-navigation').click(function () {
				if (!$('body').hasClass('is-navigation')) {
					$('body').addClass('is-navigation');
				} else {
					$("#header .header-navigation > ul > li > .navigation-sub").collapse('hide');
					$('body').removeClass('is-navigation');
				}
			});
		} else {
			$('#header .header-navigation .navigation-sub').css('--header-height', $('#header').height() + 'px');
		}
	}

	let initHeaderScroll = function () {
		if ($('body').height() / $(window).height() > 1.3) {
			$(window).scroll(function () {
				if ($(document).scrollTop() > 0) {
					$('#header').addClass('is-scroll');
				} else {
					$('#header').removeClass('is-scroll');
				}
			});
		}
	}

	let initSetTimeMarquee = function () {
		if ($('#header-marquee').length) {
			let marquee = $('#header-marquee');

			$(window).on('load resize', function () {
				let countHidden = marquee.find('.marquee-item').filter(function () {
					return $(this).offset().left >= marquee.width()
				}).length, countShow = marquee.find('.marquee-item').length - countHidden;
				let htmlRender = '';
				for (let i = 1; i <= countShow; i++) {
					htmlRender += '<div class="marquee-item">' + marquee.find(`.marquee-item:nth-child(${i})`).html() + '</div>';
				}
				marquee.css('--marquee-elm_show', countShow);
				marquee.append(htmlRender);
			});
		}
	}

	let initAnimationHero = function () {
		setTimeout(function () {
			if ($('#hero-content').length) {
				$('#hero-content').addClass('animate')
			}
		});
	}

	let initSliderCore = function () {
		if ($('#slider-core').length > 0) {
			new Swiper('#slider-core .swiper', {
				loop: false, spaceBetween: 30, speed: 450, navigation: {
					nextEl: '#slider-core .slider-theme_actions--next',
					prevEl: '#slider-core .slider-theme_actions--prev',
				}, pagination: {
					el: '#slider-core .slider-theme_actions--pagination', clickable: true,
				}, autoplay: {
					delay: 10000, disableOnInteraction: false,
				}, breakpoints: {
					1199: {
						autoHeight: 0
					}, 320: {
						autoHeight: 1
					},
				},
			});
		}
	}

	let initSliderArtcile = function () {
		if ($('#slider-article').length) {
			new Swiper('#slider-article .swiper', {
				speed: 1000, spaceBetween: 30, loop: 0, navigation: {
					nextEl: '#slider-article .slider-theme_actions--next',
					prevEl: '#slider-article .slider-theme_actions--prev',
				}, breakpoints: {
					1200: {
						slidesPerView: 4,
					}, 991: {
						slidesPerView: 3.3,
					}, 768: {
						slidesPerView: 2.3,
					}, 525: {
						slidesPerView: 1.5,
					}, 375: {
						slidesPerView: 1.3,
					}, 320: {
						slidesPerView: 1,
					},
				},
			});
		}
	}

	let initSliderReview = function () {
		if ($('#slider-review').length) {
			new Swiper('#slider-review .swiper', {
				speed: 1000, spaceBetween: 30, loop: 0, pagination: {
					el: '#slider-review .slider-theme_actions--pagination', clickable: true,
				}, breakpoints: {
					1200: {
						slidesPerView: 3,
					}, 991: {
						slidesPerView: 3,
					}, 600: {
						slidesPerView: 2,
					},
				},
			});
		}
	}

	let initTableEvent = function () {
		if ($('.table-theme').length) {
			$('.table-theme').each(function () {
				// Sự kiện mouse highlight hàng trong table
				let table = $(this);
				table.find('tbody').mouseover(function (e) {
					let targetMouse = $(e.target), targetMouse_Row = targetMouse.closest('tr');

					table.find('tr.is-highlight').removeClass('is-highlight');
					targetMouse_Row.addClass('is-highlight');
				});

				table.find('.table-column_sort').click(function () {
					table.find('.table-column_sort').removeClass('is-sort');
					$(this).addClass('is-sort')
				});
			});
		}

		if ($('.table-sort').length) {
			$('.table-sort').click(function () {
				if (!$(this).hasClass('is-active')) {
					// Active button
					$(this).closest('.table-inner').find('.table-sort').removeClass('is-active');
					$(this).addClass('is-active');

					// Hide - Show table
					$(this).closest('.table-inner').find('.table-theme').hide();
					$(this).closest('.table-inner').find(`.table-${$(this).data('value')}`).show();
				}
			});
		}
	}

	let initScrollSpyItem = function () {
		if ($('.scrollspy-item').length) {
			$('.scrollspy-item').click(function () {
				$('.scrollspy-item').parent().removeClass('active');
				$(this).parent().addClass('active');

				let target = $(this).attr('data-target'), headerHeight = $('#header').height(),
					offsetTopElm = $(target).offset().top - headerHeight - 90;

				$('html').css('scroll-behavior', 'auto');
				$('html, body').animate({
					scrollTop: offsetTopElm,
				}, function () {
					$('html').css('scroll-behavior', 'smooth');
				});
			})
		}
	}

	let initSetReadMore = function () {
		if ($('.initSetReadMore').length) {
			let elms = $('.initSetReadMore'),
				renderReadmore = "<a href='javascript:void(0)' class='handleReadmore'>Xem thêm</a>";

			$(window).on('load resize', function () {
				elms.each(function (index, elm) {
					let queryElm = $(elm), getHeightElm = parseFloat(queryElm.height()),
						getLineHeightElm = parseFloat(queryElm.css('line-height').split('px')[0]),
						lines = Math.round(getHeightElm / getLineHeightElm);

					if (lines > 5) {
						queryElm.addClass('less-more').css({
							'--limit-height': getLineHeightElm * 5 + 'px', '--max-height': getHeightElm + 'px',
						});
						queryElm.after(renderReadmore);
					}
				});
			});

			$('.initSetReadMore').parent().on('click', '.handleReadmore', function () {
				$(this).parent().find('.less-more').removeClass('less-more').addClass('loaded');
				$(this).remove();
			});
		}
	}

	let initHandleVideo = function () {
		if ($('#handleVideo').length && $('#videoSidebar').length) {
			$(window).on('load resize', function () {
				if (windowWidth > 1023) {
					$('#videoSidebar').css('--max-height', $('#handleVideo').height() + 'px');
				}
			});

			if ($('.handle-videoSidebar').length) {
				$('.handle-videoSidebar').click(function () {
					let elmParent = $(this).parent();
					if (!elmParent.hasClass('is-active')) {
						$('.handle-videoSidebar').parent().removeClass('is-active');
						elmParent.addClass('is-active');

						let videoID = $(this).data('id'),
							videoTitle = $(this).data('title'),
							videoCreate = $(this).data('create'),
							videoDesc = $(this).data('desc');

						$('#video-setID').attr('src', 'https://www.youtube.com/embed/' + videoID);
						$('#video-setTitle').text(videoTitle);
						$('#video-setCreate').text(videoCreate);
						$('#video-setDesc').text(videoDesc);
					}
				});
			}
		}
	};

	let initQuickSearch = function () {
		if ($('#search-quick').length) {
			let searchQuick = $('#search-quick');
			searchQuick.find('.search-quick_call').click(function () {
				if (!searchQuick.hasClass('is-show')) {
					searchQuick.addClass('is-show');
				}
			});

			$(document).mouseup(function (e) {
				if (!searchQuick.is(e.target) && searchQuick.has(e.target).length === 0) {
					searchQuick.removeClass('is-show');
				}
			});
		}
	}

	let handleCallFloating = function () {
		if ($('.floating-theme').length) {
			$('.floating-call').click(function () {
				let target = $($(this).data('target'));

				if (!target.hasClass('is-floating')) {
					target.addClass('is-floating');
					$('body').css({
						'overflow': 'hidden',
						' height': '100vh',
						'position': 'fixed'
					})
				} else {
					target.removeClass('is-floating');
					$('body').removeAttr('style');
				}
			});
		}
	}

	$(function () {
		initNavigationMobile();
		initHeaderScroll();
		initSetTimeMarquee();
		initAnimationHero();
		initSliderCore();
		initSliderArtcile();
		initSliderReview();
		initTableEvent();
		initScrollSpyItem();
		initSetReadMore();
		initHandleVideo();
		initQuickSearch();
		handleCallFloating();
	});
})(jQuery);