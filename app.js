 /*
Game rules
-The game has 2 players, playing in rounds.
-In each turn, a player rolls a dice as many times as he wishes.Each result get added to the his ROUND score.
-But , if the player rolls a 1 , all his ROUND score gets lost.After that it's the next player's turn.
-Also the player looses his ENTIRE SCORE if he/she rolls two 6 in a row and after that , it's next player's turn
-The player can choose to 'HOLD' which means that his ROUND score gets added to the GlOBAL score.After that it's the next player's turn.
-The players can set the winning score and change the predefined of 100
-The first player to reach 100 points on GLOBAL score wins the game
*/

/************************************VARIABLE INITIALISATION***********************/

/********-GAMEPLAYING IS A STATE VARIABLE which keep track of the game .
**********-When there is a winner, the game should end and clicking the rolldice or hold buttons won't have any effect to both
**********-the roundScore or global score***********/

var scores , roundScore , activePlayer  , lastDice , gamePlaying;


//Calling the init fuction to set the game to start
init();


 /*************************************ROLL THE DICE Event Listener*********************************************/

  document.querySelector(".btn-roll").addEventListener("click" , function() {
    if (gamePlaying) {

      //GET THE DICE ROLL RESULT
       var dice = Math.floor(Math.random()*6) + 1;


       //DISPLAY THE RESULT

        document.querySelector(".dice").style.borderRadius = "30px";
        document.querySelector(".dice").style.width = "20%";

        //Display the dice inconjuction with the rolled result of the dice
         document.querySelector(".dice").style.display = "block";

       document.querySelector(".dice").src = "images/dice-"+ dice + ".jpg";



       //UPDATE THE RESULTS IF ROLL RESULT IS NOT 1 AND TWO 6 IN A ROW

       if (dice === 6 && lastDice === 6 ) {
         scores[activePlayer] = 0;

       }
       else if(dice !== 1) {
         roundScore += dice;
         document.querySelector("#current-" + activePlayer).textContent = roundScore;

       }

       else {
         //NEXT PLAYERS'S TURN
         nextPlayer();
       }

            lastDice = dice;
    }



  } );

 /************************************HOLD THE GAME Event Listener*********************************************/

  document.querySelector(".btn-hold").addEventListener("click" , function() {

    if (gamePlaying) {

      //GET THE GLOBAL SCORE
      scores[activePlayer] += roundScore;

      //DISPLAY THE RESULT/ UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

      //CHECKING IF THE FINAL SCORE FIELD IS SET OR NOT
        var input = document.querySelector(".final-score").value;
        var winningScore;

         if (input) {
           winningScore = input;
         }
         else{
           winningScore = 100;
         }

     //CHECK IF THE PLAYER WON THE GAME
     if(scores[activePlayer] >= winningScore) {

       document.querySelector("#name-" + activePlayer).textContent =  "You win the game!";
       document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
       document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
       document.querySelector(".dice").style.display = "none";
       gamePlaying = false;


     }
      //NEXT PLAYERS'S TURN
      else {
       nextPlayer();
     }
    }


  });

  /************************************FUNCTIONS**********************************/

// Calling next player if the active player rolls a 1
  function nextPlayer() {

    activePlayer === 0 ?   activePlayer = 1 :  activePlayer = 0;
      roundScore = 0;

  //Set the current score of aech player to 0 if either of the player rolled a 1

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

//Removing or adding the "active" class from the players
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

// Hide the dice
    document.querySelector(".dice").style.display = "none";

  }

// Calling the initialisation function to start the game
  function init() {

     scores = [0,0];
     roundScore = 0;
     activePlayer = 0;
     gamePlaying = true;

    document.querySelector(".dice").style.display = "none";


    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");


 }

 /************************************NEXT GAME Event Listener*********************************************/

  document.querySelector(".btn-new").addEventListener("click" , init);



  /********************************************THE END *****************************************************/
