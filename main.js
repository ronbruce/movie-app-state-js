import "./style.css";

// TO DO
// Use Title and Year to search as an index

document.querySelector("#app").innerHTML = `
<style>
      .movies-area {
        justify-content: space-around;
        align-items: flex-start;
      }

#results {
  column-count: 3;
}

    </style>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="#">Movie App</a>
</nav>
<main class="container mt-2">
<form>
<fieldset class="form-group">
<label for="search">Search</label>
<input type="text" class="form-control" id="searchTerm" placeholder="Enter movie title">
</fieldset>
<button type="submit" class="btn btn-primary">Go</button>
</form>
<section class="row">
<section id="results">

</section>
<section class="mt-2 col-3 row">

<h3>Favorites</h3>

<section id="favorites">

</section>
</section>
</section>

<section>
<div class="comment-display">

</div>
</section>
</main>
`;

const form = document.querySelector("form");
const input = document.querySelector("#searchTerm");
const resultsSection = document.querySelector("#results");
const favoritesSection = document.querySelector("#favorites");

const APIKEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = `http://www.omdbapi.com/?apikey=${APIKEY}&type=movie&s=`;

const state = {
  searchTerm: '',
  results: [],
  favorites: []

};

input.addEventListener("keyup", () => {
  state.searchTerm = input.value;
  console.log(state);
});

form.addEventListener("submit", formSubmitted);
// Function takes the search term and calls the getResults function to get the results
async function formSubmitted(e) {
  e.preventDefault();
  try {
 state.results = await getResults(state.searchTerm);
  showResults()
   } catch(error) {
    showError(error);
  }
  }
// Send what the user has typed to the API to get back results
async function getResults(searchTerm) {
  const url = `${API_URL}${searchTerm}`;
  const response = await fetch(url)
  const data = await response.json()
    if(data.Error) {
      throw new Error(data.Error);
    }
    return data.Search
}
// Function to show the property results "search" in the results section of the page
function showResults() {
  resultsSection.innerHTML = "";
  let html = state.results.reduce((html, movie) => {
   return html + getMovieTemplate(movie, 4);
  }, '');
  // Setting this to be the html variable above
  resultsSection.innerHTML = html;

  addButtonListeners();
}

function addButtonListeners() {
  const favoritesButtons = document.querySelectorAll(".favorites-button");
  favoritesButtons.forEach(button => {
    button.addEventListener('click', buttonClicked);
  });

}

function buttonClicked(e) {
    const { id } = e.target.dataset;
    const movie = state.results.find(movie => movie.imdbID === id);
    state.favorites.push(movie);
    updateFavoritesSection();
    // Below I tried to get my favorites to show a result on the web page but its not working.
    // favoritesSection.innerHTML = favoritesSection.innerHTML + getMovieTemplate(movie, false);
    // So I used this document.getElementById to get results and add it to a seperate page.
   
  }
function updateFavoritesSection() {
  favoritesSection.innerHTML = state.favorites.reduce((html, movie) => {
    return html + getMovieTemplate(movie, 12, false);
  }, '');
    
}

function getMovieTemplate(movie, cols, comment, button = true) {
  return `<div class="card ${cols-4}">
  <img class="card-img-top" src="${movie.Poster}" alt="${movie.Title}">
  <div class="card-body">
    <h5 class="card-title">${movie.Title}</h5>
    <p class="card-text">${movie.Year}</p>
    <textarea type="text" id=${comment} rows="4" cols="40"></textarea>
    ${
      button ?
   ` <button data-id="${movie.imdbID}" type="button" class="btn btn-danger favorites-button">Favorites</button>`
    : ''
    }
</div>`;
}

function showError(error) {
  resultsSection.innerHTML = `<div class="alert alert-danger col" role="alert">
  ${error.message}
</div>
`};

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shinIndexedDB;

const request = window.indexedDB.open("movieCollection", 1);

request.onerror = (e) => {
    console.error("Hey! You got an error with your request :(...");
    console.error(e);
  };

  request.onupgradeneeded = function () {
    // Save the IDBDatabase interface
    const db = request.result;
      // Create an objectStore for this database
  const objectStore = db.createObjectStore("movieCollection", { keyPath: "id" });
  objectStore.createIndex("movie_genre", ["genre"], { unique: false });
  objectStore.createIndex("genre_and_year", ["genre", "year"], {
    unique: false, 
  });   

};

request.onsuccess = function () {
    const db = request.result;
    const transaction = db.transaction("genre", "readwrite");
 
    // This lets me look up the values stored in my objectStore
    // Im doing so by using the value of the property store object
  const objectStore = transaction.objectStore("movieCollection");
  const genreIndex = objectStore.index("movie_genre");
  const genreAndYearIndex = objectStore.index("genre_and_year");

  objectStore.put({ id: 1, genre: "Romance", year: 2020 });
  objectStore.put({ id: 2, genre: "Anime", year: 2017 });
  objectStore.put({ id: 3, genre: "Action", year: 2019 });
  objectStore.put({ id: 4, genre: "Drama", year: 2013 });

  const idQuery = objectStore.get(4);
  const genreQuery = genreIndex.getAll("Anime");
  const genreYearQuery = genreAndYearIndex.get(["Romance", 2019]);
// I put a label besides the variable value to know where it came from
  idQuery.onsuccess = function () {
    console.log("idQuery", idQuery.result);

  }
  genreQuery.onsuccess = function () {
    console.log("genreQuery", genreQuery);

  }

  genreYearQuery.onsuccess = function () {
    console.log("genreYearQuery", genreYearQuery.result);
  }

  transaction.oncomplete = function () {
    db.close();
  }
}; 