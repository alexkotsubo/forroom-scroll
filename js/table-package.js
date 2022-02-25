'use strict';

window.addEventListener('DOMContentLoaded', e => {
	const table = document.querySelector('.table-package');
	const thead = table.querySelectorAll('thead a');
	const tfoot = table.querySelectorAll('tfoot a');
	const tbody = table.querySelectorAll('tbody a');
	let activeColumn = +table.getAttribute('data-active-column');
	const step = thead.length;

	const handleResize = e => {
		if (document.documentElement.clientWidth < 1024) {
			
		}
	};
	window.addEventListener('resize', handleResize);

	if (typeof activeColumn === 'number') {
		activeColumn -= 1;
		if (activeColumn < 0) activeColumn = 0;
		if (activeColumn > thead.length - 1) activeColumn = thead.length - 1;
		thead[activeColumn].classList.add('active');
		for (let y = activeColumn; y < tbody.length; y += step) {
			tbody[y].classList.add('active');
		}
		tfoot[activeColumn].classList.add('active');
	}

	for (let i = 0; i < thead.length; i++) {
		thead[i].addEventListener('mouseenter', e => {
			thead[i].classList.add('active');
			for (let y = i; y < tbody.length; y += step) {
				tbody[y].classList.add('active');
			}
			tfoot[i].classList.add('active');
		});
		thead[i].addEventListener('mouseleave', e => {
			thead[i].classList.remove('active');
			for (let y = i; y < tbody.length; y += step) {
				tbody[y].classList.remove('active');
			}
			tfoot[i].classList.remove('active');
		});
	}

	for (let i = 0; i < tfoot.length; i++) {
		tfoot[i].addEventListener('mouseenter', e => {
			thead[i].classList.add('active');
			for (let y = i; y < tbody.length; y += step) {
				tbody[y].classList.add('active');
			}
			tfoot[i].classList.add('active');
		});
		tfoot[i].addEventListener('mouseleave', e => {
			thead[i].classList.remove('active');
			for (let y = i; y < tbody.length; y += step) {
				tbody[y].classList.remove('active');
			}
			tfoot[i].classList.remove('active');
		});
	}

	for (let i = 0; i < tbody.length; i++) {
		tbody[i].addEventListener('mouseenter', e => {
			let index = i;
			while (index > 3) {
				index -= 4;
			}
			thead[index].classList.add('active');
			for (let y = index; y < tbody.length; y += step) {
				tbody[y].classList.add('active');
			}
			tfoot[index].classList.add('active');
		});
		tbody[i].addEventListener('mouseleave', e => {
			let index = i;
			while (index > 3) {
				index -= 4;
			}
			thead[index].classList.remove('active');
			for (let y = index; y < tbody.length; y += step) {
				tbody[y].classList.remove('active');
			}
			tfoot[index].classList.remove('active');
		});
	}
});