'use strict';

window.addEventListener('DOMContentLoaded', e => {
	const header = document.querySelector('.header');
	const headerNextSection = document.querySelector('.header + section');
	const sectionCoverHeader = header.querySelector('.section-cover');
	const handleHeaderScroll = e => {
		const distanceFromStart = +(window.pageYOffset + header.getBoundingClientRect().top).toFixed();
		//const distanceFromStartNextSection = +(window.pageYOffset + headerNextSection.getBoundingClientRect().top).toFixed();
		if (window.scrollY > distanceFromStart + header.offsetHeight * .2) {
			sectionCoverHeader.classList.add('hide');
		} else {
			sectionCoverHeader.classList.remove('hide');
		}
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
		if (
			window.scrollY > distanceFromStartAbout + about.offsetHeight - document.documentElement.clientHeight 
			&& window.scrollY < distanceFromStartOrder + order.offsetHeight
			&& !cantHandleScrollAbout
			) {
			cantHandleScrollAbout = true;
			console.log(getDirection())
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
							if (window.scrollY > distanceFromStartOrder + order.offsetHeight || window.scrollY < distanceFromStartAbout + about.offsetHeight - document.documentElement.clientHeight) {
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
								if (window.scrollY > distanceFromStartAbout + about.offsetHeight - document.documentElement.clientHeight) {
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
									if (window.scrollY < distanceFromStartAbout + about.offsetHeight - document.documentElement.clientHeight) {
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