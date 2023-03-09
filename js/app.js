const apiImage = document.querySelector(".random-image-container");
const currentImg = document.querySelector(".currentImg");
// const savedImages = document.querySelector(".savedImages");
const refreshBtn = document.querySelector("#refresh");
const submitBtn = document.querySelector("#select");
const emailInput = document.querySelector("#email");
// const saveImg = document.querySelector(".saved-images-container");
const header = document.querySelector(".header");

let emailsWithImages = {};

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
let randomPage = Math.floor(Math.random() * 10) + 1;
let randomId = Math.floor(Math.random() * 100) + 1;

function fetchData(url) {
  return  fetch(url)
            .then(res => res.json())
}

//getting img url
 fetchData('https://picsum.photos/v2/list?page=' + `${randomPage}`+ '&limit=100')
  .then(data => generateImage(data[`${randomId}`].download_url))
  .catch(function(error){
        alert("Please check your internet connection and click refresh button.");
      });

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

        checkImg()
        // fetchRandomImage();
      } else {
        fetchRandomImage();
        assignImgToEmail();
        addEmail();
        addImage();

      }

};

////////////////////////////////////////////////////////////////////////////////
//function cheking if img exists
////////////////////////////////////////////////////////////////////////////////
function checkImg(){

 if (emailsWithImages[`${emailInput.value}`].includes(document.querySelector(".currentImg").src)) {
   alert("Image selected, please click Refresh Image button.");
 } else {
   addImgToExistingEmail();
   addImage();
   fetchRandomImage();

 }


};

//assign Image to email
function assignImgToEmail(){
  let currentImg = apiImage.querySelector("img").src;
  let currentEmail = document.querySelector('#email').value;
  emailsWithImages[`${emailInput.value}`] = [`${currentImg}`];

}
//assign Image to existing email
function addImgToExistingEmail(){
  let currentImg = apiImage.querySelector("img").src;
  displayEmail();
  emailsWithImages[`${emailInput.value}`].push(`${currentImg}`);

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

function displayEmail(){
  const html = `
    <h3 class='storedImgHeader'> ${emailInput.value} </h3>
  `;
  header.innerHTML = html;
}
///////////////////////////////////////////////////////
function addImage(){
var emailImage = emailsWithImages[`${emailInput.value}`];
var html = '';
emailImage.forEach(function (emailImage) {
    html += '<img class="selected" src='+ emailImage +'>';
});
html =  html ;
document.querySelector('.saved-images-container').innerHTML = html;

}

/////////////////////////////////////////////////////////////////////////////////
//regenerating new image and storing link
function fetchRandomImage(){
  const img = apiImage.querySelector('img');
  const randomPage = Math.floor(Math.random() * 10) + 1;
  let randomId = Math.floor(Math.random() * 100) + 1;
  fetchData(`https://picsum.photos/v2/list?page=${randomPage}&limit=100`)
    .then(data => {img.src = data[`${randomId}`].download_url;});


};

//////////////////////////////////////////////////////////////////////
//SubmitBtn clicked
/////////////////////////////////////////////////////////////////////

//Event LISTENERS

refreshBtn.addEventListener("click", fetchRandomImage);

submitBtn.addEventListener("click", function(){
      validateEmail();
});
emailInput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // call function validate email
    validateEmail();
  }
});


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
