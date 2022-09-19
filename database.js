import "/movie.js";
import "/main.js";

(function() {


  var database, idb_request;

  idb_request = window.indexedDB.open("movie-db", 1);

  idb_request.addEventListener("error", function(e) {

    alert("Could not open Indexed DB due to error: " + this.errorCode);

  });

  idb_request.addEventListener("upgradeneeded", function(e) {

    var storage = this.result.createObjectStore("data", { autoIncrement: true });

    // add an object to the "data" objectStore with the key, "movie-key"
    storage.add({ APIKEY: "f08d33dc", notes: "no notes found.", favorites: "0" }, "movie-key");

    alert("Hey!👋😊 Creating a new database!");

  });

  // if you successfully open the database use this callback function
  idb_request.addEventListener("success", function(e) {

    database = this.result;// store the database for later use

    // use some data from our database
    var storage = database.transaction("data", "readwrite").objectStore("data");

    storage.get("movie-key").addEventListener("success", function(e) {

     // Notes = document.notes = this.result.notes;
      document.getElementById("notes").textContent = this.result.notes; // Fix this
      document.getElementById("favorites").innerHTML = this.result.favorites;
     // favorites = document.getElementById("favorites").innerHTML = this.result.favorites;

      this.result.notes = new Notes().toString();
      this.result.favorites = new favorites().toString();

      storage.put(this.result, "movie-key");

    });

    alert("Successfully opened database 😁👍!");

  });

  // all the variables to run our application
  var buttons, Notes, favorites;

  // get the array of buttons:
  buttons = document.querySelectorAll("buttons");

  // set favorites equal to zero (this will be reset if our database loads):
  favorites = 0;

  // loop through all the buttons:
  for (let index = buttons.length - 1; index > -1; -- index) {

    // add a click listener to each button:
    buttons[index].addEventListener("click", function(e) {
      
      // Clear the database if the X button is pressed (X has not been created yet):
      if (database && this.innerHTML == "X") {

        window.indexedDB.deleteDatabase("movie-db");

        database = undefined;

        // Ignore delete database code: I haven't set up html for this yet. 
        document.querySelectorAll("button").value;
        document.querySelector("h1").innerHTML = "You just deleted the database! Refresh the page to create a new one.";
        document.querySelector("h1").style = "color:" + background; // feature has not been created yet
        document.body.style.backgroundColor = "#ffffff"; // featured has not been craeted yet

        return;

      } else if (database) { // if the database was established

        presses ++;

        // when a button is clicked, store its background color for saving:
        background = this.style.backgroundColor;
        // change the background color of the page to the button's color:
        document.body.style.backgroundColor = background;

        document.getElementById("favorites").innerHTML = favorites;

        // save the new data to the database in the objectStore, "data"
        var storage = database.transaction("data", "readwrite").objectStore("data");
        // get returns the object pointed to by the key, "save-data"
        storage.get("movie-key").addEventListener("success", function(e) {

          this.result.Notes = Notes;
          this.result.favorites = favorites;

          // put writes the changed object back to the "data" objectStore
          storage.put(this.result, "movie-key");

        });

      }

    });

  }

})();
