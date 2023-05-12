var APIkey = "7b927c53ca7347b508069d9688a6767e"
var searchInput = document.querySelector("#searchInput");
var searchBtn = document.querySelector("#searchBtn");
var searchResult = document.querySelector("#searchResult");
var saveBtn = document.querySelector("#saveBtn");
var searchHistory = document.querySelector("#searchHistory");
var day0 = document.querySelector("#day0");
var notFound = document.querySelector("#notFound");
var day0temp = document.querySelector("#day0temp");
var day0wind = document.querySelector("#day0wind");
var day0humidity = document.querySelector("#day0humidity");
var day3 = document.querySelector("#day3");
var day11 = document.querySelector("#day11");
var day19 = document.querySelector("#day19");
var day27 = document.querySelector("#day27");
var day35 = document.querySelector("#day35");

// Initial state
var saveList = [];
var inputValue = "";
var currentCity = "";
day0.textContent = "";
notFound.textContent = "";

// Get search history from Local storage
function loadSaved() {
  var saved = JSON.parse(localStorage.getItem("saved"));
  console.log(saved);
  if (saved !== null) {
    saveList = saved;
  }}

loadSaved();
displaySave();


//submit button to determine input value and start search
searchBtn.addEventListener("click", function(event)
{
  event.preventDefault();
  inputValue = searchInput.value.trim();
  startSearch()
})

//relocate html to start cycle with new input
function startSearch() {
  console.log(inputValue);

  if (!inputValue) {
    console.error("Please input City name.");
    return;
  }
  var queryString = "./search-result.html?q=" + inputValue;

  location.assign(queryString);
}

//save button
saveBtn.addEventListener("click", function(event)
{
event.preventDefault();
if (currentCity == "") {
   return;
}
else if (saveList.includes(currentCity)) {
  return;
} 

storeSave();
displaySave();
})

//push search input into save list in local storage
function storeSave() {
saveList.push(currentCity);
localStorage.setItem("saved", JSON.stringify(saveList));
}

//displays the saved search locations
function displaySave() {
  searchHistory.innerHTML = "";
  for (var i = 0; i < saveList.length; i++) {
    var save = saveList[i];

    var li = document.createElement("li");
    li.textContent = "";
    li.setAttribute("saveSlot", i);

    var button = document.createElement("button");
    button.textContent = save;

    li.appendChild(button);
    searchHistory.appendChild(li);
  }
}

//button to re-search saved city
searchHistory.addEventListener("click", function(event) {
  var element = event.target;

  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("saveSlot");
   console.log(index);
   inputValue = saveList[index];
   startSearch();

  }
});

//generate initial input from url
function getInput(){
  inputValue = document.location.search.split('=')[1];
  console.log(inputValue);
}
getInput();

//generate today's weather
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
      currentCity = data.name
      //display results to today
      var tempC = data.main.temp +String.fromCharCode(176) +"C";
      var windms = data.wind.speed + "m/s";
      var humid = data.main.humidity + "%";
      var day0icon = "<span class=\"day0Icon\"><img src=\"./assets/icons/" + data.weather[0].icon + ".png\"/></span>";
      day0.innerHTML = data.name + " (" + dayjs.unix(data.dt).format("MM/DD/YYYY") + ")" + day0icon;
      console.log(dayjs.unix(data.dt).format("MM/DD/YYYY"));
      day0temp.textContent = "Temprature: " + tempC;
      day0wind.textContent = "Wind Speed: " + windms;
      day0humidity.textContent = "Humidity: " + humid;
      })
    .catch(function (error) {
      console.error(error);
      notFound.textContent = "City name was not recognized. \nPlease try again.";
    });
    return;
}
generateWeather();

//generate 5 day forecast
function generateForecast() {
  var searchAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputValue + "&appid=" + APIkey + "&units=metric&cnt=36";
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
      //display forecast day1
      function generateDay1(data){
        data = data.list[3];
          var daytempC = data.main.temp +String.fromCharCode(176) +"C";
          var daywindms = data.wind.speed + "m/s";
          var dayhumid = data.main.humidity + "%";
          var dayicon = "<span class=\"day3icon\"><img src=\"./assets/icons/" + data.weather[0].icon + ".png\"/></span>";
          day3.textContent = dayjs.unix(data.dt).format("MM/DD/YYYY");
          day3.innerHTML = dayjs.unix(data.dt).format("MM/DD/YYYY") + dayicon;
          day3temp.textContent = "Temp: " + daytempC
          day3wind.textContent = "Wind: " + daywindms
          day3humidity.textContent = "Humidity: " + dayhumid
          return;
      }
      generateDay1(data)

      //display forecast day2
      function generateDay2(data){
        data = data.list[11];
          var daytempC = data.main.temp +String.fromCharCode(176) +"C";
          var daywindms = data.wind.speed + "m/s";
          var dayhumid = data.main.humidity + "%";
          var dayicon = "<span class=\"day3icon\"><img src=\"./assets/icons/" + data.weather[0].icon + ".png\"/></span>";
          day11.textContent = dayjs.unix(data.dt).format("MM/DD/YYYY");
          day11.innerHTML = dayjs.unix(data.dt).format("MM/DD/YYYY") + dayicon;
          day11temp.textContent = "Temp: " + daytempC
          day11wind.textContent = "Wind: " + daywindms
          day11humidity.textContent = "Humidity: " + dayhumid
          return;
      }
      generateDay2(data)

      //display forecast day3
      function generateDay3(data){
        data = data.list[19];
          var daytempC = data.main.temp +String.fromCharCode(176) +"C";
          var daywindms = data.wind.speed + "m/s";
          var dayhumid = data.main.humidity + "%";
          var dayicon = "<span class=\"day3icon\"><img src=\"./assets/icons/" + data.weather[0].icon + ".png\"/></span>";
          day19.textContent = dayjs.unix(data.dt).format("MM/DD/YYYY");
          day19.innerHTML = dayjs.unix(data.dt).format("MM/DD/YYYY") + dayicon;
          day19temp.textContent = "Temp: " + daytempC
          day19wind.textContent = "Wind: " + daywindms
          day19humidity.textContent = "Humidity: " + dayhumid
          return;
      }
      generateDay3(data)

      //display forecast day4
      function generateDay4(data){
        data = data.list[27];
          var daytempC = data.main.temp +String.fromCharCode(176) +"C";
          var daywindms = data.wind.speed + "m/s";
          var dayhumid = data.main.humidity + "%";
          var dayicon = "<span class=\"day3icon\"><img src=\"./assets/icons/" + data.weather[0].icon + ".png\"/></span>";
          day27.textContent = dayjs.unix(data.dt).format("MM/DD/YYYY");
          day27.innerHTML = dayjs.unix(data.dt).format("MM/DD/YYYY") + dayicon;
          day27temp.textContent = "Temp: " + daytempC
          day27wind.textContent = "Wind: " + daywindms
          day27humidity.textContent = "Humidity: " + dayhumid
          return;
      }
      generateDay4(data)

      //display forecast day3
      function generateDay5(data){
        data = data.list[35];
          var daytempC = data.main.temp +String.fromCharCode(176) +"C";
          var daywindms = data.wind.speed + "m/s";
          var dayhumid = data.main.humidity + "%";
          var dayicon = "<span class=\"day3icon\"><img src=\"./assets/icons/" + data.weather[0].icon + ".png\"/></span>";
          day35.textContent = dayjs.unix(data.dt).format("MM/DD/YYYY");
          day35.innerHTML = dayjs.unix(data.dt).format("MM/DD/YYYY") + dayicon;
          day35temp.textContent = "Temp: " + daytempC
          day35wind.textContent = "Wind: " + daywindms
          day35humidity.textContent = "Humidity: " + dayhumid
          return;
        }
        generateDay5(data)
      })
    .catch(function (error) {
      console.error(error);
      console.log("City name not recognized");
    });
    return;
}

generateForecast()