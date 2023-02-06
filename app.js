const apiImage = document.querySelector(".random-image-container");
const savedImages = document.querySelector(".savedImages");
const refreshBtn = document.querySelector("#refresh");
const submitBtn = document.querySelector("#select");
const emailInput = document.querySelector("#email");
const saveImg = document.querySelector(".saved-images-container");
const header = document.querySelector(".header");
let emailsWithImages = {};

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
let randomPage = Math.floor(Math.random() * 10) + 1;
let randomId = Math.floor(Math.random() * 100) + 1;

function fetchData(url) {
  return fetch(url)
            .then(res => res.json())
}

//getting img url
fetchData('https://picsum.photos/v2/list?page=' + `${randomPage}`+ '&limit=100')
  .then(data => generateImage(data[`${randomId}`].download_url))

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
//function cheking email if exists add img link to old email.
////////////////////////////////////////////////////////////////////////////////
function checkIfEmailExists(){

      if (`${emailInput.value}` in emailsWithImages) {
        console.log("Taip yra toks emailas");
        object2();
        addImage();
        //refresh img if email valid and img saved
        fetchRandomImage();
      } else {
        console.log("nera tokio emailas");
        object1();
        addEmail();
        addImage();
        //refresh img if email valid and img saved
        fetchRandomImage();
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

function addEmail(){
  for (const [key, value] of Object.entries(emailsWithImages)) {
    const html = `
      <h3 class='storedImgHeader'> ${key} </h3>
    `;
    header.innerHTML = html;
}
};
///////////////////////////////////////////////////////
function addImage(){


var emailImage = emailsWithImages[`${emailInput.value}`];

// Setup the HTML string
var html = '';

// Loop through each emailImage
emailImage.forEach(function (emailImage) {

    html += '<img class="selected" src='+ emailImage +'>';
});


html =  html ;

// Log and inject

document.querySelector('.saved-images-container').innerHTML = html;

}

/////////////////////////////////////////////////////////////////////////////////
//regenerating new image and storing link
function fetchRandomImage(){
  const img = apiImage.querySelector('img');
  const randomPage = Math.floor(Math.random() * 10) + 1;
  let randomId = Math.floor(Math.random() * 100) + 1;
  fetchData(`https://picsum.photos/v2/list?page=${randomPage}&limit=100`)
    .then(data => {
         img.src = data[`${randomPage}`].download_url;
    })
};

//////////////////////////////////////////////////////////////////////
//SubmitBtn clicked
/////////////////////////////////////////////////////////////////////

//Event LISTENERS

refresh.addEventListener("click", fetchRandomImage);

submitBtn.addEventListener("click", function(){
  // if (emailInput.value.length >= 1 ) {

      validateEmail();

  // } else {
  //   console.log("please enter your email");
  // }
});

///////////////////////////////////////////////////////////////////
// checkIfEmailExists();
///////////////////////////////////////////////////////////////////

// function checkEmpty(){
//   if (emailsWithImages.length >= 0) {
//     const rightSideDown = document.getElementsByClassName("right-side-bottom");
//     rightSideDown.style.border = "3px solid black";
//   }
// }

//////////////////////////////////
///email validation
////////////////////////////////
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
};

function validateEmail(){

  let inputEmail = document.getElementById('email');
  if (inputEmail.value === "") {
    printError("emailErr", "* Email can't be empty.");
    inputEmail.classList = "error";
  }else {
  var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailRegEx.test(inputEmail.value) === false ) {
    printError("emailErr", "* Please enter a valid email address.");
    inputEmail.classList = "error";
  }else {
    printError("emailErr", "");
    inputEmail.classList = "valid";
    checkIfEmailExists();
    phoneErr = false;
  }
  }


}
