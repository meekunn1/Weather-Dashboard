var APIkey = "7b927c53ca7347b508069d9688a6767e"
var searchInput = document.querySelector("#searchInput");
var searchBtn = document.querySelector("#searchBtn");
var searchResult = document.querySelector("#searchResult");
var day0 = document.querySelector("#day0");
var notFound = document.querySelector("#notFound");
var day0temp = document.querySelector("#day0temp");
var day0wind = document.querySelector("#day0wind");
var day0humidity = document.querySelector("#day0humidity");

//var day0Icon = document.querySelector(".day0Icon");

// Initial state

var searchHistory = [];
var inputValue = "";
day0.textContent = "";
notFound.textContent = "";

//day.js test to convert dt = unix
var dtData = dayjs.unix(1662292800);
console.log(dtData.format('MMM D, YYYY'));


//submit button
searchBtn.addEventListener("click", function(event)
{
  event.preventDefault();
  inputValue = searchInput.value.trim();
  console.log(inputValue);

  if (!inputValue) {
    console.error("Please input City name.");
    return;
  }
  var queryString = "./search-result.html?q=" + inputValue;

  location.assign(queryString);
})
function getInput(){
  inputValue = document.location.search.split('=')[1];
  console.log(inputValue);
}
getInput();


function generateWeather() {
  var searchAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + inputValue + "&appid=" + APIkey + "&units=metric";
  console.log(inputValue);
  console.log(searchAPI);
  fetch(searchAPI)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // console.log(data[0]);   bad call
      console.log(data.main);
      console.log(data.name);
      console.log(data.main.feels_like);
      console.log(dayjs.unix(data.dt).format("MM/DD/YYYY"));

      //display results to today
      var tempC = data.main.temp +String.fromCharCode(176) +"C";
      var windms = data.wind.speed + "m/s";
      var humid = data.main.humidity + "%";
      var day0icon = "<span class=\"day0Icon\"><img src=\"./assets/icons/" + data.weather[0].icon + ".png\"/></span>";
      day0.innerHTML = data.name + " (" + dayjs.unix(data.dt).format("MM/DD/YYYY") + ")" + day0icon;
      console.log(dayjs.unix(data.dt).format("MM/DD/YYYY"));
      day0temp.textContent = "Temprature: " + tempC
      day0wind.textContent = "Wind Speed: " + windms
      day0humidity.textContent = "Humidity: " + humid

  
      })
    .catch(function (error) {
      console.error(error);
      console.log("City name not recognized");
      notFound.textContent = "City name was not recognized. \nPlease try again.";
    });
    return;
}
generateWeather()


//sample copy from week6 01-27 script.js

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//sample copy from week6 01-27 display-search.js
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split('&');

  // Get the query and format values
  var query = searchParamsArr[0].split('=').pop();
  var format = searchParamsArr[1].split('=').pop();

  searchApi(query, format);
}

function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.date + '<br/>';

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong> ' + resultObj.description[0];
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }

  var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);
}

function searchApi(query, format) {
  var locQueryUrl = 'https://www.loc.gov/search/?fo=json';

  if (format) {
    locQueryUrl = 'https://www.loc.gov/' + format + '/?fo=json';
  }

  locQueryUrl = locQueryUrl + '&q=' + query;

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
      resultTextEl.textContent = locRes.search.query;

      console.log(locRes);

      if (!locRes.results.length) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < locRes.results.length; i++) {
          printResults(locRes.results[i]);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  searchApi(searchInputVal, formatInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();

