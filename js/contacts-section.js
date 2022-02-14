'use strict';

// Contacts Tab

const contactsTabsBtn = document.querySelectorAll('.contacts__tabs-btn');

for (let i = 0; i < contactsTabsBtn.length; i++) {
	const maps = document.querySelectorAll('.contacts__map');
	
	if (contactsTabsBtn.length === maps.length) {
		let prevTab = 0;
	
		contactsTabsBtn[prevTab].classList.add('active');
		maps[prevTab].classList.add('active');
	
		for (let i = 0; i < contactsTabsBtn.length; i++) {
			contactsTabsBtn[i].addEventListener('click', e => {
				if (prevTab !== null) {
					maps[prevTab].classList.remove('active');
					contactsTabsBtn[prevTab].classList.remove('active');
				}
				maps[i].classList.add('active');
				contactsTabsBtn[i].classList.add('active');
				prevTab = i;
			});
		}
	}
}