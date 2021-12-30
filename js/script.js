'use strict';
let activeFixedMenu = false;
let fixedPadding = document.querySelectorAll('.fixed-padding');
const body = document.querySelector('body');
const nav = document.querySelector('#nav');
const getCoords = elem => {
	const box = elem.getBoundingClientRect();
	return {
		top: +(box.top + window.scrollY).toFixed(),
		right: +(box.right + window.scrollX).toFixed(),
		bottom: +(box.bottom + window.scrollY).toFixed(),
		left: +(box.left + window.scrollX).toFixed(),
	};
};
const getPos = elem => {
	const box = elem.getBoundingClientRect();
	return {
		top: +(box.top).toFixed(),
		right: +(box.right).toFixed(),
		bottom: +(box.bottom).toFixed(),
		left: +(box.left).toFixed(),
	};
};

/* Fix Image Scroll */

// window.addEventListener('DOMContentLoaded', e => {
// 	const fixImg = document.querySelectorAll('.fix-img');
// 	for (let i = 0; i < fixImg.length; i++) {
// 		fixImg[i].style.backgroundPosition = '0px ' + '-' + fixImg[i].offsetHeight + 'px';//getCoords(fixImg[i]).top
// 	}
// 	const handleFixImg = e => {
// 		//console.log(+window.scrollY.toFixed() >= getCoords(fixImg[0]).top - fixImg[0].offsetHeight, getCoords(fixImg[0]).bottom >= +window.scrollY.toFixed())
// 		console.log(document.documentElement.scrollTop - getCoords(fixImg[0]).bottom)
// 		for (let i = 0; i < fixImg.length; i++) {
// 			//console.log(document.documentElement.scrollTop - getCoords(fixImg[i]).bottom)
// 			if (+window.scrollY.toFixed() >= getCoords(fixImg[i]).top - fixImg[i].offsetHeight && getCoords(fixImg[i]).bottom >= +window.scrollY.toFixed()) {
// 				fixImg[i].style.backgroundPosition = '0px ' + (document.documentElement.scrollTop - getCoords(fixImg[i]).bottom) + 'px';
// 			}
// 		}
// 	};
// 	handleFixImg();
// 	window.addEventListener('scroll', handleFixImg);
// });

/* IB */

function ib() {
	let ib = document.querySelectorAll(".ib");
	for (let i = 0; i < ib.length; i++) {
		if (ib[i].querySelector('.ib_use')) {
			ib[i].style.backgroundImage = 'url(' + ib[i].querySelector('.ib_use').getAttribute('src') + ')';
		}
	}
}

ib();

/* Add Scroll Padding */

// const addScrollPadding = document.querySelectorAll('.add-scroll-padding');
// const addScrollMargin = document.querySelectorAll('.add-scroll-margin');

// if (addScrollPadding.length) {
// 	const paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
// 	for (let i = 0; i < addScrollPadding.length; i++) {
// 		addScrollPadding[i].style.paddingRight = paddingValue;
// 		window.addEventListener('resize', e => {
// 			addScrollPadding[i].style.paddingRight = paddingValue;
// 		});
// 	}
// }

// if (addScrollMargin.length) {
// 	const paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
// 	for (let i = 0; i < addScrollMargin.length; i++) {
// 		addScrollMargin[i].style.marginRight = paddingValue;
// 		window.addEventListener('resize', e => {
// 			addScrollMargin[i].style.marginRight = paddingValue;
// 		});
// 	}
// }

// Navigation

const navAddPadding = document.querySelectorAll('.nav-add-padding');
const navAddMargin = document.querySelectorAll('.nav-add-margin');

if (navAddPadding.length) {
	for (let i = 0; i < navAddPadding.length; i++) {
		navAddPadding[i].style.paddingTop = `${nav.offsetHeight}px`;
		window.addEventListener('resize', e => {
			navAddPadding[i].style.paddingTop = `${nav.offsetHeight}px`;
		});
	}
}

if (navAddMargin.length) {
	for (let i = 0; i < navAddMargin.length; i++) {
		navAddMargin[i].style.marginTop = `${nav.offsetHeight}px`;
		window.addEventListener('resize', e => {
			navAddMargin[i].style.marginTop = `${nav.offsetHeight}px`;
		});
	}
}

/* Brands Slider */

const brandsSlider = document.querySelector('.brands__slider');

if (brandsSlider) {
	new Swiper('.brands__slider', {
		loop: true,
		slidesPerView: 3,
		speed: 400,
		autoplay: { delay: 5000 },
		breakpoints: {
			992: {
				slidesPerView: 5,
			},
			768: {
				slidesPerView: 4,
			}
		}
	});
}

/* Nav Lang */

const navLang = document.querySelector('.nav__lang');

if (navLang) {
	const navLangHead = navLang.querySelector('.nav__lang-head');
	navLangHead.addEventListener('click', e => {
		navLang.classList.toggle('active');
	});
}

/* Burger Lang */

const burgerLang = document.querySelector('.burger__lang');

if (burgerLang) {
	const burgerLangHead = burgerLang.querySelector('.burger__lang-head');
	burgerLangHead.addEventListener('click', e => {
		burgerLang.classList.toggle('active');
	});
}

/* Aminate Page */

const animItems = document.querySelectorAll('.anim-item');

if (animItems.length > 0) {
	const offset = elem => {
		const rect = elem.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
	};

	const animItemsFunc = () => {
		for(let i = 0, length = animItems.length; i < length; i++) {
			const animStart = 4;
			let animItemPoint = window.innerHeight - animItems[i].offsetHeight / animStart;

			if (animItems[i].offsetHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}
			if ((pageYOffset > offset(animItems[i]).top - animItemPoint) && pageYOffset < (offset(animItems[i]).top + animItems[i].offsetHeight)) {
				animItems[i].classList.add('active');
				if (animItems[i].classList.contains('splitting-2')) {
					let delay = 0.1;
					const words = animItems[i].querySelectorAll('.word');
					console.log(words)
					for (let y = 0; y < words.length; y++) {
						words[y].style.animationDelay = delay + 's';
						delay += 0.1;
					}
				}
			}
		}
	};

	window.addEventListener('scroll', animItemsFunc);
	setTimeout(animItemsFunc, 300);
}


/* Slide With Hiding Content */

const headerCover = document.querySelector('.header__cover');
const headerBackground = document.querySelector('.header__anim-background .swiper');

if (headerCover && headerBackground) {
	const speed = 0;
	const delay = 5000;
	let timeouts = [];
	let interval = null;
	const handleSwipe = () => {
		const addHide = setTimeout(() => {
			headerCover.classList.add('hide');
		}, delay - 800);
		const deleteHide = setTimeout(() => {
			headerCover.classList.remove('hide');
		}, delay);
		timeouts[0] = addHide;
		timeouts[1] = deleteHide;
	};
	const a = new Swiper('.header__anim-background .swiper', {
		loop: true,
		speed,
		autoplay: { delay },
		on: {
			init: () => {
				handleSwipe();
				interval = setInterval(handleSwipe, delay);
			}
		},
	});
	window.addEventListener('resize', e => {
		headerCover.classList.remove('hide');
		clearInterval(interval);
		for (let i = 0; i < timeouts.length; i++) {
			clearTimeout(timeouts[i]);
		}
		handleSwipe();
		interval = setInterval(handleSwipe, delay);
	});
}

/* Nav */

if (nav) {
	let prevScroll;
	const fixedMenu = () => {
		if (scrollY > prevScroll && scrollY > nav.offsetHeight) nav.style.transform = 'translate(0, -110%)';
		if (scrollY <= prevScroll) nav.style.transform = 'translate(0, 0)';
		prevScroll = scrollY;
	};
	fixedMenu();
	window.addEventListener('scroll', fixedMenu);
}

/* Burger */

addBurger(document.querySelector('#nav-burger'));

function addBurger(elem) {
	if (elem) {
		const button = document.querySelector('.nav__btn');
		const links = document.querySelectorAll('#' + elem.id + ' .burger__link');
		const menu = document.querySelector('#' + elem.id + ' .burger__menu');
		const bgElem = document.querySelector('#' + elem.id + ' .burger__bg');
		let burgerClose;

		if (button && links && bgElem) {
			burgerClose = document.querySelector('.nav__close-btn');
			burgerClose.addEventListener('click', function(e) {
				elem.classList.remove('active');
				burgBodyUnLock();
				menu.classList.add('keep-property');
				setTimeout(() => {
					menu.classList.remove('keep-property');
				}, 800);
			});

			elem.classList.remove('active');
			burgBodyUnLock();

			button.addEventListener('click', function(e) {
				let popupActive = document.querySelector('.popup.open');

				if (popupActive) {
					closePopup(popupActive, false);
				}

				if (!elem.classList.contains('active')) {
					elem.classList.add('active');
					burgBodyLock();
				}
			});

			for(let i = 0, length = links.length; i < length; i++) {
				links[i].addEventListener('click', function(e) {
					elem.classList.remove('active');
					burgBodyUnLock();
				});
			}

			document.documentElement.addEventListener('click', function(e) {
				if ((!e.target.closest('.burger') && elem.classList.contains('active')) || (e.target.closest('.' + bgElem.classList) && elem.classList.contains('active'))) {
					if (!e.target.closest('.nav__btn') || !e.target.closest('.nav__btn')) {
						elem.classList.remove('active');
						burgBodyUnLock();
						menu.classList.add('keep-property');
						setTimeout(() => {
							menu.classList.remove('keep-property');
						}, 800);
					}
				}
			});
		}
	}
}

function burgBodyLock() {
	let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (fixedPadding.length > 0) {
		for(let i = 0, length = fixedPadding.length; i < length; i++) {
			fixedPadding[i].style.paddingRight = paddingValue;
		}
	}

	body.style.paddingRight = paddingValue;
	body.classList.add('lock');
}

function burgBodyUnLock() {
	setTimeout(helpFunction, 800);
	function helpFunction() {
		if (fixedPadding.length > 0) {
			for(let i = 0, length = fixedPadding.length; i < length; i++) {
				fixedPadding[i].style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}
}

/* Scroll Menu */

const scrollMenu = document.querySelector('.header__menu');
const scrollHeader = document.querySelector('.header');
const scrollingMenu = document.querySelector('#scroll-menu');
let prevScrollMenu;
const fixedMenu = () => {
	if (+window.scrollY.toFixed() >= getCoords(scrollHeader).bottom) {
		if (scrollY <= prevScrollMenu) scrollingMenu.style.transform = 'translate(0, 0)';
		if (scrollY > prevScrollMenu) scrollingMenu.style.transform = 'translate(0, 110%)';
		prevScrollMenu = scrollY;
	} else {
		scrollingMenu.style.transform = 'translate(0, 0)';
	}
};
fixedMenu();
window.addEventListener('scroll', fixedMenu);

const handleScrollMenu = e => {
	let activeMode = null;
	if (+window.scrollY.toFixed() >= getCoords(scrollHeader).bottom) {
		if (activeMode !== 1) {
			scrollingMenu.classList.add('active');
			scrollingMenu.classList.remove('header-menu');
			activeMode = 1;
		}
	} else {
		if (activeMode !== 2) {
			scrollingMenu.classList.remove('active');
			scrollingMenu.classList.add('header-menu');
			activeMode = 2;
		}
	}
};

handleScrollMenu();
window.addEventListener('scroll', handleScrollMenu);