'use strict';

if (document.querySelector('.project__carts')) {
	window.addEventListener('DOMContentLoaded', e => {
		const parent = document.querySelector('.project__carts');
		const msnry = new Masonry('.project__carts', {
			itemSelector: '.project__cart',
			columnWidth: '.project-sizer',
			percentPosition: true,
		});

		let nextCarts = 0;
		let theresNoCarts = 0;
		const projectCarts = document.querySelector('.project__carts');
		const cartsInOnelayout = 12 - 1;
		const sizes = {
			height: () => {
				const values = projectCarts.getAttribute('data-heights').split(', ');
				for (let i = 0; i < values.length; i++) {
					values[i] = +values[i];
				}
				return values;
			},
			width: () => {
				const values = projectCarts.getAttribute('data-widths').split(', ');
				for (let i = 0; i < values.length; i++) {
					values[i] = +values[i];
				}
				return values;
			},
		};

		const carts = document.querySelectorAll('.project__cart');
		const heights = sizes.height();
		const widths = sizes.width();
		const layoutCarts = () => {
			for (let i = 0; i < heights.length; i++) {
				if (heights[i] + nextCarts > carts.length - 1 - theresNoCarts) break;
				carts[heights[i] + nextCarts].classList.add('project-item_height2');
			}
			for (let i = 0; i < widths.length; i++) {
				if (widths[i] + nextCarts > carts.length - 1 - theresNoCarts) break;
				carts[widths[i] + nextCarts].classList.add('project-item_width2');
			}
			if (theresNoCarts === 0) {
				if (nextCarts + cartsInOnelayout < carts.length - 1) {
					nextCarts += cartsInOnelayout + 1;
					layoutCarts();
					if (nextCarts + cartsInOnelayout < carts.length - 1) theresNoCarts = (nextCarts + cartsInOnelayout * 2) - (carts.length - 2);
				}
			} else {
				layoutCarts();
			}
		};
		layoutCarts();

		msnry.layout();
		lightGallery(parent);
	});
}