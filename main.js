import './movie.js';


const form = document.querySelector("form");
const input = document.querySelector("#search");
const resultsSection = document.querySelector("#results");
const favoritesSection = document.querySelector("#favorites");
const APIKEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = `http://www.omdbapi.com/?apikey=${APIKEY}&type=movie&s=`;

const state = {
  search: '',
  results: [],
  favorites: []

};

input.addEventListener("keyup", () => {
  state.search = input.value;
  console.log(state);
});

form.addEventListener("submit", formSubmitted);
// Function takes the search term and calls the getResults function to get the results
async function formSubmitted(e) {
  e.preventDefault();
  try {
 state.results = await getResults(state.search);
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
  }
function updateFavoritesSection() {
  favoritesSection.innerHTML = state.favorites.reduce((html, movie) => {
    return html + getMovieTemplate(movie, 12, false);
  }, '');
    
}