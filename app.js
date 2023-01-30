const apiImage = document.querySelector(".random-image-container");
const refreshBtn = document.querySelector("#refresh");
const submitBtn = document.querySelector("#select");
const emailInput = document.querySelector("#email");


let emailsWithImages = [];



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

//create object with email and link and add to array
function object1(){
  let currentImg = apiImage.querySelector("img").src;
  let user = {
    email: `${emailInput.value}`,
    link: `${currentImg}`,
  }
  emailsWithImages.push(user)
}

/////////////////////////////////////////////////////////////////////////////////
function addImage(data) {
  const html = `
    <img src='${data}' alt>
  `;
  apiImage.innerHTML = html;
}
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
    console.log("working");
      object1();
  } else {
    console.log("please enter your email");
  }
});
console.log(emailsWithImages);
