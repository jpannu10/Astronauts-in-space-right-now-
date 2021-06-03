
//Selectors
let container = document.querySelector('.container');
let btnLoad = document.querySelector('.btn-1');

// APIs.
let astroUrl = "http://api.open-notify.org/astros.json";
let wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/`;




//Make AJAX request
function getJSON(url, callBack) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            let data = (JSON.parse(this.responseText));
            callBack(data);
        }
    }
    xhr.send();
}

// Generate the markup for Each Profile.
function generateHTML(data) {
    container.innerHTML += `
    <div class='box'>
      <div class='picture'>
         <img src='${data.thumbnail.source}' alt='Display Picture'>
      </div>
      <div class='information'>
       <div>
         Name: ${data.displaytitle} <br>
         Desciption: ${data.description} 
         </div>
      </div>
    </div>
    `
}

//Loading Data
    getJSON(astroUrl, (jsonData) => {
        jsonData.people.map(person => {
            getJSON(wikiUrl + person.name, generateHTML )
        });
    })

