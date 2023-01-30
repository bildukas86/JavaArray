const randomImageHolder = document.querySelector('.random-image-container');
const savedImagesContainer = document.querySelector('.savedImages');
let refreshImage = document.querySelector('#refresh');
const selectButton = document.querySelector('#select');
let emailAddr = document.querySelector('#email');

let imagesStored = []; //person saved images and email to array


// ------------------------------------------
//  GENERATE  RANDOM PAGE NUMBER WHEN PAGE LOADS
// ------------------------------------------

let randomPage = Math.floor(Math.random() * 10) + 1;

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------


function fetchData(url) {
  return fetch(url)
            .then(res => res.json())
}

//getting img url
fetchData('https://picsum.photos/v2/list?page=' + `${randomPage}`+ '&limit=100')
  .then(data => generateImage(data[0].download_url))

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

// function user(email, link) {
//   this.email = make;
//   this.link = model;
//
// }



// create img container
function generateImage(data) {
  const html = `
    <img class="cuurentImg" src='${data}' alt>
  `;
  randomImageHolder.innerHTML = html;
}

//display saved images





//regenerating new image and storing link
function fetchRandomImage(){
  const img = randomImageHolder.querySelector('img');
  const randomPage = Math.floor(Math.random() * 10) + 1;
  fetchData(`https://picsum.photos/v2/list?page=${randomPage}&limit=100`)
    .then(data => {
         img.src = data[0].download_url;
    })

}



// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
//call function to regenerate and display new image
refreshImage.addEventListener('click', fetchRandomImage);

// ------------------------------------------
//STORE SELECTED IMAGES
// ------------------------------------------

//function to check button select clicked and input email field not empty if not empty store email and img url
selectButton.addEventListener('click', function(){
  if (emailAddr.value.length >= 1) {
    const img = randomImageHolder.querySelector('img');
    console.log('not empty');
    imagesStored.push(randomImageHolder.querySelector('img').src);
    for(i = 0; i < imagesStored.length; i++)
      {
    savedImagesContainer.innerHTML += "<img src='"+ imagesStored[i] + "' class='images'></img>";
      }


  }else {
    console.log("empty");

  }

});
//
// console.log(emailAddr.value);
