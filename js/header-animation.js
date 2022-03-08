'use strict';

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
	let prevScroll = window.scrollY;
	let toShowHeader = false;
	let canLetOpenHeader = false;
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
		$('html').animate({ scrollTop: fixedOffset }, 900);
	};
	const handleHeaderScroll = e => {
		const distanceFromStart = +(window.pageYOffset + header.getBoundingClientRect().top).toFixed();
		const distanceToEnd = +(window.pageYOffset + header.getBoundingClientRect().bottom).toFixed();
		if (canLetOpenHeader && toShowHeader && window.scrollY < distanceToEnd) {
			canLetOpenHeader = false;
			sectionCoverHeader.classList.remove('hide');
			return;
		}
		if (!canLetOpenHeader && window.scrollY < distanceFromStart + header.offsetHeight * .2) {
			toShowHeader = false;
		}
		if (!toShowHeader && window.scrollY > distanceFromStart + header.offsetHeight * .2) {
			sectionCoverHeader.classList.add('hide');
			toShowHeader = true;
			disableScroll();
			setTimeout(() => {
				setTimeout(() => {
					canLetOpenHeader = true;
					enableScroll();
				}, 900);
				scrollToPos(distanceToEnd, () => {}, 'smooth');
			}, 100);
		}
		if (!canLetOpenHeader && window.scrollY > distanceToEnd) {
			canLetOpenHeader = true;
		}
		prevScroll = window.scrollY;
	};
	handleHeaderScroll();
	window.addEventListener('scroll', handleHeaderScroll);
});