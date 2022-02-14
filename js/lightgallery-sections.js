'use strict';

/* LightGallery */

const lightGalleryItems = document.querySelectorAll('._lightgallery');

if (lightGalleryItems.length > 0) {
	for (let i = 0; i < lightGalleryItems.length; i++) {
		lightGallery(lightGalleryItems[i]);
	}
}