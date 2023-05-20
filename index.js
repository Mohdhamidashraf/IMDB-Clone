//                                           Home page javaScript code .
console.log("working");
const apikey = "a6aa9d5a";
// input_box
const movieInput = document.getElementById("search-bar");
var movie = movieInput.value;

// Search input function
function clickToSearch() {
  if (movieInput.value == "") {
    alert("Sorry Enter Move name ...?");
    return;
  }
  console.log(movieInput.value);
  var url =
    "http://www.omdbapi.com/?t=" + movieInput.value + "&apikey=" + apikey + "";
  console.log(url);
  fetchDataFromApi(url);
  movieInput.value = "";
}

// api fetch data and get data

async function fetchDataFromApi(url) {
  try {
    let data = await fetch(url);
    const values = await data.json();
    if (values.Title != undefined) {
      movieHomePage(values);
    } else {
      throw new Error("There is no movie found in this name");
    }
  } catch (err) {
    alert(err);
    return;
  }
}

// // show data
function movieHomePage(values) {
  var list = document.getElementById("show_move");
  var movieDive = document.createElement("div");
  movieDive.innerHTML = `
       <div class="card">
         <div>
          <img src=${values.Poster} class="movi_image" alt="wait" />
          <h1> ${values.Title} (${values.Year})</h1>
          <h4>${values.Language}</h4>
         <h4>${values.Genre}</h4>
          </div>
         <div id="reting1">
          

            <div onclick="allDetails(event)" data-imdbid=${values.imdbID}  id="all_details"> All Details</div>
            <div onclick="addfevouriteList(event)" data-imdbid=${values.imdbID}  id="all_details"> Add Fevourite</div>

            </div>
        </div>  `;

  list.appendChild(movieDive);
}

//     Movie  all Detealis show function...

function allDetails(event) {
  var id;
  const parentDiv = event.currentTarget;
  id = parentDiv.getAttribute("data-imdbid");
  parentDiv.setAttribute("data-imdbid", id);
  console.log(parentDiv);
  localStorage.setItem("imdbid", id);
  window.location.replace("movieDetails.html");
}

// local Array and local Storage update...

function saveArrayToLocalStorage(id) {
  if (localStorage.getItem("data") == null) {
    localStorage.clear();
    localStorage.setItem("data", "[]");
  }

  var localArray = JSON.parse(localStorage.getItem("data"));
  if (!localArray.includes(id)) {
    localArray.push(id);
    localStorage.setItem("data", JSON.stringify(localArray));
    alert("Added to favorite list");
  } else {
    alert("this movie is already in your favorite list");
    return;
  }
}

// add fevourite List by next page reference  id
function addfevouriteList(event) {
  var id;
  const parentDiv = event.currentTarget;
  id = parentDiv.getAttribute("data-imdbid");
  saveArrayToLocalStorage(id);
}
