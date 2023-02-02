const apiImage = document.querySelector(".random-image-container");
const savedImages = document.querySelector(".savedImages");
const refreshBtn = document.querySelector("#refresh");
const submitBtn = document.querySelector("#select");
const emailInput = document.querySelector("#email");
let emailsWithImages = {};

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
let randomPage = Math.floor(Math.random() * 10) + 1;

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

// create img container
function generateImage(data) {
  const html = `
    <img class="currentImg" src='${data}' alt>
  `;
  apiImage.innerHTML = html;
};


////////////////////////////////////////////////////////////////////////////////
//function cheking or not. if exists add img link.
////////////////////////////////////////////////////////////////////////////////
function checkIfEmailExists(){

      if (`${emailInput.value}` in emailsWithImages) {
        console.log("Taip yra toks emailas");
        object2();
        // addEmail();
      } else {
        console.log("nera tokio emailas");
        object1();
        addEmail();
        // addImage();
      }

};

//create object with email and link and add to array
function object1(){
  let currentImg = apiImage.querySelector("img").src;
  let currentEmail = document.querySelector('#email').value;
  emailsWithImages[`${emailInput.value}`] = [`${currentImg}`];
  console.log("added new email nad img");
}
//add img link to old email
function object2(){
  let currentImg = apiImage.querySelector("img").src;
  emailsWithImages[`${emailInput.value}`].push(`${currentImg}`)
  console.log("added to old email nad img");
}

/////////////////////////////////////////////////////////////////////////////////
//display image from API
function addImage(data) {
  const html = `
    <img src='${data}' alt>
  `;
  apiImage.innerHTML = html;
};
function addEmail() {
  const html = `
    <h3 class='email'>${email.value}<h3>

  `;
  savedImages.innerHTML = html;
};
///////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////
//regenerating new image and storing link
function fetchRandomImage(){
  const img = apiImage.querySelector('img');
  const randomPage = Math.floor(Math.random() * 10) + 1;
  fetchData(`https://picsum.photos/v2/list?page=${randomPage}&limit=100`)
    .then(data => {
         img.src = data[0].download_url;
    })
};

//////////////////////////////////////////////////////////////////////
//SubmitBtn clicked
/////////////////////////////////////////////////////////////////////

//Event LISTENERS

refresh.addEventListener("click", fetchRandomImage);

submitBtn.addEventListener("click", function(){
  if (emailInput.value.length >= 1 ) {

      checkIfEmailExists();
  } else {
    console.log("please enter your email");
  }
});
