// ===========================================================
// App,js
// ===========================================================

// // Variables
//
let imgContainer = document.querySelector('.img-container');
let imgUrl;
const refresh = document.querySelector('.refresh-btn');
const savedImgContainer = document.querySelector('.stored-img');
const emailContainer = document.querySelector('.email-stored');
var emailsWithImages = {};
//
$(window).on('load', generateImage);
//
// // refresh button
//
refresh.addEventListener('click', generateImage);
//
//
// // functions
//
function generateImage() {
    fetch('https://picsum.photos/200').then( response => {
        imgUrl = response.url;
        let html = `<img src='${imgUrl}' class='current-img' alt='random img'>`;
        imgContainer.innerHTML = html;
    })
}


function addEmail(){
    emailContainer.innerHTML = `<h3 class='email-inputted'>${email.value}<h3>`;
}

// Function that displays all of the images for a certain email.
// The array of image urls for said email are passed into the method and become the storedImages array.
function displayImagesForEmail(storedImages) {
	// First empty the savedImgContainer so that no images for other emails remain in the box.
	$(savedImgContainer).empty();

	// Loop through the storedImages array and for each one append a picture to the now empty savedImgContainer div.
	$.each(storedImages, function (i, img) {
		$(savedImgContainer).append("<img src='" + img + "' alt='random img' class='selected-image'>");
	});
}


function addImgToEmail(email) {
	var isNewEmail = checkIfEmailExists(email);
	if (isNewEmail) {
		var currentEmailImgs = emailsWithImages[email];
		currentEmailImgs.push(imgUrl);
		emailsWithImages[email] = currentEmailImgs;
	} else {
		emailsWithImages[email] = [imgUrl];
	}

	// Finally we call the function to display the images in the orange box.
	// Passing emailsWithImages[email] to the function means we just send the array of image urls associated with the certain email.
	displayImagesForEmail(emailsWithImages[email]);
}

// Function that checks if an email is already being used inside the emailsWithImages object
function checkIfEmailExists(newEmail) {
	var emailExists = false;
	$.each(emailsWithImages, function (i, imgs) {
		if (newEmail == i) {
			emailExists = true;
		}
	});
	return emailExists;
}
