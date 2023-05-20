const apikey = "a6aa9d5a";
var arr = JSON.parse(localStorage.getItem("data"));
localStorage.clear();
const movieList = document.getElementsByClassName("movie-list");
localStorage.setItem("data", JSON.stringify(arr));

//get unique items
const getUniqueMovies = (array) => [...new Set(array)];
arr = getUniqueMovies(arr);
// take out ids from localStorage
takeIdOneByOne(arr);
function takeIdOneByOne(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == null) {
      continue;
    } else {
      saveArrayToLocalStorage(arr[i]);
      movieDetails(arr[i]);
    }
  }
}
//create url reference  movieid
function movieDetails(movieId) {
  var url = "http://www.omdbapi.com/?i=" + movieId + "&apikey=" + apikey;
  fetchDataFromApiforDetails(url);
  url = "";
}
// fetch data form api
async function fetchDataFromApiforDetails(url) {
  try {
    let data = await fetch(url);
    const values = await data.json();
    if (values.Title != undefined) {
      fevMoviePage(values);
    } else {
      throw new Error("There is no movie found in this name");
    }
  } catch (err) {
    showNotification(err);
    return;
  }
}

//save array to local storage
function saveArrayToLocalStorage(id) {
  if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", "[]");
  }
  var localArray = JSON.parse(localStorage.getItem("data"));
  localArray.push(id);
  localStorage.setItem("data", JSON.stringify(localArray));
}

//all fevourite movive show fevourite HOME page
function fevMoviePage(values) {
  var list = document.getElementById("show_move");
  var movieDive = document.createElement("div");
  movieDive.innerHTML = `
       <div class="card">
      <div>
        <img src="${values.Poster}" class="movi_image" alt="wait" />
        <h1>${values.Title} (${values.Year})</h1>
        <h4>${values.Language}</h4>
        <h4>${values.Genre}</h4>
      </div>
      <div id="reting1">
        <h3>${"Rating :&nbsp" + values.imdbRating}</h3>

        <div id="${values.imdbID}" class="all_details">UnFevourite</div>
      </div>
    </div> `;

  list.appendChild(movieDive);
}

//remove or delete fevorite list/Array movie

function removeFevoriteFromArray(id) {
  const data = localStorage.getItem("data");
  if (data.length == 1) {
    localStorage.clear();
    return;
  }
  const element = document.getElementById(id);
  element.classList.add("hide-display");
  updateLocalStorage(id);
}

///update localStorage function

function updateLocalStorage(id) {
  let data = JSON.parse(localStorage.getItem("data"));
  if (data.includes(id)) {
    data = data.filter((item) => item !== id);
    localStorage.setItem("data", JSON.stringify(data));
  }
}

// Click  handled function

function handledClickListener(e) {
  var a = document.getElementById("all-remove");
  const target = e.target;
  if (target.className === "all_details") {
    const id = target.id;
    removeFevoriteFromArray(id);
    alert("Successfully Movie Remove from your fevourite list...!");
    location.reload();
  }
  if (target.className === "all-remove") {
    var array2 = JSON.parse(localStorage.getItem("data"));

    if (array2.length == 0) {
      alert("Already All movie  Remove So Add & Remove Again ...?");
      return;
    } else {
      localStorage.removeItem("data");
      localStorage.setItem("data", "[]");
      alert("Successfully All movie Remove...!");
      location.reload();
      return;
    }
  }
}

document.addEventListener("click", handledClickListener);
