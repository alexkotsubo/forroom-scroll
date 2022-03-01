'use strict';

window.addEventListener('DOMContentLoaded', e => {
	const seconds = 0.7 * 1000;
	const sectionOne = document.querySelector('.sections-animation-1');
	const sectionTwo = document.querySelector('.sections-animation-1 + .sections-animation-2');
	const sectionCoverSectionOne = sectionOne.querySelector('.section-cover');
	const sectionCoverSectionTwo = sectionTwo.querySelector('.section-cover');
	let cantHandleScrollSectionOne = false;
	sectionCoverSectionTwo.classList.add('hide');
	let directionMode = null;
	const getDirection = () => {
		const distanceFromStartSectionOne = +(window.pageYOffset + sectionOne.getBoundingClientRect().top).toFixed();
		const distanceFromStartSectionTwo = +(window.pageYOffset + sectionTwo.getBoundingClientRect().top).toFixed();
		if (directionMode !== null) return directionMode;
		if (window.scrollY <= distanceFromStartSectionOne + sectionOne.offsetHeight) return 'top';
		if (window.scrollY > distanceFromStartSectionTwo) return 'bottom';
	};
	const handleSectionOneScroll = e => {
		const distanceFromStartSectionTwo = +(window.pageYOffset + sectionTwo.getBoundingClientRect().top).toFixed();
		const distanceFromStartSectionOne = +(window.pageYOffset + sectionOne.getBoundingClientRect().top).toFixed();
		let topHeight = distanceFromStartSectionOne + sectionOne.offsetHeight - document.documentElement.clientHeight;
		if (sectionOne.offsetHeight >= document.documentElement.clientHeight) {
			topHeight = distanceFromStartSectionOne + sectionOne.offsetHeight - document.documentElement.clientHeight;
		} else {
			topHeight = distanceFromStartSectionOne;
		}
		if (
			window.scrollY > topHeight
			&& window.scrollY < distanceFromStartSectionTwo + sectionTwo.offsetHeight
			&& !cantHandleScrollSectionOne
			) {
			cantHandleScrollSectionOne = true;
			setTimeout(() => {
				if (getDirection() === 'top') {
					sectionCoverSectionOne.classList.add('hide');
					setTimeout(() => {
						if (window.scrollY < distanceFromStartSectionTwo) {
							directionMode = null;
							window.scrollTo({
								top: distanceFromStartSectionTwo,
							});
						}
						sectionCoverSectionTwo.classList.remove('hide');
						const handleOutsideScroll = e => {
							if (window.scrollY > distanceFromStartSectionTwo + sectionTwo.offsetHeight || window.scrollY < topHeight) {
								cantHandleScrollSectionOne = false;
								window.removeEventListener('scroll', handleOutsideScroll);
							}
							if (window.scrollY < distanceFromStartSectionTwo) {
								cantHandleScrollSectionOne = false;
								directionMode = 'bottom';
								window.removeEventListener('scroll', handleOutsideScroll);
							}
						};
						window.addEventListener('scroll', handleOutsideScroll);
					}, seconds);
				}
				if (getDirection() === 'bottom') {
					const handleBottomScroll = e => {
						if (window.scrollY < distanceFromStartSectionTwo) {
							window.removeEventListener('scroll', handleBottomScroll);
							sectionCoverSectionTwo.classList.add('hide');
							setTimeout(() => {
								if (window.scrollY > topHeight) {
									window.scrollTo({
										top: distanceFromStartSectionOne,
									});
								}
								sectionCoverSectionOne.classList.remove('hide');
								const handleOutsideScroll = e => {
									if (directionMode === 'bottom') {
										directionMode = null;
										cantHandleScrollSectionOne = false;
										window.removeEventListener('scroll', handleOutsideScroll);
									}
									if (window.scrollY < topHeight) {
										cantHandleScrollSectionOne = false;
										window.removeEventListener('scroll', handleOutsideScroll);
									}
								};
								window.addEventListener('scroll', handleOutsideScroll);
							}, seconds);
						}
					};
					window.addEventListener('scroll', handleBottomScroll);
				}
			}, 100);
		}
	};
	handleSectionOneScroll();
	window.addEventListener('scroll', handleSectionOneScroll);
});