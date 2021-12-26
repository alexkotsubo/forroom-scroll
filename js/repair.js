'use strict';

const repairInput = document.querySelector("#doubt-form-phone");
const im = new Inputmask("+380 (99) 999 - 99 - 99");
im.mask(repairInput);

/* Splitting */

Splitting();

// Burger

const navBurger = document.querySelector('.nav__burger');

if (navBurger) {
	const btn = navBurger.querySelector('.nav__burger-btn');
	btn.addEventListener('click', e => {
		navBurger.classList.toggle('active');
	});
}

// Parallax

window.addEventListener('DOMContentLoaded', e => {
	const parallax = document.querySelectorAll('._parallax');
	const percent = 10;
	const getCoords = elem => {
		const box = elem.getBoundingClientRect();
		return {
			top: +(box.top + window.scrollY).toFixed(),
			right: +(box.right + window.scrollX).toFixed(),
			bottom: +(box.bottom + window.scrollY).toFixed(),
			left: +(box.left + window.scrollX).toFixed(),
		};
	};
	const handleParallax = (e, i) => {
		const viewport = document.documentElement.clientHeight;
		const distance = +(parallax[i].getBoundingClientRect().top).toFixed();
		const willBeOccupiedDistance = viewport + parallax[i].offsetHeight;
		const occupiedDistance = -(distance) + viewport;
		if (viewport > distance && occupiedDistance < willBeOccupiedDistance) {
			const image = parallax[i].querySelector('span');
			const step = +(willBeOccupiedDistance / (parallax[i].offsetHeight / 100 * percent)) / willBeOccupiedDistance;
			console.log(step)
			console.log(parallax[i].offsetHeight / 100 * percent > occupiedDistance * step)
			image.style.marginTop = occupiedDistance * step + 'px';
		}
	};

	for (let i = 0; i < parallax.length; i++) {
		window.addEventListener('scroll', e => handleParallax(e, i));
		window.addEventListener('resize', e => handleParallax(e, i));
	}
});

// Header Slider

new Swiper('.header__image .swiper', {
	loop: true,
	speed: 400,
	autoplay: { delay: 5000 },
});

// Tabs Repairs

const opportunitiesTabs = document.querySelectorAll('.opportunities__tab');
const opportunitiesTabsNav = document.querySelectorAll('.opportunities__tab-nav');
const opportunitiesTabsContent = document.querySelectorAll('.opportunities__tab-content');

for (let i = 0; i < opportunitiesTabs.length; i++) {
	opportunitiesTabsNav[i].addEventListener('click', e => {
		opportunitiesTabs[i].classList.toggle('open');
	});
}