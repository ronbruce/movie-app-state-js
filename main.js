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
    /*const requestUpdate = ObjectStore.put(title);
    requestUpdate.onerror = (e) => {
      console.log("Ayo! Sorry, try again");
    }
    requestUpdate.onsuccess = (e) => {
      console.log("Ah ha! You're good to go boss!")
    } */
   
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
