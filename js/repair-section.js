'use strict';

// Repair Scroll

window.addEventListener('DOMContentLoaded', e => {
	let activeMode = null;
	let prev = 0;
	const repairsContent = document.querySelectorAll('.repairs__content');
	const repairsImgs = document.querySelectorAll('.repairs__img');
	const repairsInners = document.querySelectorAll('.repairs__inner');
	const repairsScroll = document.querySelector('.repairs__scroll');
	const getCoords = elem => {
		const box = elem.getBoundingClientRect();
		return {
			top: +(box.top + window.scrollY).toFixed(),
			right: +(box.right + window.scrollX).toFixed(),
			bottom: +(box.bottom + window.scrollY).toFixed(),
			left: +(box.left + window.scrollX).toFixed(),
		};
	};
	const coordinate = y => {
		if (y === 1) return (getCoords(repairsImgs[y]).top - getCoords(repairsScroll).top);
		return (getCoords(repairsImgs[y]).top - getCoords(repairsScroll).top);
	};
	const coordinateMobile = y => getCoords(repairsImgs[y]).top + repairsImgs[y].offsetHeight / 2.2 - repairsImgs[y].offsetHeight * 2;
	const handleDesktopScroll = e => {
		if (document.documentElement.scrollTop === 0) repairsContent[0].classList.add('active');
		for (let i = 0; i < repairsImgs.length; i++) {
			if (repairsImgs[i + 1]) {
				if (
					+(window.scrollY - getCoords(repairsScroll).top).toFixed() > coordinate(i) && 
					+(window.scrollY - getCoords(repairsScroll).top).toFixed() < coordinate(i + 1)
				) {
					repairsContent[prev].classList.remove('active');
					repairsContent[i].classList.add('active');
					prev = i;
				}
			} else {
				if (+(window.scrollY - getCoords(repairsScroll).top).toFixed() > coordinate(i)) {
					repairsContent[prev].classList.remove('active');
					repairsContent[i].classList.add('active');
					prev = i;
				}
			}
		}
	};
	const handleMobileScroll = e => {
		if (document.documentElement.scrollTop === 0) repairsContent[0].classList.add('active');
		for (let i = 0; i < repairsInners.length; i++) {
			if (repairsInners[i + 1]) {
				if (
					+(window.scrollY - getCoords(repairsScroll).top).toFixed() > coordinateMobile(i) && 
					+(window.scrollY - getCoords(repairsScroll).top).toFixed() < coordinateMobile(i + 1)
				) {
					repairsContent[prev].classList.remove('active');
					repairsContent[i].classList.add('active');
					repairsInners[prev].classList.remove('active');
					repairsInners[i].classList.add('active');
					prev = i;
				}
			} else {
				if (+(window.scrollY - getCoords(repairsScroll).top).toFixed() > coordinateMobile(i)) {
					repairsContent[prev].classList.remove('active');
					repairsContent[i].classList.add('active');
					repairsInners[prev].classList.remove('active');
					repairsInners[i].classList.add('active');
					prev = i;
				}
			}
		}
	};
	const handleResize = e => {
		if (document.documentElement.clientWidth > 1023) {
			if (activeMode !== 1) {
				activeMode = 1;
				window.removeEventListener('scroll', handleMobileScroll);
				for (let i = 0; i < repairsContent.length; i++) {
					repairsInners[i].classList.remove('active');
					repairsContent[i].classList.remove('active');
				}
				if (repairsScroll) {
					handleDesktopScroll();
					window.addEventListener('scroll', handleDesktopScroll);
				}
			}
		} else {
			if (activeMode !== 2) {
				activeMode = 2;
				window.removeEventListener('scroll', handleDesktopScroll);
				if (repairsScroll) {
					handleMobileScroll();
					window.addEventListener('scroll', handleMobileScroll);
				}
			}
		}
	};
	handleResize();
	window.addEventListener('resize', handleResize);
});