// Searches the browser to see if support indexed
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shinIndexedDB;

const request = window.indexedDB.open("MovieCollection", 1);

request.onerror = (e) => {
    console.error("Hey! You got an error with your request :(");
    console.error(e);
  };

  request.onupgradeneeded = (event) => {
    // Save the IDBDatabase interface
    const db = event.target.result;
      // Create an objectStore for this database
  const objectStore = db.createObjectStore("MovieCollection", { keyPath: "id" });
  objectStore.createIndex("movie_genre", ["genre"], { unique: false });
  objectStore.createIndex("genre_and_year", ["genre", "year"], {
    unique: false, 
  });   

};

request.onsuccess = (e) => {
    db = e.target.result;
    const transction = db.transction("genre", "readwrite");
  }; 
    
