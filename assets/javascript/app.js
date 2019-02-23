$(document).ready(function () {

  // My Questions //
  var questions = [{
      question: "What is the capital of New Hampshire?",
      posAnswers: ["Manchester", "Portsmouth", "Concord", "Lee"],
      answer: 2,
    },
    {
      question: "Where was the first potato in the U.S. planted?",
      posAnswers: ["Londonderry", "Derry", "Dairy", "Potatoville"],
      answer: 0,
      image: "assets/images/Dust.jpg"
    },
    {
      question: "How many counties are there in New Hampshire?",
      posAnswers: ["7", "10", "12", "19"],
      answer: 1,
    },
    {
      question: "Which U.S. President was born in Hillsboro?",
      posAnswers: ["Chester A. Aurther", "Franklin Pierce", "David Palmer", "Grover Cleveland"],
      answer: 1,
    },
    {
      question: "How many states does New Hampshire border?",
      posAnswers: ["1", "2", "3", "4"],
      answer: 2,
    },
    {
      question: "What is the name of the ship on the New Hampshire flag?",
      posAnswers: ["USS Enterprise", "USS Washington", "USS Raleigh", "USS Richmond"],
      answer: 2,
    },
    {
      question: "What is the state fruit?",
      posAnswers: ["Apple", "Pumpkin", "Tomato", "Kiwi"],
      answer: 1,
    },
    {
      question: "What number state was New Hampshire when ratifying the U.S. Constitution?",
      posAnswers: ["1", "7", "9", "13"],
      answer: 2,
    },
    {
      question: "What is the State Motto?",
      posAnswers: ["Live Free and Buy", "Live Free or Die", "Solid as a (Granite) Rock", "We're Better then Old Hampshire"],
      answer: 1,
    },
    {
      question: "Where is America's Stonehenge located?",
      posAnswers: ["Salem","Exeter","Lee", "Contoocook"],
      answer: 0,
    }
  ];

  var correct = 0;
  var wrong = 0;
  var unanswer = 0;
  var timer = 15;
  var intervalId;
  var userGuess = "";
  var running = false;
  var quesCount = questions.length;
  var newArray = [];
  var questionBox = [];
  var pick;
  var index;




  $("#reset").hide();
  // Start Game
  $("#start").on("click", function () {
    $("#start").hide();
    startTimer();
    displayQuestion();
    for (var i = 0; i < questions.length; i++) {
      questionBox.push(questions[i]);
    }
  })
  // startTimer
  function startTimer() {
    if (!running) {
      intervalId = setInterval(decrement, 1000);
      running = true;
    }
  }
  //Count
  function decrement() {
    $("#time").html("<h3>Time Left: " + timer + "</h3>");
    timer--;

    //Timer stops when it hits 0
    if (timer === 0) {
      $("#time").hide();
      unanswer++;
      $("#answer").html("<p>Time is up! The correct answer is: " + pick.posAnswers[pick.answer] + "</p>");
      hideimage();
      stop();
    }
  }

  //Stop timer function
  function stop() {
    running = false;
    clearInterval(intervalId);
  }
  //Question is picked at Random
  function displayQuestion() {
    $("#time").show();
    index = Math.floor(Math.random() * questions.length);
    pick = questions[index];

 


    $("#question").html("<h2>" + pick.question + "</h2>");
    for (var i = 0; i < pick.posAnswers.length; i++) {
      var userChoice = $("<div>");
      userChoice.addClass("answerchoice");
      userChoice.html(pick.posAnswers[i]);
      userChoice.attr("data-guessvalue", i);
      $("#answer").append(userChoice);
    }



    //Select Answer with click
    $(".answerchoice").on("click", function () {
      
      userGuess = parseInt($(this).attr("data-guessvalue"));

      //Verify guess
      if (userGuess === pick.answer) {
        stop();
        correct++;
        userGuess = "";
        $("#answer").html("<p>Nice Work!</p>");
        hideimage();

      } else {
        stop();
        wrong++;
        userGuess = "";
        $("#answer").html("<p>Incorrect... It's " + pick.posAnswers[pick.answer] + "</p>");
        hideimage();
      }
    })
  }

  function hideimage() {

    newArray.push(pick);
    questions.splice(index, 1);

    var hidpic = setTimeout(function () {
      $("#answer").empty();
      timer = 15;

      //Scoring once all questions have cycled
      if ((wrong + correct + unanswer) === quesCount) {
        $("#question").empty();
        $("#question").html("<h3>Results: </h3>");
        $("#answer").append("<h4> Correct: " + correct + "</h4>");
        $("#answer").append("<h4> Incorrect: " + wrong + "</h4>");
        $("#answer").append("<h4> Not Answered: " + unanswer + "</h4>");
        $("#reset").show();
        correct = 0;
        wrong = 0;
        unanswer = 0;

      } else {
        startTimer();
        displayQuestion();

      }
    }, 3000);


  }
  // Reset
  $("#reset").on("click", function () {
    document.location.reload()

  })

})