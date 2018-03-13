// Specify what function should run as soon as this page has been
// completely loaded
$(document).ready(readyFunc);

// Execute this code after this web page has been fully loaded
function readyFunc() {

//  $("body").on("click", "#start-button", function() {)  if needed
  // This is the player logon button click handler
  $("#start-button").on("click", function() {

  });
}  // end readyFunc()

      /*
          // Initialize Firebase
          // This is the code we copied and pasted from our app page
          var config = {
            apiKey: "AIzaSyAJS4YQWU5DmESeYueG1qH1NGkjv3DncEY",
            authDomain: "fir-click-counter-7cdb9.firebaseapp.com",
            databaseURL: "https://fir-click-counter-7cdb9.firebaseio.com",
            storageBucket: "fir-click-counter-7cdb9.appspot.com"
          };
      */
      
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyCxYahYzCYiT8PkGf14S8yYcI0-e32_3wk",
            authDomain: "ucsdproject-30ce8.firebaseapp.com",
            databaseURL: "https://ucsdproject-30ce8.firebaseio.com",
            projectId: "ucsdproject-30ce8",
            storageBucket: "ucsdproject-30ce8.appspot.com",
            messagingSenderId: "618734864348"
          };
        
            firebase.initializeApp(config);
        
            // Variables
            // ================================================================================
        
            // Get a reference to the database service
            var database = firebase.database();
        
            // Initializing our click count at 0
            var clickCounter = 0;
        
            // Functions
            // ================================================================================
        
            // On Click
            $("#click-button").on("click", function() {
        
              // Add 1 to clickCounter
              clickCounter++;
        
              // **** Store Click Data to Firebase in a JSON property called clickCount *****
              // **** Note how we are using the Firebase .set() method ****
              // **** .ref() refers to the path you want to save your data to
              // **** Since we left .ref() blank, it will save to the root directory
              database.ref().set({
                clickCount: clickCounter
              });
        
              // Now! go to https://fir-click-counter-7cdb9.firebaseio.com/ to see the impact to the DB
              // Now! go to https://ucsdproject-30ce8.firebaseio.com/ to see the impact to the DB
            });
  