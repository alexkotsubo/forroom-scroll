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
 
const vh = window.innerHeight * 0.01;
let prevWidth =  document.documentElement.clientWidth;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', e => {
	if (document.documentElement.clientWidth !== prevWidth) {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		prevWidth = document.documentElement.clientWidth;
	}
});

/* Rellax */

if (document.querySelectorAll('.rellax').length > 0) {
	const rellaxPhotos = document.querySelectorAll('.rellax');
	
	const rellax = new Rellax('.rellax', {
		center: true,
		speed: -3,
	});
	
	const rellaxResize = e => {
		for (let i = 0; i < rellaxPhotos.length; i++) {
			const src = rellaxPhotos[i].querySelector('.ib_use').getAttribute('src');
			if (src) rellaxPhotos[i].style.backgroundImage = 'url(' + src + ')';
		}
	};
	
	window.addEventListener('resize', rellaxResize);
	window.addEventListener('scroll', e => {
		rellax.refresh();
		rellaxResize();
	});
}

/* Anchors */

const anchors = document.querySelectorAll('a');

for(let i = 0, length = anchors.length; i < length; i++) {
	anchors[i].addEventListener('click', function(e) {
		if (anchors[i].getAttribute('href') !== '#' &&
				anchors[i].getAttribute('href').trim() &&
				anchors[i].getAttribute('href').substr(0, 1) === '#' &&
				document.querySelector(anchors[i].getAttribute('href'))) {
			e.preventDefault();
			let anchorID = anchors[i].getAttribute('href');

			function scrollValue() {
				if (nav != undefined) {
					if (document.querySelector(anchorID).offsetTop > pageYOffset) {
						return document.querySelector(anchorID).offsetTop;
					}

					if (document.querySelector(anchorID).offsetTop <= pageYOffset) {
						return document.querySelector(anchorID).offsetTop - nav.offsetHeight;
					}
				} else {
					return document.querySelector(anchorID).offsetTop;
				}
			}
			
			window.scrollTo({
				top: scrollValue(),
				behavior: 'smooth'
			});
		}
	});
}

/* Popup */

const popupBtn = document.querySelectorAll('[data-open-popup]');
const closePopupBtn = document.querySelectorAll('.popup__close');

const centerPopup = e => {
	for (let i = 0; i < popupBody.length; i++) {
		const value = (document.documentElement.clientHeight - popupBody[i].offsetHeight) / 2;
		if (value < 0) {
			popupBody[i].style.marginTop = '0px';
			continue;
		}
		popupBody[i].style.marginTop = value + 'px';
	}
};

window.addEventListener('resize', centerPopup);

const closePopup = elem => {
	elem.classList.remove('open');
	body.classList.remove('lock');
};

const openPopup = elem => {
	if (elem) {
		centerPopup();
		const popupActive = document.querySelector('.popup.open');

		if (popupActive) closePopup(popupActive, false);
		else body.classList.add('lock');

		elem.classList.add('open');
		elem.addEventListener('click', e => {
			if (!e.target.closest('.popup__body')) closePopup(e.target.closest('.popup'));
		});
	}
};

if (popupBtn.length > 0) {
	for (let i = 0, length = popupBtn.length; i < length; i++) {
		popupBtn[i].addEventListener('click', e => {
			openPopup(document.getElementById(popupBtn[i].getAttribute('data-open-popup')));
		});
	}
}

if (closePopupBtn.length > 0) {
	for (let i = 0, length = closePopupBtn.length; i < length; i++) {
		closePopupBtn[i].addEventListener('click', e => {
			closePopup(closePopupBtn[i].closest('.popup'));
		});
	}
}

document.addEventListener('keydown', e => {
	if (e.which === 27) closePopup(document.querySelector('.popup.open'));
});

const popupBody = document.querySelectorAll('.popup__body');

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

/* Input Mask */

window.addEventListener('DOMContentLoaded', e => {
	const inputs = [
		...(document.querySelectorAll('.block-input .inputmask')),
	];
	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i]) {
			const im = new Inputmask("+380 (99) 999 - 99 - 99");
			im.mask(inputs[i]);
		}
	}
});

/* Select 2 */

window.addEventListener('DOMContentLoaded', e => {
	const selects = [
		...(document.querySelectorAll('.block-select')),
	];
	let activeSelect = null;
	for (let i = 0; i < selects.length; i++) {
		const select = selects[i];
		if (select) {
			const nav = select.querySelector('.block-select__nav');
			const selected = select.querySelector('.block-select__selected');
			const list = select.querySelector('.block-select__list');
			const options = select.querySelectorAll('.block-select__list span');
			let prev = null;

			selected.innerHTML = select.getAttribute('data-placeholder') ? select.getAttribute('data-placeholder') : '';

			for (let i = 0; i < options.length; i++) {
				if (options[i].getAttribute('data-selected') === 'selected') {
					selected.innerHTML = options[i].innerHTML;
					options[i].classList.add('active');
					prev = i;
				}
				options[i].addEventListener('click', e => {
					if (prev !== null) {
						options[prev].classList.remove('active');
					}
					selected.innerHTML = options[i].innerHTML;
					options[i].classList.add('active');
					select.classList.remove('active');
					activeSelect = null;
					prev = i;
				});
			}

			nav.addEventListener('click', e => {
				if (select.classList.contains('active')) {
					select.classList.remove('active');
					activeSelect = null;
				} else {
					select.classList.add('active');
					if (document.documentElement.clientHeight - nav.getBoundingClientRect().bottom < list.offsetHeight) {
						select.classList.add('block-select_top');
					} else {
						select.classList.remove('block-select_top');
					}
					if (activeSelect !== null) selects[activeSelect].classList.remove('active');
					activeSelect = i;
				}
			});
		}
	}
	document.documentElement.addEventListener('click', e => {
		if (!e.target.closest('.block-select') && activeSelect !== null) {
			selects[activeSelect].classList.remove('active');
			activeSelect = null;
		}
	});
});

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
	const delay = 7500;
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
	const swiper = new Swiper('.header__anim-background .swiper', {
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
		swiper.autoplay.stop();
		headerCover.classList.remove('hide');
		clearInterval(interval);
		for (let i = 0; i < timeouts.length; i++) {
			clearTimeout(timeouts[i]);
		}
		swiper.autoplay.start();
		handleSwipe();
		interval = setInterval(handleSwipe, delay);
	});
}

/* Nav */

let cantShowNav = false;
if (nav) {
	let prevScroll;
	const fixedMenu = () => {
		if (!cantShowNav) {
			if (scrollY > prevScroll && scrollY > nav.offsetHeight) nav.style.transform = 'translate(0, -110%)';
			if (scrollY <= prevScroll) nav.style.transform = 'translate(0, 0)';
		}
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

			// for(let i = 0, length = links.length; i < length; i++) {
			// 	links[i].addEventListener('click', function(e) {
			// 		elem.classList.remove('active');
			// 		burgBodyUnLock();
			// 	});
			// }

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

			let active = 0;
			let isOpened = false;
			let tapCount = 0;
			let count = 0;
			let prev = null;
			let notPrevent = false;
			const submenus = nav.querySelectorAll('.burger__list .has-submenu');
			const submenuLinks = nav.querySelectorAll('.burger__list .has-submenu > a');
			const handleClick = i => {
				if (submenuLinks[i]) {
					submenuLinks[i].addEventListener('click', e => {
						if (prev === i) {
							notPrevent = true;
						}
						if (!notPrevent) {
							submenus[active].classList.remove('active');
							e.preventDefault();
							if (tapCount === 1) {
								tapCount = 1;
							} else {
								tapCount = 0;
							}
							submenus[i].classList.add('active');
							active = i;
							isOpened = true;
						}
					}, { once: true });
				}
			};
	
			if (submenuLinks.length > 0) {
				for (let i = 0; i < submenuLinks.length; i++) {
					handleClick(i);
				}
			}
	
			document.documentElement.addEventListener('click', e => {
				if (elem.classList.contains('active')) {
					if (tapCount === 1 && e.target.tagName === 'A') {
						let index = null;
						for (let i = 0; i < submenuLinks.length; i++) {
							if (submenus[i].classList.contains('active')) {
								index = i;
							}
						}
						if (e.target.parentNode.classList.contains('active')) {
							submenus[active].classList.remove('active');
							tapCount = 0;
							handleClick(index);
							return;
						} else {
							handleClick(index);
						}
					}
					if (e.target.tagName === 'A') {
						if (count === 1 && e.target.parentNode.classList.contains('active')) {
							notPrevent = true;
						}
						let index = null;
						for (let i = 0; i < submenuLinks.length; i++) {
							if (submenus[i].classList.contains('active')) {
								index = i;
							}
						}
						handleClick(index);
						prev = index;
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
const scrollBody = document.querySelector('.header__body');
const scrollHeader = document.querySelector('.header');
const scrollingMenu = document.querySelector('.menus');
let cantShowMenu = false;
let prevScrollMenu;

if (scrollingMenu) {
	const fixedMenu = () => {
			if (+window.scrollY.toFixed() >= getCoords(scrollHeader).bottom) {
				if (!cantShowMenu) {
					if (scrollY <= prevScrollMenu) scrollingMenu.style.transform = 'translate(0, 0)';
					if (scrollY > prevScrollMenu) scrollingMenu.style.transform = 'translate(0, 110%)';
				}
				prevScrollMenu = scrollY;
			} else {
				if (!cantShowMenu) {
					scrollingMenu.style.transform = 'translate(0, 0)';
				}
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

	const handleBodyPadding = e => scrollBody.style.paddingBottom = scrollingMenu.offsetHeight + 'px';
	handleBodyPadding();
	window.addEventListener('resize', handleBodyPadding);
}

/* Stili */

const stiliSlide = document.querySelectorAll('.stili__slide');

window.addEventListener('DOMContentLoaded', e => {
	if (stiliSlide.length > 0) {
		const width = 1023;
		const duration = 700;
		let timeout = null;
		let nextFunc = null;
		if (document.documentElement.clientWidth > width) {
			nextFunc = 1;
		} else {
			nextFunc = 2;
		}
		let startFrom = +document.querySelector('.stili__slides').getAttribute('data-start-from') || 1;
		if (typeof startFrom === 'number') {
			startFrom -= 1;
			if (startFrom > stiliSlide.length - 1) startFrom = stiliSlide.length - 1;
			if (startFrom < 0) startFrom = 0;
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
			if (document.documentElement.clientWidth > width) {
				if (nextFunc === 1) {
					timeout = setTimeout(() => {
						if (stiliSlide.length) {
							for (let i = 0; i < stiliSlide.length; i++) {
								stiliSlide[i].classList.remove('active');
								stiliSlide[i].style.height = 'unset';
							}
							let prev = startFrom;
							let cantSlide = false;
							const wraps = document.querySelectorAll('.stili__slide-wrap');
							const names = document.querySelectorAll('.stili__slide-name');
							stiliSlide[prev].classList.add('active');
							let width = stiliSlide[prev].offsetWidth - names[prev].offsetWidth + 'px';
							wraps[prev].style.width = width;
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
						
								if (i !== prev) wraps[i].style.width = '0px';
					
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
									if (document.documentElement.clientWidth <= width) {
										window.removeEventListener('resize', setWidth);
										this.removeEventListener('resize', handleWidth);
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
							stiliSlide[i].style.height = '58px';
						}
						let prev = startFrom;
						const names = document.querySelectorAll('.stili__slide-name');
						const wrap = document.querySelectorAll('.stili__slide-wrap');
						stiliSlide[prev].classList.add('active');
						stiliSlide[prev].style.height = wrap[prev].offsetHeight + 'px';
						for (let i = 0; i < names.length; i++) {
							names[i].onclick = e => {
								if (i !== prev) {
									stiliSlide[i].classList.add('active');
									stiliSlide[i].style.height = wrap[i].offsetHeight + 'px';
									stiliSlide[prev].style.height = '58px';
									stiliSlide[prev].classList.remove('active');
									prev = i;
								}
							};

							const handleWidth = e => {
								if (document.documentElement.clientWidth > width) {
									this.removeEventListener('resize', handleWidth);
									names[i].onclick = e => {};
								}
							};

							window.addEventListener('resize', handleWidth);
						}
						window.addEventListener('resize', e => {
							for (let i = 0; i < stiliSlide.length; i++) {
								if (stiliSlide[i].classList.contains('active')) {
									stiliSlide[i].style.height = wrap[i].offsetHeight + 'px';
								} else {
									stiliSlide[i].style.height = '58px';
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
	}
});

/* Open Menu */

if (nav) {// && document.documentElement.clientWidth > 1070
	const isMobile = {
		Android: function() {return navigator.userAgent.match(/Android/i);},
		BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
		iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
		Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
		Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
		any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
	};
	let active = 0;
	let isOpened = false;
	let tapCount = 0;
	let count = 0;
	let prev = null;
	let notPrevent = false;
	
	if (isMobile.any()) {
		const submenus = nav.querySelectorAll('.nav__menus .has-submenu');
		const links = nav.querySelectorAll('.nav__menus .has-submenu > a');
		const handleClick = i => {
			if (links[i]) {
				links[i].addEventListener('click', e => {
					if (prev === i) {
						notPrevent = true;
					}
					if (!notPrevent) {
						submenus[active].classList.remove('active');
						e.preventDefault();
						if (tapCount === 1) {
							tapCount = 1;
						} else {
							tapCount = 0;
						}
						submenus[i].classList.add('active');
						active = i;
						isOpened = true;
					}
				}, { once: true });
			}
		};

		if (links.length > 0) {
			for (let i = 0; i < links.length; i++) {
				handleClick(i);
			}
		}

		document.documentElement.addEventListener('click', e => {
			if (!document.querySelector('#nav-burger').classList.contains('active')) {
				if (e.target.tagName !== 'A') {
					submenus[active].classList.remove('active');
					tapCount = 0;
					handleClick(active);
					prev = null;
					return;
				}
				if (tapCount === 1 && e.target.tagName === 'A') {
					let index = null;
					for (let i = 0; i < links.length; i++) {
						if (submenus[i].classList.contains('active')) {
							index = i;
						}
					}
					if (e.target.parentNode.classList.contains('active')) {
						submenus[active].classList.remove('active');
						tapCount = 0;
						handleClick(index);
						return;
					} else {
						handleClick(index);
					}
				}
				if (e.target.tagName === 'A') {
					if (count === 1 && e.target.parentNode.classList.contains('active')) {
						notPrevent = true;
					}
					let index = null;
					for (let i = 0; i < links.length; i++) {
						if (submenus[i].classList.contains('active')) {
							index = i;
						}
					}
					handleClick(index);
					prev = index;
				}
			}
		});
	}
}

// Test Popup

window.addEventListener('DOMContentLoaded', e => {
	const popup = document.querySelector('.test-popup');
	if (popup) {
		const slides = document.querySelectorAll('.test-popup__slide');
		const body = document.querySelector('.test-popup__body');
		let prev = 0;
		const delay = 400;
	
		const closeSlide = index => {
			if (slides[index]) {
				slides[index].classList.remove('active');
				prev = null;
			}
		};
	
		const openSlide = index => {
			if (slides[index]) {
				if (prev !== null) {
					closeSlide(prev);
				}
				slides[index].classList.add('active');
				prev = index;
				handleBodyHeight();
			}
		};

		const handleBodyHeight = e => {
			body.style.minHeight = slides[prev].offsetHeight + 'px';
		};
		handleBodyHeight();
		window.addEventListener('resize', handleBodyHeight);
	
		body.addEventListener('submit', e => {
			e.preventDefault();
			openSlide(prev + 1);
		});
	
		for (let i = 0; i < slides.length; i++) {
			if (prev === i) openSlide(i);
			const dots = slides[i].querySelector('.test-popup__dots');
			const list = slides[i].querySelector('.test-popup__list');
			const btn = slides[i].querySelector('.test-popup__prev');
			const home = slides[i].querySelector('.test-popup__home');
			if (dots) {
				for (let y = 0; y < slides.length - 1; y++) {
					const span = document.createElement('span');
					if (y <= i) span.classList.add('active');
					dots.appendChild(span);
				}
			}
			if (list) {
				const inputs = slides[i].querySelectorAll('input[type=radio]');
				for (let y = 0; y < inputs.length; y++) {
					inputs[y].addEventListener('click', e => {
						openSlide(i + 1);
						for (let a = 0; a < inputs.length; a++) {
							inputs[a].setAttribute('disabled', 'disabled');
						}
						setTimeout(() => {
							for (let a = 0; a < inputs.length; a++) {
								inputs[a].removeAttribute('disabled');
							}
						}, delay);
					});
				}
			}
			if (btn) {
				if (i !== 0) {
					btn.addEventListener('click', e => {
						openSlide(i - 1);
					});
				} else {
					btn.addEventListener('click', e => {
						closePopup(popup);
					});
				}
			}
			if (home) {
				home.addEventListener('click', e => {
					closePopup(popup);
					closeSlide(prev);
				});
			}
		}

		const section = document.querySelector('.portfolio');
		const handleScroll = e => {
			const distance = +(section.getBoundingClientRect().top).toFixed();
			if (distance < document.documentElement.clientHeight / 2) {
				openPopup(popup);
				window.removeEventListener('scroll', handleScroll);
			}
		};
		handleScroll();
		window.addEventListener('scroll', handleScroll);

		let mousePosition = { x: null, y: null };
		window.addEventListener('mousemove', e => {
			mousePosition.x = e.clientX;
			mousePosition.y = e.clientY;
		});

		let cantSetTimeouts = false;
		const handlePageCancel = e => {
			if (e.clientY < 100) {
				if (!cantSetTimeouts) {
					setTimeout(() => {
						if (mousePosition.y < 100) {
							if (mousePosition.y < 30) {
								openPopup(popup);
								// TODO: closepopup cantSetTimeouts = false;
								// TODO: body lock header slider is b
								// TODO: openTestPopup no after section
								// TODO: header animation
								// TODO: onClosePopup what to do
							} else {
								cantSetTimeouts = false;
							}
						} else {
							cantSetTimeouts = false;
						}
					}, 1000);
					window.removeEventListener('scroll', handlePageCancel);
					cantSetTimeouts = true;
				}
			}
		};
		window.addEventListener('mousemove', handlePageCancel);
	}
});

// Choose

window.addEventListener('DOMContentLoaded', e => {
	const chooseSection = document.querySelector('.choose');
	if (chooseSection) {
		window.addEventListener('scroll', e => {
			const distance = +(chooseSection.getBoundingClientRect().top).toFixed();
			if (distance <= 0 && -(chooseSection.offsetHeight - window.innerHeight) <= distance) {
				cantShowMenu = true;
				cantShowNav = true;
				nav.style.transform = 'translate(0, -110%)';
				scrollingMenu.classList.remove('active');
				scrollingMenu.style.transform = 'translate(0, 110%)';
			} else {
				cantShowMenu = false;
				cantShowNav = false;
			}
		});
	}

	const chooseCartWrap = document.querySelectorAll('.choose__cart-wrap');
	if (chooseCartWrap.length > 0) {
		let prev = null;
		const isMobile = {
			Android: function() {return navigator.userAgent.match(/Android/i);},
			BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
			iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
			Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
			Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
			any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
		};
		
		if (isMobile.any()) {
			for (let i = 0; i < chooseCartWrap.length; i++) {
				chooseCartWrap[i].addEventListener('click', e => {
					if (prev !== null) {
						chooseCartWrap[prev].classList.remove('active');
					}
					chooseCartWrap[i].classList.add('active');
					prev = i;
				});
			}
			document.documentElement.addEventListener('click', e => {
				if (!e.target.closest('.choose__carts')) {
					if (prev !== null) {
						chooseCartWrap[prev].classList.remove('active');
					}
				}
			});
		}
	}
});