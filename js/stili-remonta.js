'use strict';

/* Brands Slider */

const stiliBrandsSlider = document.querySelector('.brands-slider');

if (stiliBrandsSlider) {
	new Swiper('.brands-slider', {
		loop: true,
		slidesPerView: 2,
		speed: 400,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false
		},
		breakpoints: {
			768: {
				slidesPerView: 5,
			},
			480: {
				slidesPerView: 3,
			}
		}
	});
}