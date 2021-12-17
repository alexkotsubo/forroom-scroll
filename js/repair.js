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

// Disable Scroll

;(function($) {
	"use strict";

	var instance, proto;

	function UserScrollDisabler($container, options) {
		this.opts = $.extend({
			handleKeys : true,
			scrollEventKeys : [32, 33, 34, 35, 36, 37, 38, 39, 40]
		}, options);

		this.$container = $container;
		this.$document = $(document);
		this.lockToScrollPos = [0, 0];

		this.disable();
	}

	proto = UserScrollDisabler.prototype;

	proto.disable = function() {
		var t = this;

		t.lockToScrollPos = [
			t.$container.scrollLeft(),
			t.$container.scrollTop()
		];

		t.$container.on(
			"mousewheel.disablescroll DOMMouseScroll.disablescroll touchmove.disablescroll",
			t._handleWheel
		);

		t.$container.on("scroll.disablescroll", function() {
			t._handleScrollbar.call(t);
		});

		if(t.opts.handleKeys) {
			t.$document.on("keydown.disablescroll", function(event) {
				t._handleKeydown.call(t, event);
			});
		}
	};

	proto.undo = function() {
		var t = this;
		t.$container.off(".disablescroll");
		if(t.opts.handleKeys) {
			t.$document.off(".disablescroll");
		}
	};

	proto._handleWheel = function(event) {
		event.preventDefault();
	};

	proto._handleScrollbar = function() {
		this.$container.scrollLeft(this.lockToScrollPos[0]);
		this.$container.scrollTop(this.lockToScrollPos[1]);
	};

	proto._handleKeydown = function(event) {
		for (var i = 0; i < this.opts.scrollEventKeys.length; i++) {
			if (event.keyCode === this.opts.scrollEventKeys[i]) {
				event.preventDefault();
				return;
			}
		}
	};

	$.fn.disablescroll = function(method) {
		if( ! instance && (typeof method === "object" || ! method)) {
			instance = new UserScrollDisabler(this, method);
		}
		else if(instance && instance[method]) {
			instance[method].call(instance);
		}

	};

	window.UserScrollDisabler = UserScrollDisabler;
})(jQuery);

function disableScroll() {
	$('.wrapper').onmousewheel = e => {
		e.preventDefault();
		e.stopPropagation();
	};
	$('.wrapper').onscroll = e => {
		e.preventDefault();
		e.stopPropagation();
	};
	$('.wrapper').ontouchmove = e => {
		e.preventDefault();
		e.stopPropagation();
	};
	$(".wrapper").disablescroll();
}

function enableScroll() {
	$('.wrapper').onmousewheel = e => {};
	$('.wrapper').onscroll = e => {};
	$('.wrapper').ontouchmove = e => {};
	$(".wrapper").disablescroll("undo");
}

// Page Scroll

const repairsInner = document.querySelector('.repairs__inner');
const repairsCarts = document.querySelectorAll('.repairs__cart');
const repairsCartsInner = document.querySelectorAll('.repairs__cart-inner');
const repairsCartsContent = document.querySelectorAll('.repairs__cart-content');
const repairsCartsWraps = document.querySelectorAll('.repairs__cart-wrap');

window.addEventListener('DOMContentLoaded', e => {
	if (repairsInner) {
		const scrollToPos = (offset, callback, animation = 'auto') => {
			const fixedOffset = offset.toFixed();
			const onScroll = () => {
				if (window.pageYOffset.toFixed() === fixedOffset) {
					window.removeEventListener('scroll', onScroll);
					callback();
				}
			};
			window.addEventListener('scroll', onScroll);
			onScroll();
			window.scrollTo({
				top: offset,
				behavior: animation
			});
			$('html').animate({ scrollTop: fixedOffset }, animation !== 'auto' ? 300 : 0);
		};
		let prevSlide = 1;
		let prevSlideScroll = 0;
		let speed = 600;
		let cantStartSlider = true;
		let loaded = false;
		let slideCount = 0;
		let distanceFromStart = window.pageYOffset + repairsInner.getBoundingClientRect().top - nav.offsetHeight;
		window.addEventListener('resize', e => {
			distanceFromStart = window.pageYOffset + repairsInner.getBoundingClientRect().top - nav.offsetHeight;
		});
		const isMobile = {
			Android: function() {return navigator.userAgent.match(/Android/i);},
			BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
			iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
			Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
			Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
			any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
		};
		const threshold = 0.5;
		const slider = new Swiper('.repairs__inner', {
			direction: 'vertical',
			allowTouchMove: false,
			autoHeight: true,
			speed,
			slidesPerView: 1,
		});
		const scrolling = {
			disable: () => {
				if (isMobile.any()) slider.allowTouchMove = false;
				else slider.mousewheel.disable();
			},
			enable: () => {
				if (isMobile.any()) slider.allowTouchMove = true;
				else slider.mousewheel.enable();
			}
		};
		const handleNextSlide = slideTo => {
			if (slideTo === 'top') {
				if (repairsCartsContent[slideCount].offsetHeight < repairsCartsWraps[slideCount].offsetHeight) {
					scrolling.disable();
					enableScroll();
					if (Math.floor(repairsCartsContent[slideCount].scrollTop) === 0) {
						scrolling.enable();
						disableScroll();
					} else {
						const handleSlideScroll = e => {
							if (Math.floor(repairsCartsContent[slideCount].scrollTop) === 0) {
								scrolling.enable();
								disableScroll();
								repairsCartsContent[slideCount].removeEventListener('scroll', handleSlideScroll);
							}
						};
						repairsCartsContent[slideCount].addEventListener('scroll', handleSlideScroll);
					}
				}
			} else if (slideTo === 'bottom') {
				if (repairsCartsContent[slideCount].offsetHeight < repairsCartsWraps[slideCount].offsetHeight) {
					scrolling.disable();
					enableScroll();
					if (repairsCartsContent[slideCount].scrollHeight - Math.floor(repairsCartsContent[slideCount].scrollTop) === repairsCartsContent[slideCount].clientHeight) {
						scrolling.enable();
						disableScroll();
					} else {
						const handleSlideScroll = e => {
							if (repairsCartsContent[slideCount].scrollHeight - Math.floor(repairsCartsContent[slideCount].scrollTop) === repairsCartsContent[slideCount].clientHeight) {
								scrolling.enable();
								disableScroll();
								repairsCartsContent[slideCount].removeEventListener('scroll', handleSlideScroll);
							}
						};
						repairsCartsContent[slideCount].addEventListener('scroll', handleSlideScroll);
					}
				}
			}
		};
		const handleOffset = e => {
			if (fixedPadding.length > 0) {
				for(let i = 0, length = fixedPadding.length; i < length; i++) {
					fixedPadding[i].style.paddingRight = '0px';
				}
			}
			body.style.paddingRight = '0px';
			document.querySelector('body').classList.remove('lock');
			scrollToPos(distanceFromStart, () => {
				const paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
				if (fixedPadding.length > 0) {
					for(let i = 0, length = fixedPadding.length; i < length; i++) {
						fixedPadding[i].style.paddingRight = paddingValue;
					}
				}
				body.style.paddingRight = paddingValue;
				document.querySelector('body').classList.add('lock');
			});
		};
		const handleHeight = e => {
			repairsInner.style.minHeight = (document.documentElement.clientHeight - nav.offsetHeight) / document.documentElement.clientHeight * 100 + 'vh';
			repairsInner.style.maxHeight = (document.documentElement.clientHeight - nav.offsetHeight) / document.documentElement.clientHeight * 100 + 'vh';
			for (let i = 0; i < repairsCartsInner.length; i++) {
				repairsCartsInner[i].style.maxHeight = (document.documentElement.clientHeight - nav.offsetHeight) / document.documentElement.clientHeight * 100 + 'vh';
				repairsCartsInner[i].style.minHeight = (document.documentElement.clientHeight - nav.offsetHeight) / document.documentElement.clientHeight * 100 + 'vh';
			}
		};
		handleHeight();
		window.addEventListener('resize', handleHeight);
		const observer = new IntersectionObserver((entries, observer) => {
			if (cantStartSlider) {
				if (!loaded) {
					loaded = true;
					cantStartSlider = false;
				}
			} else {
				distanceFromStart = window.pageYOffset + repairsInner.getBoundingClientRect().top - nav.offsetHeight;
				disableScroll();
				const keepScroll = e => {
					const distance = +(repairsInner.getBoundingClientRect().top).toFixed();
					if (distance < 0 + nav.offsetHeight) {
						window.scrollTo({
							top: distanceFromStart,
						});
					} else {
						const paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
						if (fixedPadding.length > 0) {
							for(let i = 0, length = fixedPadding.length; i < length; i++) {
								fixedPadding[i].style.paddingRight = paddingValue;
							}
						}
						body.style.paddingRight = paddingValue;
						document.querySelector('body').classList.add('lock');
					}
				};
				keepScroll();
				window.addEventListener('scroll', keepScroll);
				setTimeout(() => {
					scrollToPos(distanceFromStart, () => {
						window.addEventListener('resize', handleOffset);
						scrolling.enable();
						window.removeEventListener('scroll', keepScroll);
						if (repairsCartsContent[slideCount].offsetHeight < repairsCartsWraps[slideCount].offsetHeight) {
							scrolling.disable();
							enableScroll();
							if (slideCount + 1 === repairsCarts.length) {
								handleNextSlide('top');
							} else {
								if (prevSlide - 1 > slideCount) {
									handleNextSlide('top');
								} else {
									handleNextSlide('bottom');
								}
							}
						}
					}, 'smooth');
				}, 500);
			}
		}, {
			root: null,
			rootMargin: '0px',
			threshold
		});
		observer.observe(repairsInner);
		const handleEndOfSlider = () => {
			window.removeEventListener('resize', handleOffset);
			scrolling.disable();
			if (fixedPadding.length > 0) {
				for(let i = 0, length = fixedPadding.length; i < length; i++) {
					fixedPadding[i].style.paddingRight = '0px';
				}
			}
			body.style.paddingRight = '0px';
			document.querySelector('body').classList.remove('lock');
			enableScroll();
		};
		repairsCartsContent[0].classList.add('active');
		const handleTopPosition = () => {
			repairsCartsContent[slideCount].classList.add('active');
			if (prevSlide - 1 !== slideCount) {
				repairsCartsContent[prevSlide - 1].classList.remove('active');
			}
			for (let i = 0; i < repairsCartsInner.length; i++) {
				repairsCartsContent[i].style.top = (document.documentElement.clientHeight - nav.offsetHeight) * slideCount + 'px';
			}
		};
		window.addEventListener('resize', handleTopPosition);
		slider.on('slideChangeTransitionStart', slider => {
			slideCount = slider.realIndex;
			handleTopPosition(slider.realIndex);
		});
		slider.on('slideChangeTransitionEnd', slider => {
			const slideIndex = slider.realIndex + 1;
			if (prevSlide > slider.realIndex) {
				if (slider.realIndex !== 0) {
					handleNextSlide('top');
				}
			} else {
				handleNextSlide('bottom');
			}
			if (prevSlide === 2 && 1 === slideIndex) {
				if (repairsCartsContent[slider.realIndex].offsetHeight < repairsCartsWraps[slider.realIndex].offsetHeight) {
					scrolling.disable();
					enableScroll();
					if (Math.floor(repairsCartsContent[slider.realIndex].scrollTop) === 0) {
						cantStartSlider = true;
						window.addEventListener('scroll', function handleCantSlide(e) {
							const distance = +(repairsInner.getBoundingClientRect().top).toFixed();
							console.log(repairsInner.offsetHeight / 100 * (threshold * 100) + 200, distance, -(nav.offsetHeight))
							if (distance > repairsInner.offsetHeight / 100 * (threshold * 100) + 200 || distance < nav.offsetHeight - 30) {
								cantStartSlider = false;
								this.removeEventListener('scroll', handleCantSlide);
							}
						});
						handleEndOfSlider();
					}
				} else {
					cantStartSlider = true;
					window.addEventListener('scroll', function handleCantSlide(e) {
						const distance = +(repairsInner.getBoundingClientRect().top).toFixed();
						console.log(repairsInner.offsetHeight / 100 * (threshold * 100) + 200, distance, -(nav.offsetHeight))
						if (distance > repairsInner.offsetHeight / 100 * (threshold * 100) + 200 || distance < nav.offsetHeight - 30) {
							cantStartSlider = false;
							this.removeEventListener('scroll', handleCantSlide);
						}
					});
					handleEndOfSlider();
				}
			}
			if (repairsCarts.length === slideIndex) {
				if (repairsCartsContent[slider.realIndex].offsetHeight < repairsCartsWraps[slider.realIndex].offsetHeight) {
					scrolling.disable();
					enableScroll();
					if (repairsCartsContent[slider.realIndex].scrollHeight - Math.floor(repairsCartsContent[slider.realIndex].scrollTop) === repairsCartsContent[slider.realIndex].clientHeight) {
						scrolling.enable();
						disableScroll();
					} else {
						const handleSlideScroll = e => {
							if (repairsCartsContent[slider.realIndex].scrollHeight - Math.floor(repairsCartsContent[slider.realIndex].scrollTop) === repairsCartsContent[slider.realIndex].clientHeight) {
								cantStartSlider = true;
								repairsCartsContent[slider.realIndex].removeEventListener('scroll', handleSlideScroll);
								window.addEventListener('scroll', function handleCantSlide(e) {
									const distance = +(repairsInner.getBoundingClientRect().top).toFixed();
									if (distance < -(repairsInner.offsetHeight / 100 * (threshold * 100)) - 50 || distance > nav.offsetHeight + 50) {
										cantStartSlider = false;
										this.removeEventListener('scroll', handleCantSlide);
									}
								});
								handleEndOfSlider();
							}
						};
						handleSlideScroll();
						repairsCartsContent[slider.realIndex].addEventListener('scroll', handleSlideScroll);
					}
				} else {
					cantStartSlider = true;
					window.addEventListener('scroll', function handleCantSlide(e) {
						const distance = +(repairsInner.getBoundingClientRect().top).toFixed();
						if (distance < -(repairsInner.offsetHeight / 100 * (threshold * 100)) - 50 || distance > nav.offsetHeight + 50) {
							cantStartSlider = false;
							this.removeEventListener('scroll', handleCantSlide);
						}
					});
					handleEndOfSlider();
				}
			}
			repairsCartsContent[prevSlideScroll].scrollTo({ top: 0 });
			prevSlideScroll = slider.realIndex;
			prevSlide = slideIndex;
		});
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