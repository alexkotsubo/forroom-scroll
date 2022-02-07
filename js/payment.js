'use strict';

window.addEventListener('DOMContentLoaded', e => {
	const paymentCarts = document.querySelectorAll('.payment__cart');
	const paymentCartWraps = document.querySelectorAll('.payment__cart-wrap');
	
	const msnry = new Masonry('.payment__carts', {
		itemSelector: '.payment__cart',
		columnWidth: '.payment-sizer',
		percentPosition: true,
	});
	
	let beginFromRow = 0;
	let paymentRow = 4 + beginFromRow;
	const setRowHeight = () => {
		let maxHeightCart = null;
		console.log(beginFromRow, paymentRow)
		if (paymentRow !== paymentCarts.length) {
			for (let i = beginFromRow; i < paymentRow; i++) {
				if (maxHeightCart < paymentCartWraps[i].offsetHeight) {
					maxHeightCart = paymentCartWraps[i].offsetHeight;
				}
				if (i === paymentRow - 1) {
					for (let y = 0; y < paymentRow; y++) {
						paymentCartWraps[y].style.minHeight = maxHeightCart + 'px';
					}
					beginFromRow += 4;
					paymentRow = 4 + beginFromRow;
					setRowHeight();
				}
			}
		}
	};
	setRowHeight();
	
	msnry.layout();
});