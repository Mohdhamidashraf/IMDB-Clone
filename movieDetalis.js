//                                        Movie Details Home page javaScript code .
const apikey = "a6aa9d5a";
const ID = localStorage.getItem("imdbid");
movieDetails(ID);

//reference  movie id in home page javaScript . 
function movieDetails(movieId) {
  console.log("inside moviedetails 116", movieId);
  var url = "http://www.omdbapi.com/?i=" + movieId + "&apikey=" + apikey;
  console.log(url);
  requestApiData(url);
  url = "";
}

// api fetch data and get data
async function requestApiData(url) {
  try {
    let data = await fetch(url);
    const values = await data.json();
    if (values.Title != undefined) {
      showAllDeteails(values);
    } else {
      throw new Error("There is no movie found in this name");
    }
  } catch (err) {
    alert(err);
    return;
  }
}


// Movie home page all details show use this function 
function showAllDeteails(values) {
  var list2 = document.getElementById("detalis_card");
  var movieDives = document.createElement("div");
  movieDives.innerHTML = `

       <div class="card">
          <div id="image">
            <img class="movi_image" src=${values.Poster} alt="wait" />
            </div>
            <div id="move_descption">
            <h1 >${values.Title} (${values.Year})</h1>
            <p>${" Country:   &nbsp" + values.Country}</p>
            <p >${"Language: &nbsp" + values.Language}</p>
            <p>${"Genre :&nbsp" + values.Genre}</p>
            <p> ${"Director :&nbsp" + values.Director}</p>
            <p>${"Actors  :   &nbsp" + values.Actors}</p>
            <p>${"Writer  :   &nbsp" + values.Writer}<p>
            <p>${"Polt :   &nbsp" + values.Plot}</p>
            
            <p>${"Awards  :   &nbsp" + values.Awards} <p>
            <div id="reting1">
            <h3>${"Imdb Rating:&nbsp" + values.imdbRating}</h3>
            </div>
          </div>
        </div>

`;

  list2.appendChild(movieDives);
}
