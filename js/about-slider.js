'use strict';

const aboutSlider = document.querySelector('.about__slider-wrap');

if (aboutSlider) {
	new Swiper('.about__slider-wrap', {
		loop: true,
		slidesPerView: 1,
		speed: 400,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		effect: 'fade',
	});
}