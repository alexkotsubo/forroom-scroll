'use strict';

// Repair Scroll

window.addEventListener('DOMContentLoaded', e => {
	let activeMode = null;
	let prev = 0;
	const repairsContent = document.querySelectorAll('.repairs__content');
	const repairsImgs = document.querySelectorAll('.repairs__img');
	const repairsInners = document.querySelectorAll('.repairs__inner');
	const repairsImagesSrc = document.querySelectorAll('.repairs__image');
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
	const handleDesktopScroll = e => {
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
		for (let i = 0; i < repairsInners.length; i++) {
			if (i === 0) {
				if (+window.scrollY.toFixed() >= getCoords(repairsInners[i]).top / 2) {
					repairsContent[i].classList.add('active');
				}
			} else {
				if (+window.scrollY.toFixed() >= getCoords(repairsInners[i]).top / (i + 2) * (i + 1)) {
					repairsContent[i].classList.add('active');
				}
			}
		}
	};
	const coordinate = y => {
		if (y === 1) return (getCoords(repairsImgs[y]).top - getCoords(repairsScroll).top) / 2;
		return (getCoords(repairsImgs[y]).top - getCoords(repairsScroll).top) / (y + 2) * (y + 1);
	};
	const handleResize = e => {
		if (document.documentElement.clientWidth > 1024) {
			if (activeMode !== 1) {
				activeMode = 1;
				window.removeEventListener('scroll', handleMobileScroll);
				for (let i = 0; i < repairsContent.length; i++) {
					repairsContent[i].classList.remove('active');
					repairsInners[i].style.backgroundImage = '';
				}
				if (repairsScroll) {
					repairsContent[0].classList.add('active');
					window.addEventListener('scroll', handleDesktopScroll);
				}
			}
		} else {
			if (activeMode !== 2) {
				activeMode = 2;
				window.removeEventListener('scroll', handleDesktopScroll);
				for (let i = 0; i < repairsContent.length; i++) {
					repairsInners[i].style.backgroundImage = repairsImagesSrc[i].style.backgroundImage;
				}
				if (repairsScroll) {
					repairsContent[0].classList.add('active');
					window.addEventListener('scroll', handleMobileScroll);
				}
			}
		}
	};
	handleResize();
	window.addEventListener('resize', handleResize);
});