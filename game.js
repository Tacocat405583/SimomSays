var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;



//check if the game has started
$(document).keydown(function(){
    if(!gameStarted){
        gameStarted = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});


//generate a random sequence of colours
function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Show the sequence with a different animation
    $("#" + randomChosenColour).addClass("game-sequence");
    setTimeout(function() {
        $("#" + randomChosenColour).removeClass("game-sequence");
    }, 300);
    
    playSound(randomChosenColour);
}

//detect when and which button is clicked
//and do a bunch of stuff based on what we add on
$(".btn").click(function() {
    //store the id of the button that just got clicked
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    //once we click we will pass the index of the last answer in the users sequence
    checkAnswer(userClickedPattern.length - 1);
    

});

//play the sound of the button that is clicked
function playSound(name) {
    const audio = new Audio("./sounds/" + name + ".mp3");
    audio.volume = 0.2;  // Set volume to 50%
    audio.play();
}
//self explanatory
function animatePress(currentColour) {
    //add pressed class to function that wes pressed
    $("#" + currentColour).addClass("pressed");

    //removed after 100ms
    //used https://stackoverflow.com/questions/20684926/jquery-add-a-class-and-remove-it-after-500ms/20684975
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {
    //check if the most recent user answer is the same as the game pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        
        //check if user has finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
            //wait 1000ms before showing the next sequence
            setTimeout(function() {
                nextSequence();
                userClickedPattern = []; //reset the user's pattern for the next level
            }, 1000);
        }
    } else {
        console.log("wrong");
        console.log("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart"); 
        startOver();
    }
}

//reset the game
//click will start the game again
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}




