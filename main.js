const randomImageHolder = document.querySelector('.random-image-container');

// ------------------------------------------
//  RANDOM PAGE NUMBER
// ------------------------------------------

const randomPage = Math.floor(Math.random() * 10) + 1;

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch('https://picsum.photos/v2/list?page=' + `${randomPage}`+ '&limit=100')
  // fetch('https://picsum.photos/list')
  .then(response => response.json())
  .then(data => console.log(data[0].download_url))
  .then(data => console.log(data))
  .then(data => generateImage(data[0].download_url))




// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function generateImage(data) {
  const html = `
    <img src='${data}' alt>
  `;
  randomImageHolder.innerHTML = html;
}





// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------



// ------------------------------------------
//  POST DATA
// ------------------------------------------
