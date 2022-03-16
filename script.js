var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})



function nextSequence() {

  userClickedPattern = [];
  level++;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#level-title").text("Level " + level);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();

}



function handler() {

  $(".btn").on("click", function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length - 1)

    var audio = new Audio("sounds/" + userChosenColor + ".mp3");
    audio.play();

  })
}

handler();



function animatePress() {

  $(".btn").on("click", function() {

    var userChosenColor = $(this).attr("id");

    $("#" + userChosenColor).addClass("pressed");

    setTimeout(function() {$("#" + userChosenColor).removeClass("pressed")}, 100);

  })

}

animatePress();



function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {nextSequence()}, 1000);

    }

  }


  else {

    $("body").addClass("game-over");

    setTimeout(function() {$("body").removeClass("game-over")}, 200);

    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

  }

}



function startOver() {

  started = false;
  level = 0;
  gamePattern = [];

}
