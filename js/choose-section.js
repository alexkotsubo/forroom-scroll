// Choose

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

window.addEventListener('DOMContentLoaded', e => {
	const section = document.querySelector('.choose');
	const getScrollWindow = () => {
		if (document.documentElement.clientWidth > 1024) return document.querySelector('.choose__scroll-inner');
		if (document.documentElement.clientWidth <= 1024) return document.querySelector('.choose__scroll-content');
	};
	const threshold = 0.5;
	let cantStartFix = false;
	let canWork = false;
	let direction = null;
	const observer = new IntersectionObserver((entries, observer) => {
		if (section) {
			if (canWork) {
				if (!cantStartFix) {
					let distanceFromStart = window.pageYOffset + section.getBoundingClientRect().top;
					window.addEventListener('resize', e => {
						distanceFromStart = window.pageYOffset + section.getBoundingClientRect().top;
					});
					disableScroll();
					const scrollToPos = (offset, animation = 'auto', callback) => {
						const fixedOffset = offset.toFixed();
						if (callback) {
							const onScroll = () => {
								if (window.pageYOffset.toFixed() === fixedOffset) {
									window.removeEventListener('scroll', onScroll);
									callback();
								}
							};
							window.addEventListener('scroll', onScroll);
							onScroll();
						}
						window.scrollTo({
							top: offset,
							behavior: animation
						});
						$('html').animate({ scrollTop: fixedOffset }, animation !== 'auto' ? 300 : 0);
					};
					const keepScroll = e => {
						const distance = +(section.getBoundingClientRect().top).toFixed();
						const condition = () => {
							if (direction === 'top') return distance < 0;
							if (direction === 'bottom') return distance > 0;
						};
						if (condition()) {
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
							window.removeEventListener('scroll', keepScroll);
						}
					};
					keepScroll();
					window.addEventListener('scroll', keepScroll);
					setTimeout(() => {
						scrollToPos(distanceFromStart, 'smooth', () => {
							enableScroll();
							getScrollWindow().classList.add('active');
							if (getScrollWindow().scrollHeight - Math.floor(getScrollWindow().scrollTop) === getScrollWindow().clientHeight
								|| getScrollWindow().scrollHeight - Math.floor(getScrollWindow().scrollTop) - 1 === getScrollWindow().clientHeight) direction = 'bottom';
							if (Math.floor(getScrollWindow().scrollTop) === 0) direction = 'top';
							if (direction === 'bottom') {
								nav.style.transform = 'translate(0, -110%)';
								scrollingMenu.classList.remove('active');
								scrollingMenu.style.transform = 'translate(0, 110%)';
							}
							const handleInnerScroll = e => {
								if (document.documentElement.clientWidth > 1024) document.querySelector('.choose__scroll-content').removeEventListener('scroll', handleInnerScroll);
								if (document.documentElement.clientWidth <= 1024) document.querySelector('.choose__scroll-inner').removeEventListener('scroll', handleInnerScroll);
								if (direction === 'top') {
									if (getScrollWindow().scrollHeight - Math.floor(getScrollWindow().scrollTop) === getScrollWindow().clientHeight
										|| getScrollWindow().scrollHeight - Math.floor(getScrollWindow().scrollTop) - 1 === getScrollWindow().clientHeight) {
										getScrollWindow().classList.remove('active');
										if (fixedPadding.length > 0) {
											for(let i = 0, length = fixedPadding.length; i < length; i++) {
												fixedPadding[i].style.paddingRight = '0px';
											}
										}
										body.style.paddingRight = '0px';
										document.querySelector('body').classList.remove('lock');
										canWork = false;
										getScrollWindow().removeEventListener('scroll', handleInnerScroll);
										const handleStartFix = e => {
											const distance = -(+(section.getBoundingClientRect().top).toFixed());
											if (distance > document.documentElement.clientHeight * (threshold + 0.1) || distance < -(document.documentElement.clientHeight * (threshold + 0.1))) {
												cantStartFix = false;
												window.removeEventListener('scroll', handleStartFix);
												if (distance > 0) {
													direction = 'bottom';
												} else {
													direction = 'top';
												}
											} else {
												cantStartFix = true;
											}
										};
										window.addEventListener('scroll', handleStartFix);
									}
								} else if (direction === 'bottom') {
									if (Math.floor(getScrollWindow().scrollTop) === 0) {
										getScrollWindow().classList.remove('active');
										if (fixedPadding.length > 0) {
											for(let i = 0, length = fixedPadding.length; i < length; i++) {
												fixedPadding[i].style.paddingRight = '0px';
											}
										}
										body.style.paddingRight = '0px';
										document.querySelector('body').classList.remove('lock');
										canWork = false;
										getScrollWindow().removeEventListener('scroll', handleInnerScroll);
										const handleStartFix = e => {
											const distance = +(section.getBoundingClientRect().top).toFixed();
											if (distance > document.documentElement.clientHeight * (threshold + 0.1) || distance < -(document.documentElement.clientHeight * (threshold + 0.1))) {
												cantStartFix = false;
												window.removeEventListener('scroll', handleStartFix);
												if (distance > 0) {
													direction = 'top';
												} else {
													direction = 'bottom';
												}
											} else {
												cantStartFix = true;
											}
										};
										window.addEventListener('scroll', handleStartFix);
									}
								}
							};
							getScrollWindow().addEventListener('scroll', handleInnerScroll);
						});
					}, 50);
				}
			} else {
				canWork = true;
			}
		}
	}, {
		root: null,
		threshold
	});
	observer.observe(section);
});

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