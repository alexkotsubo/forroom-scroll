'use strict';

window.addEventListener('DOMContentLoaded', e => {
	const header = document.querySelector('.header');
	const sectionCoverHeader = header.querySelector('.section-cover');
	let prevScroll = window.scrollY;
	let toShowHeader = false;
	const handleHeaderScroll = e => {
		const distanceFromStart = +(window.pageYOffset + header.getBoundingClientRect().top).toFixed();
		if (toShowHeader && prevScroll > window.scrollY) {
			sectionCoverHeader.classList.remove('hide');
		}
		if (prevScroll < window.scrollY) {
			toShowHeader = false;
		}
		if (!toShowHeader && window.scrollY > distanceFromStart + header.offsetHeight * .5) {
			sectionCoverHeader.classList.add('hide');
			toShowHeader = true;
		}
		prevScroll = window.scrollY;
	};
	handleHeaderScroll();
	window.addEventListener('scroll', handleHeaderScroll);
});