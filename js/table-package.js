'use strict';

window.addEventListener('DOMContentLoaded', e => {
	const table = document.querySelector('.table-package');
	const thead = table.querySelectorAll('thead a');
	const tfoot = table.querySelectorAll('tfoot a');
	const tbody = table.querySelectorAll('tbody a');
	const td = table.querySelectorAll('tbody td');
	let activeColumn = +table.getAttribute('data-active-column');
	const step = thead.length;
	const leftBlock = table.querySelector('.table-package__left');
	const leftSpans = table.querySelectorAll('.table-package__left > span');
	let leftSpansCount = 0;
	let leftSpansStep = step;

	const handleResize = e => {
		leftBlock.style.marginTop = table.querySelector('thead > tr:first-child').offsetHeight + 'px';
		for (let i = 0; i < td.length; i++) {
			if (i === leftSpansStep) {
				leftSpansStep += step;
				leftSpansCount += 1;
			}
			td[i].style.height = leftSpans[leftSpansCount].offsetHeight + 'px';
		}
		leftSpansCount = 0;
		leftSpansStep = step;
	};
	handleResize();
	window.addEventListener('resize', handleResize);

	if (typeof activeColumn === 'number') {
		activeColumn -= 1;
		if (activeColumn < 0) activeColumn = 0;
		if (activeColumn > step - 1) activeColumn = step - 1;
		thead[activeColumn].classList.add('active');
		for (let y = activeColumn; y < tbody.length; y += step) {
			tbody[y].classList.add('active');
		}
		tfoot[activeColumn].classList.add('active');
	}

	for (let i = 0; i < step; i++) {
		thead[i].addEventListener('mouseenter', e => {
			thead[i].classList.add('hover');
			for (let y = i; y < tbody.length; y += step) {
				tbody[y].classList.add('hover');
			}
			tfoot[i].classList.add('hover');
		});
		thead[i].addEventListener('mouseleave', e => {
			thead[i].classList.remove('hover');
			for (let y = i; y < tbody.length; y += step) {
				tbody[y].classList.remove('hover');
			}
			tfoot[i].classList.remove('hover');
		});
	}

	for (let i = 0; i < tfoot.length; i++) {
		tfoot[i].addEventListener('mouseenter', e => {
			thead[i].classList.add('hover');
			for (let y = i; y < tbody.length; y += step) {
				tbody[y].classList.add('hover');
			}
			tfoot[i].classList.add('hover');
		});
		tfoot[i].addEventListener('mouseleave', e => {
			thead[i].classList.remove('hover');
			for (let y = i; y < tbody.length; y += step) {
				tbody[y].classList.remove('hover');
			}
			tfoot[i].classList.remove('hover');
		});
	}

	for (let i = 0; i < tbody.length; i++) {
		tbody[i].addEventListener('mouseenter', e => {
			let index = i;
			while (index > step - 1) {
				index -= step;
			}
			thead[index].classList.add('hover');
			for (let y = index; y < tbody.length; y += step) {
				tbody[y].classList.add('hover');
			}
			tfoot[index].classList.add('hover');
		});
		tbody[i].addEventListener('mouseleave', e => {
			let index = i;
			while (index > step - 1) {
				index -= step;
			}
			thead[index].classList.remove('hover');
			for (let y = index; y < tbody.length; y += step) {
				tbody[y].classList.remove('hover');
			}
			tfoot[index].classList.remove('hover');
		});
	}
});