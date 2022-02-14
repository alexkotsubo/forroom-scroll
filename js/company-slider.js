'use strict';

const companySlider = new Swiper('.company__slider .swiper', {
	loop: true,
	slidesPerView: 1,
	speed: 400,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
});