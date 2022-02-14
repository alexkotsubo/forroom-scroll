'use strict';

window.addEventListener('DOMContentLoaded', e => {
	const commandCartWrap = document.querySelectorAll('.command__cart-wrap');
	if (commandCartWrap.length > 0) {
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
			for (let i = 0; i < commandCartWrap.length; i++) {
				commandCartWrap[i].addEventListener('click', e => {
					if (prev !== null) {
						commandCartWrap[prev].classList.remove('active');
					}
					commandCartWrap[i].classList.add('active');
					prev = i;
				});
			}
			document.documentElement.addEventListener('click', e => {
				if (!e.target.closest('.command__carts')) {
					if (prev !== null) {
						commandCartWrap[prev].classList.remove('active');
					}
				}
			});
		}
	}
});