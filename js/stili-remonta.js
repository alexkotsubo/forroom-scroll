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

// Burger

const navBurger = document.querySelector('.nav__burger');

if (navBurger) {
	const btn = navBurger.querySelector('.nav__burger-btn');
	btn.addEventListener('click', e => {
		navBurger.classList.toggle('active');
	});
}

/* Stili */

const stiliSlide = document.querySelectorAll('.stili__slide');

window.addEventListener('DOMContentLoaded', e => {
	let timeout = null;
	const duration = 700;
	let nextFunc = null;
	if (document.documentElement.clientWidth > 1280) {
		nextFunc = 1;
	} else {
		nextFunc = 2;
	}
	const dots = document.querySelectorAll('.stili__slide-dots');
	for (let i = 0; i < dots.length; i++) {
		for (let y = 0; y < stiliSlide.length; y++) {
			const span = document.createElement('span');
			span.classList.add('stili__slide-dot');
			if (i === y) span.classList.add('active');
			dots[i].appendChild(span);
		}
	}
	const runStiliSlides = e => {
		if (document.documentElement.clientWidth > 1280) {
			if (nextFunc === 1) {
				timeout = setTimeout(() => {
					if (stiliSlide.length) {
						for (let i = 0; i < stiliSlide.length; i++) {
							stiliSlide[i].classList.remove('active');
							stiliSlide[i].style.height = 'unset';
						}
						let prev = 0;
						let cantSlide = false;
						const wraps = document.querySelectorAll('.stili__slide-wrap');
						const names = document.querySelectorAll('.stili__slide-name');
						stiliSlide[prev].classList.add('active');
						let width = stiliSlide[0].offsetWidth - names[0].offsetWidth + 'px';
						wraps[0].style.width = width;
						const setWidth = e => {
							for (let i = 0; i < stiliSlide.length; i++) {
								if (stiliSlide[i].classList.contains('active')) {
									width = stiliSlide[i].offsetWidth - names[i].offsetWidth + 'px';
									wraps[i].style.width = width;
								}
							}
						};
						window.addEventListener('resize', setWidth);
						for (let i = 0; i < stiliSlide.length; i++) {
							stiliSlide[i].classList.add('transition');
							const inner = stiliSlide[i].querySelector('.stili__slide-inner');
					
							if (i !== 0) wraps[i].style.width = '0px';
					
							const prevBtn = stiliSlide[i].querySelector('.stili__slide-prev');
							const nextBtn = stiliSlide[i].querySelector('.stili__slide-next');
				
							prevBtn.onclick = e => {
								if (prev > 0 && !cantSlide) {
									cantSlide = true;
									const savePrev = prev;
									stiliSlide[prev].classList.remove('active');
									stiliSlide[prev - 1].classList.add('active');
									wraps[prev - 1].style.width = width;
									setTimeout(() => {
										wraps[savePrev].style.width = '0px';
										cantSlide = false;
									}, duration);
									prev -= 1;
								}
							};
					
							nextBtn.onclick = e => {
								if (prev + 1 < stiliSlide.length && !cantSlide) {
									cantSlide = true;
									const savePrev = prev;
									stiliSlide[prev].classList.remove('active');
									stiliSlide[prev + 1].classList.add('active');
									wraps[prev + 1].style.width = width;
									setTimeout(() => {
										wraps[savePrev].style.width = '0px';
										cantSlide = false;
									}, duration);
									prev += 1;
								}
							};
				
							names[i].onclick = e => {
								if (!stiliSlide[i].classList.contains('active') && !cantSlide) {
									cantSlide = true;
									const savePrev = prev;
									stiliSlide[prev].classList.remove('active');
									stiliSlide[i].classList.add('active');
									wraps[i].style.width = width;
									setTimeout(() => {
										wraps[savePrev].style.width = '0px';
										cantSlide = false;
									}, duration);
									prev = i;
								}
							};
				
							const handleWidth = e => {
								if (document.documentElement.clientWidth <= 1280) {
									window.removeEventListener('resize', setWidth);
									this.removeEventListener('resize', handleWidth);
									prevBtn.onclick = e => {};
									nextBtn.onclick = e => {};
								}
							};
				
							window.addEventListener('resize', handleWidth);
						}
					}
				}, duration);
				nextFunc = 2;
			}
		} else {
			if (nextFunc === 2) {
				if (timeout !== null) clearTimeout(timeout);
				if (stiliSlide.length) {
					for (let i = 0; i < stiliSlide.length; i++) {
						stiliSlide[i].classList.remove('active');
						stiliSlide[i].style.height = '50px';
					}
					let prev = 0;
					const names = document.querySelectorAll('.stili__slide-name');
					const wrap = document.querySelectorAll('.stili__slide-wrap');
					stiliSlide[prev].classList.add('active');
					stiliSlide[prev].style.height = wrap[prev].offsetHeight + 55 + 'px';
					for (let i = 0; i < names.length; i++) {
						names[i].onclick = e => {
							if (i !== prev) {
								stiliSlide[i].classList.add('active');
								stiliSlide[i].style.height = wrap[i].offsetHeight + 20 + 'px';
								stiliSlide[prev].style.height = '50px';
								stiliSlide[prev].classList.remove('active');
								prev = i;
							}
						};

						const handleWidth = e => {
							if (document.documentElement.clientWidth > 1280) {
								this.removeEventListener('resize', handleWidth);
								names[i].onclick = e => {};
							}
						};

						window.addEventListener('resize', handleWidth);
					
						const prevBtn = stiliSlide[i].querySelector('.stili__slide-prev');
						const nextBtn = stiliSlide[i].querySelector('.stili__slide-next');
			
						console.log(wrap)
						prevBtn.onclick = e => {
							if (prev > 0) {
								stiliSlide[prev].classList.remove('active');
								stiliSlide[prev - 1].classList.add('active');
								stiliSlide[prev - 1].style.height = wrap[prev - 1].offsetHeight + 20 + 'px';
								stiliSlide[prev].style.height = '50px';
								prev -= 1;
							}
						};
				
						nextBtn.onclick = e => {
							if (prev + 1 < stiliSlide.length) {
								stiliSlide[prev].classList.remove('active');
								stiliSlide[prev + 1].classList.add('active');
								stiliSlide[prev + 1].style.height = wrap[prev + 1].offsetHeight + 20 + 'px';
								stiliSlide[prev].style.height = '50px';
								prev += 1;
							}
						};
					}
					window.addEventListener('resize', e => {
						for (let i = 0; i < stiliSlide.length; i++) {
							if (stiliSlide[i].classList.contains('active')) {
								stiliSlide[i].style.height = wrap[i].offsetHeight + 20 + 'px';
							} else {
								stiliSlide[i].style.height = '50px';
							}
						}
					});
				}
				nextFunc = 1;
			}
		}
	};
	runStiliSlides();
	window.addEventListener('resize', runStiliSlides);
});