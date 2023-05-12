var APIkey = "7b927c53ca7347b508069d9688a6767e"
var searchInput = document.querySelector("#searchInput");
var searchBtn = document.querySelector("#searchBtn");

// Initial state
var searchHistory = [];
var inputValue = "";

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