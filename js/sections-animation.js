'use strict';

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

window.addEventListener('DOMContentLoaded', e => {
	const header = document.querySelector('.header');
	const sectionCoverHeader = header.querySelector('.section-cover');
	const handleHeaderScroll = e => {
		const distanceFromStart = window.pageYOffset + header.getBoundingClientRect().top;
		if (window.scrollY > distanceFromStart + header.offsetHeight * .5) {
			sectionCoverHeader.classList.add('hide');
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
	const distanceFromStartAbout = window.pageYOffset + about.getBoundingClientRect().top;
	const distanceFromStartOrder = window.pageYOffset + order.getBoundingClientRect().top;
	let directionMode = null;
	const getDirection = () => {
		if (directionMode !== null) return directionMode;
		if (window.scrollY <= distanceFromStartAbout + about.offsetHeight) return 'top';
		if (window.scrollY > distanceFromStartOrder) return 'bottom';
	};
	const handleAboutScroll = e => {
		const distanceFromStartOrder = +(window.pageYOffset + order.getBoundingClientRect().top).toFixed();
		const distanceFromStartAbout = +(window.pageYOffset + about.getBoundingClientRect().top).toFixed();
		if (window.scrollY > distanceFromStartAbout && window.scrollY < distanceFromStartOrder + order.offsetHeight && !cantHandleScrollAbout) {
			cantHandleScrollAbout = true;
			setTimeout(() => {
				if (getDirection() === 'top') {
					sectionCoverAbout.classList.add('hide');
					setTimeout(() => {
						if (window.scrollY < distanceFromStartOrder) {
							window.scrollTo({
								top: distanceFromStartOrder,
							});
						}
						sectionCoverOrder.classList.remove('hide');
						const handleOutsideScroll = e => {
							if (window.scrollY > distanceFromStartOrder + order.offsetHeight || window.scrollY < distanceFromStartAbout) {
								cantHandleScrollAbout = false;
								directionMode = null;
								window.removeEventListener('scroll', handleOutsideScroll);
							}
							if (window.scrollY < distanceFromStartOrder) {//directionMode === null && 
								console.log(0)
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
								if (window.scrollY > distanceFromStartAbout) {
									window.scrollTo({
										top: distanceFromStartAbout,
									});
								}
								sectionCoverAbout.classList.remove('hide');
								const handleOutsideScroll = e => {
									if (window.scrollY < distanceFromStartAbout) {
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