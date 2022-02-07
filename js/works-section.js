'use strict';

// Works Carts

window.addEventListener('DOMContentLoaded', e => {
	const worksCarts = document.querySelectorAll('.works__cart');
	if (worksCarts.length > 0) {
		const isMobile = {
			Android: function() {return navigator.userAgent.match(/Android/i);},
			BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
			iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
			Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
			Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
			any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
		};
		
		if (isMobile.any()) {
			for (let i = 0; i < worksCarts.length; i++) {
				worksCarts[i].classList.add('active');
			}
		} else {
			for (let i = 0; i < worksCarts.length; i++) {
				worksCarts[i].classList.remove('active');
			}
		}
	}
});