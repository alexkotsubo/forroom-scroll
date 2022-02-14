'use strict';

window.addEventListener('DOMContentLoaded', e => {
	const paymentCarts = document.querySelectorAll('.payment__cart');
	const paymentCartWraps = document.querySelectorAll('.payment__cart-wrap');

	let cartsInRow = 4;
	let beginFromRow = 0;
	let paymentRow = cartsInRow + beginFromRow;
	const setRowHeight = () => {
		let maxHeightCart = 0;
		if (beginFromRow < paymentCarts.length) {
			for (let i = beginFromRow; i < paymentRow; i++) {
				if (i < paymentCarts.length) {
					if (maxHeightCart < paymentCartWraps[i].offsetHeight) {
						maxHeightCart = paymentCartWraps[i].offsetHeight;
					}
					if (i === paymentRow - 1) {
						for (let y = beginFromRow; y < paymentRow; y++) {
							paymentCartWraps[y].style.minHeight = maxHeightCart + 'px';
						}
						beginFromRow += cartsInRow;
						paymentRow = cartsInRow + beginFromRow;
						setRowHeight();
					}
				}
			}
		}
	};
	setRowHeight();
	
	window.addEventListener('resize', e => {
		if (document.documentElement.clientWidth < 1024) {
			cartsInRow = 2;
			beginFromRow = 0;
			setRowHeight();
		} else {
			cartsInRow = 4;
			beginFromRow = 0;
			setRowHeight();
		}
	});

	const msnry = new Masonry('.payment__carts', {
		itemSelector: '.payment__cart',
		columnWidth: '.payment-sizer',
		percentPosition: true,
	});
});