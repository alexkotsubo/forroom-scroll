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
		if (prevScroll < window.scrollY) {//if (window.scrollY < distanceFromStart + header.offsetHeight * .5) {
			toShowHeader = false;
		}
		if (!toShowHeader && window.scrollY > distanceFromStart + header.offsetHeight * .5) {
			sectionCoverHeader.classList.add('hide');
			toShowHeader = true;
		}
		prevScroll = window.scrollY;
		// else {
		// 	sectionCoverHeader.classList.remove('hide');
		// }
	};
	handleHeaderScroll();
	window.addEventListener('scroll', handleHeaderScroll);

	const about = document.querySelector('.about');
	const order = document.querySelector('.about + .order');
	const sectionCoverAbout = about.querySelector('.section-cover');
	const sectionCoverOrder = order.querySelector('.section-cover');
	let cantHandleScrollAbout = false;
	sectionCoverOrder.classList.add('hide');
	let directionMode = null;
	const getDirection = () => {
		const distanceFromStartAbout = +(window.pageYOffset + about.getBoundingClientRect().top).toFixed();
		const distanceFromStartOrder = +(window.pageYOffset + order.getBoundingClientRect().top).toFixed();
		if (directionMode !== null) return directionMode;
		if (window.scrollY <= distanceFromStartAbout + about.offsetHeight) return 'top';
		if (window.scrollY > distanceFromStartOrder) return 'bottom';
	};
	const handleAboutScroll = e => {
		const distanceFromStartOrder = +(window.pageYOffset + order.getBoundingClientRect().top).toFixed();
		const distanceFromStartAbout = +(window.pageYOffset + about.getBoundingClientRect().top).toFixed();
		let topHeight = distanceFromStartAbout + about.offsetHeight - document.documentElement.clientHeight;
		if (about.offsetHeight >= document.documentElement.clientHeight) {
			topHeight = distanceFromStartAbout + about.offsetHeight - document.documentElement.clientHeight;
		} else {
			topHeight = distanceFromStartAbout;
		}
		if (
			window.scrollY > topHeight
			&& window.scrollY < distanceFromStartOrder + order.offsetHeight
			&& !cantHandleScrollAbout
			) {
			cantHandleScrollAbout = true;
			setTimeout(() => {
				if (getDirection() === 'top') {
					sectionCoverAbout.classList.add('hide');
					setTimeout(() => {
						if (window.scrollY < distanceFromStartOrder) {
							directionMode = null;
							window.scrollTo({
								top: distanceFromStartOrder,
							});
						}
						sectionCoverOrder.classList.remove('hide');
						const handleOutsideScroll = e => {
							if (window.scrollY > distanceFromStartOrder + order.offsetHeight || window.scrollY < topHeight) {
								cantHandleScrollAbout = false;
								window.removeEventListener('scroll', handleOutsideScroll);
							}
							if (window.scrollY < distanceFromStartOrder) {
								cantHandleScrollAbout = false;
								directionMode = 'bottom';
								window.removeEventListener('scroll', handleOutsideScroll);
							}
						};
						window.addEventListener('scroll', handleOutsideScroll);
					}, 500);
				}
				if (getDirection() === 'bottom') {
					const handleBottomScroll = e => {
						if (window.scrollY < distanceFromStartOrder) {
							window.removeEventListener('scroll', handleBottomScroll);
							sectionCoverOrder.classList.add('hide');
							setTimeout(() => {
								if (window.scrollY > topHeight) {
									window.scrollTo({
										top: distanceFromStartAbout,
									});
								}
								sectionCoverAbout.classList.remove('hide');
								const handleOutsideScroll = e => {
									if (directionMode === 'bottom') {
										directionMode = null;
										cantHandleScrollAbout = false;
										window.removeEventListener('scroll', handleOutsideScroll);
									}
									if (window.scrollY < topHeight) {
										cantHandleScrollAbout = false;
										window.removeEventListener('scroll', handleOutsideScroll);
									}
								};
								window.addEventListener('scroll', handleOutsideScroll);
							}, 500);
						}
					};
					window.addEventListener('scroll', handleBottomScroll);
				}
			}, 100);
		}
	};
	handleAboutScroll();
	window.addEventListener('scroll', handleAboutScroll);
});