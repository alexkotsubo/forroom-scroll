'use strict';

const teamSliders = document.querySelectorAll('.team__slider .swiper');

if (teamSliders.length > 0) {
	for (let i = 0; i < teamSliders.length; i++) {
		const prev = teamSliders[i].previousElementSibling.querySelector('.team__slider-prev');
		const next = teamSliders[i].previousElementSibling.querySelector('.team__slider-next');
		new Swiper(teamSliders[i], {
			loop: true,
			freeMode: true,
			slidesPerColumn: 1,
			breakpoints: {
				1920: {
					slidesPerView: 4,
				},
				1442: {
					slidesPerView: 3.15,
				},
				1280: {
					slidesPerView: 3.4,
				},
				1024: {
					slidesPerView: 2.5,
				},
				768: {
					slidesPerView: 3.1,
				},
				480: {
					slidesPerView: 3.1,
				},
				320: {
					slidesPerView: 2.1,
				},
			},
			navigation: {
				nextEl: next,
				prevEl: prev,
			},
		});
	}
}