'use strict';

const paymentCarts = document.querySelectorAll('.payment__cart');

const msnry = new Masonry('.payment__carts', {
	itemSelector: '.payment__cart',
	columnWidth: '.payment-sizer',
	percentPosition: true,
});