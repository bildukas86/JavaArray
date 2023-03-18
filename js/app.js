const apiImage = document.querySelector(".random-image-container");
const emailInput = document.querySelector("#email");
const refreshBtn = document.querySelector("#refresh");
const submitBtn = document.querySelector("#select");
let currentImg = document.querySelector(".currentImg");
const selectOption = document.querySelector(".email-select");



let emailsWithImages = {}; //array holding emails and image url

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

/////////////////////////////////////////////////////////////////////////////////
//regenerating new image and storing link
////////////////////////////////////////////////////////////////////////////////
function fetchRandomImage(){
  const img = apiImage.querySelector('img');
  const randomPage = Math.floor(Math.random() * 10) + 1;
  let randomId = Math.floor(Math.random() * 100) + 1;
  fetchData(`https://picsum.photos/v2/list?page=${randomPage}&limit=100`)
    .then(data => {img.src = data[`${randomId}`].download_url;});
};


////////////////////////////////////////////////////////////////////////////////
//function cheking email if exists add img link to old email.
////////////////////////////////////////////////////////////////////////////////
function checkIfEmailExists(){
          if (`${emailInput.value}` in emailsWithImages) {
            checkImg();
        } else {
            fetchRandomImage();
            addImageEmailToArray();
            addImage();
        }
};

////////////////////////////////////////////////////////////////////////////////
//function cheking if img url assigned to the email
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
/////////////////////////////////////////////////////////
//display saved images for current email
///////////////////////////////////////////////////////
function addImage(){
  let emailImage = emailsWithImages[`${emailInput.value}`];
  let html = '';
    emailImage.forEach(function (emailImage) {
    html += '<img class="selected" src='+ emailImage +'>';
});
html =  html ;
document.querySelector('.saved-images-container').innerHTML = html;

}
///////////////////////////////////////////////////////////////
//assign Image to email
///////////////////////////////////////////////////////////
function addImageEmailToArray(){
  let currentImg = apiImage.querySelector("img").src;
  emailsWithImages[`${emailInput.value}`] = [`${currentImg}`];
}
//assign Image to existing email
function addImgToExistingEmail(){
  let currentImg = apiImage.querySelector("img").src;
  emailsWithImages[`${emailInput.value}`].push(`${currentImg}`);
}


////////////////////////////////////////////////////////////////////////////
///adding <option> to select
///////////////////////////////////////////////////////////////////////////


function addOptionToSelect()
{
  let listKeys = Object.keys(emailsWithImages);
  var html = '';
  listKeys.forEach(function (listKeys) {

      html += `<option label="" selected value=" ${listKeys}"> ${listKeys} </option>`;

  });
  html =  html ;
  selectOption.innerHTML = html;
}

///////////////////////////////////////////////////////////////////////
//update email input field if used select email & update selected images container
/////////////////////////////////////////////////////////////////////


selectOption.addEventListener("change", () => {
	emailInput.value = selectOption.value;
  addImage(); //updating img container
});

//////////////////////////////////////////////////////////////////////
//SubmitBtn/refresh btn clicked
/////////////////////////////////////////////////////////////////////

//Event LISTENERS

refreshBtn.addEventListener("click", fetchRandomImage);
submitBtn.addEventListener("click", function(){
      validateEmail();
      addOptionToSelect();

});
emailInput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // call function validate email
    validateEmail();
    addOptionToSelect();

  }
});
