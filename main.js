import './movie.js';


const form = document.querySelector("form");
const input = document.querySelector("#search");
const year = document.querySelector("#year");
const required = document.querySelector("[required]");
const resultsSection = document.querySelector("#results");
const favoritesSection = document.querySelector("#favorites");
const apikey = document.querySelector('#key');
const APIKEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = `http://www.omdbapi.com/?apikey=${APIKEY}&type=movie&s=`;

/*for (const input of required) {
  input
  .closest(".form-group")
  .querySelector("label")
  .classList.add("required");
}

year.setAttribute('max', new Date().getFullYear());
year.addEventListener('input', (e) => {
  year.setCustomValidity('');
  year.checkValidity();
});

year.addEventListener('invalid', () => {
  if (Number(year.value) < Number(year.getAttribute('min'))) {
    year.setCustomValidity(
      `Year must be greater than or equal to ${year.getAttribute('min')}`,
    );
  } else if (Number(year.value) > Number(year.getAttribute('max'))) {
    year.setCustomValidity(
      `Year must be less than or equal to ${year.getAttribute('max')}`,
    );
  }
});

store.subscribe(
  (state) => {
    if (state.key) {
      apikey.value = state.key;
      apikey.closest('.form-group').style.display = 'none';
    } else {
      apikey.closest('.form-group').style.display = 'block';
    }
  },
  ['key'],
); */

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

