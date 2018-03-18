// Variables
// ================================================================================

// Firebase configuration parameters
var config = {
    apiKey: "AIzaSyCxYahYzCYiT8PkGf14S8yYcI0-e32_3wk",
    authDomain: "ucsdproject-30ce8.firebaseapp.com",
    databaseURL: "https://ucsdproject-30ce8.firebaseio.com",
    projectId: "ucsdproject-30ce8",
    storageBucket: "ucsdproject-30ce8.appspot.com",
    messagingSenderId: "618734864348"
  };

// reference to the database service
var database = null;

var initialized = false;

const choices = {
  NULLCHOICE: 'rpsNULL',
  NONE:       'rpsNONE',
  ROCK:       'rpsROCK',
  PAPER:      'rpsPAPER',
  SCISSORS:   'rpsSCISSORS'
};

var myWins = 0;
var myLosses = 0;
var myChoice = choices.NONE;
var myName = ' ';

// totals for the opponent
var opWins = 0;
var opLosses = 0;
var opChoice = choices.NONE;
var opName = ' ';

var ties = 0;

// whose turn is it? player 1 or player 2
var turn = 1;

// Values read from the database are stored into these variables
var scratchWins1;
var scratchLosses1;
var scratchChoice1;
var scratchName1;

var scratchWins2;
var scratchLosses2;
var scratchChoice2;
var scratchName2;

var scratchties;
var scratchturn;

// Specify what function should run as soon as this page has been
// completely loaded
$(document).ready(readyFunc);

// Execute this code after this web page has been fully loaded
function readyFunc() {

  // Set the configuration for this app
  firebase.initializeApp(config);

  // Get a reference to the database service
  database = firebase.database();

  // Set up to be notified whenever the database is changed
  player1 = database.ref('Multi-rps/players/1/');
  player1.on('value', processChange);

  player2 = database.ref('Multi-rps/players/2/');
  player2.on('value', processChange);

  stuff = database.ref('Multi-rps/');
  stuff.on('value', processChange );


  // This is the player logon button click handler
  $("#start-button").on("click", function() {

    // Make sure that the user has entered a name
    var playerName = $('#user-name').val();
    if (playerName === '') {
      alert("Please enter the name that you want to use for this game.")
    }

    // Determine whether this Player 1 or Player 2
    // [Note: current_state contains a Promise object]
    execReadOnce();
    
    if ((scratchName1 === ' ') && (scratchName2 === ' ')) {
      // There are no players logged on -- this will be player 1
      setupNewPlayer(1, playerName);
    } else if ((scratchName2 === ' ')) {
      // This will be player 2
      setupNewPlayer(2, playerName);
    } else {
      // This will be player 1
      setupNewPlayer(1, playerName);
    }

  }); // on start-button click 

  // PSEUDOCODE start
  // This is the Rock/Paper/Scissors button click handler
  $(".rps-buttons").on("click", function() {

/*
    Store the enum for the choice that was made in the myChoice variable
    Call the writeRPSScores function to update the database and inform
    the other player that you just made a choice. 
 */
  });
// PSEUDOCODE end
  
  
  showInitialConfig();

  initialized = true;
}  // end readyFunc()

function showInitialConfig() {
  $('#rps-row').hide();
  $('#rules-row').hide();
  
  $('#greeting-line').hide();

  $('#status-line').hide();

  $('#player1-name').html('Waiting for Player 1');
  $('#player2-name').html('Waiting for Player 2');

  $('#player1-buttons').hide();
  $('#player2-buttons').hide();
  
  $('#player1-hand').attr('src', '');
  $('#player2-hand').attr('src', '');
  
  $('#player1-totals').hide();
  $('#player2-totals').hide();

  $('#outcome-text').html('');

  $('rule-text').html('');

  $('#rps-row').show();
}

function setupNewPlayer(playernum, theName) {

  var greetingName = $('#name1');
  var greetingNum  = $('#player-num');
  var playerName;

  greetingName.html(theName);

  switch (playernum) {
    case 1:
      playerName = $('#player1-name');
      greetingNum.html('1');
      playerName.html(theName);
      break;

    case 2:
      playerName = $('#player2-name');
      greetingNum.html('2');
      playerName.html(theName);
      break;
  }

  myWins = 0;
  myLosses = 0;
  myChoice = choices.NONE;
  myName = theName;
  ties = 0;
  turn = 1;

  if (scratchName2 !== ' ') {
    // player 2 already exists
    // Since we are a new player, any scores in the database for
    // player 2 are for a previous game -- clear the data for that
    // player as well
    opWins = 0;
    opLosses = 0;
    opChoice = choices.NONE;
  }

  // Make sure that the HTML elements containing the player's nane
  // are visible
  $('#greeting-line').show();
  
  $(((playernum == 1) ? '#player1-name' : '#player2-name')).show();

  /*
    PSEUDOCODE start
    Store the Wins, Losses and Ties for this player in the .game-totals
    paragraph
    
    Make the player's .game-totals paragraph visible
    PSEUDOCODE end
  */
}

function updateGameState() {
  /*
    PSEUDOCODE start
    The state of this player is known based on his or her's last move.
    if (this is player 1)
      examine the scratchChoice2 variable
    else
      examine te scratchChoice1 variable

    Update the .hand-image picture for the user that just made a play

    if both players have made a move then {}
      Deermine which player has won this game
      Display "<player name>"" Wins! in #outcome-text
      Display the winning play (e.g. "Paper Covers Rock") in #rule-text
      Update the Win total for the winner and the Loss total for the loser

      In the event that both players chose the same gesture, display 
      "Tie Game!" in #outcome-text, and increment the tie variable

      Use a timer to display the results of this game for a few seonds, 
      and then initiate a new game.
    }
    elseif only one player has made a move then set up the other player
           so that he/she can make a choice

    call writeRPSScores to update the database.
    PSEUDOCODE end
  */

}


// N.B. using set() overwrites data at the specified location,
//      including any child nodes
function writeRPSScores() {
  database.ref('Multi-rps/').set({
    turn: turn,
    ties: ties
  });

  database.ref('Multi-rps/players/1/').set({
    choice: myChoice,
    losses: myLosses,
    name: myName,
    wins: myWins
  });

  database.ref('Multi-rps/players/2/').set({
    choice: opChoice,
    losses: opLosses,
    name: opName,
    wins: opWins
  });
}

// wait until the web page has been completely loaded to
// attempt the first write to the database
var handle = setInterval(testInit, 200);

function testInit() {
  if (initialized === true) {
    clearInterval(handle);

    // This is the initial write to the database.
    // Subsequent writes will occur elsewhere
    // [The variables all have initial values]
    writeRPSScores();
  }
  return;
}

// Use the Firebase read once functionality to read all of the variables
// of this game. Store the retrieved values in the global scratch* variables

function execReadOnce() {
  var current_state = database.ref('Multi-rps/').once('value')
  .then(function(snapshot) {
          console.log(snapshot.val());  // DEBUG
          loadScratchVariables(snapshot);
  });
}

// This function gets called back whenever there is a change to the
// database
function processChange(snapshot) {
  loadScratchVariables(snapshot);
  updateGameState();
}

// Make the current database contents available to the entire script
function loadScratchVariables(snapshot) {
  var theObject = snapshot.val();
  scratchWins1 = theObject.players['1'].wins;
  scratchLosses1 = theObject.players['1'].losses;
  scratchName1 = theObject.players['1'].name;
  scratchchoice1 = theObject.players['1'].choice;

  scratchWins2 = theObject.players['2'].wins;
  scratchLosses2 = theObject.players['2'].losses;
  scratchName2 = theObject.players['2'].name;
  scratchchoice2 = theObject.players['2'].choice;

  scratchties = theObject.ties;
  scratchturn = theObject.turn;
}
              // Now! go to https://ucsdproject-30ce8.firebaseio.com/ to see the impact to the DB
  