const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shinIndexedDB;

const dbName = "movieCollection";

(function () {

let db;

const request = window.indexedDB.open("movieCollection", 1);

// targets request that generate an error
// adds a single error event all all database objects
request.onerror = (e) => {
 console.error(`Ayo! You got an erorr: ${e.target.errorCode}`);
  
};

request.onsuccess = (e) => {
  db = e.target.result;
  console.log("Ah ha! Good to go!")
};

request.onupgradeneeded = (e) => {
  const db = e.target.result;
  const objectStore = db.createObjectStore("movie", {keyPath: "imdbID"});
  objectStore.createIndex("title", "title", { unique: false});
  objectStore.createIndex("year", "year", {unique: true});
  // transaction is created to make sure object store is finished 
  
  objectStore.put({title: "Final Fantasy XV: Omen", year: "2016", imdbID: "tt6301920" });
  objectStore.put({title: "Final Fantasy XV: Episode Ardyn - Prologue", year: "2019", imdbID: "tt9860590" });
  objectStore.put({title: "Final Fantasy VII: Advent Children", year: "2005", imdbID: "tt0385700" });
  

}

})();

