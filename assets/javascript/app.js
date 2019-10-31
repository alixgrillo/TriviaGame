$(document).ready(function() {
    // the trivia object contains all of the questions and answers for the 
    // game. There is a question, an array of answers that will be buttons
    // and and an answer key to determine if the user selects the right answer.
    // There are two gifs associated with each question for correct and incorrect
    // answers - the timeout function will display the incorrect gif.
    var trivia = {
        questions: [one = {
            question: "Special Agent 'James Bond' works for which secret service agency?",
            answers: ["The Q", "BIA", "CDO", "MI6"],
            answerKey: 3,
            gif: "assets/images/bond-correct.gif",
            gifIncorrect: "assets/images/bond-incorrect.gif"
        },
        two = {
            question: "What is the name of Captain Jack Sparrow's ship?",
            answers: ["The Black Pearl", "The Maurader", "The Jolly Roger", "The Wyndlass"],
            answerKey: 0,
            gif: "assets/images/jackSparrow-correct.gif",
            gifIncorrect: "assets/images/jackSparrow-incorrect.gif"
        },
        three = {
            question: "Which fictional character enjoyed eating some liver, with fava beans and a nice chianti?",
            answers: ["Dr Victor Frankenstein", "Hannibal Lector", "Dr Richard Kimble", "Dr Frasier Crane"],
            answerKey: 1,
            gif: "assets/images/hannibalLector-correct.gif",
            gifIncorrect: "assets/images/hannibalLector-incorrect.gif"
        },
        four = {
            question: "What is the character name of the main little boy who finds one of the five 'Golden Tickets' in the 1971 movie 'Willy Wonka & The Chocolate Factory'?",
            answers: ["Charlie Harper", "Charlie Bucket", "Charlie McGee", "Charlie Allnut"],
            answerKey: 1,
            gif: "assets/images/willyWonka-correct.gif",
            gifIncorrect: "assets/images/willyWonka-incorrect.gif"
        },
        five = {
            question: "What was the name of Del's pet mouse in the movie 'The Green Mile'?",
            answers: ["Furlough",  "Templeton","Mr Jingles", "Roquefort"],
            answerKey: 2,
            gif: "assets/images/greenMile-correct.gif",
            gifIncorrect: "assets/images/greenMile-incorrect.gif"
        },
        six = {
            question: "'Holly Golightly' is a character in what movie?",
            answers: ["Breakfast at Tiffany's", "Gentlemen Prefer Blondes", "Roman Holiday",  "The Courtship of Andy Hardy"],
            answerKey: 0,
            gif: "assets/images/breakfastTiffanys-correct.gif",
            gifIncorrect: "assets/images/breakfastTiffanys-incorrect.gif"
        },
        seven = {
            question: "In the movie 'Donnie Darko' what type of animal is his imaginary friend 'Frank'?",
            answers: ["A large spider", "A large koala bear", "A large hamster", "A large bunny rabbit"],
            answerKey: 3,
            gif: "assets/images/donnieDarko-correct.gif",
            gifIncorrect: "assets/images/donnieDarko-incorrect.gif"
        }], 

        // there are several orders that the questions can be displayed in - this 
        // adds some randomness to the game.
        questionOrder: [
            order0 = [0,1,2,3,4,5,6],
            order1 = [3,6,2,1,5,0,4],
            order2 = [1,5,2,4,3,0,6],
            order3 = [4,2,6,1,5,3,0],
            order4 = [5,2,4,0,1,6,3]
        ]


    }
    // variables that will be used for the timer
    var seconds;
    var intervalId;
    
    // set counters to display the number of correct and incorrect answers
    var wins=0;
    var losses=0;
    var unanswered=0;
    // determine the order of the questions, which is one of the 5 options in questionOrder
    var questionOrder = trivia.questionOrder[Math.floor(Math.random()*5)];
    // qNum will be used to keep track of which question the user is one - it will increment
    // by one, which will grab the next question number in questionOrder
    var qNum;

    // askQuestion will display the question and create buttons for the user
    function askQuestion(index){
        // display question
        $("#question").html("<h2>"+trivia.questions[questionOrder[index]].question+"<h2>");
        // for each answer available, create a button for the user to choose from 
        $.each(trivia.questions[questionOrder[index]].answers, function (i, ans) { 
            var ansBtn = $("<div>");
            ansBtn.addClass("btn btn-light qbtn");
            ansBtn.attr("question", i);
            ansBtn.text(ans);
            // append the button to the answers div
            $("#answers").append(ansBtn);
            // add a break - this forces the buttons to be in vertical display
            $("#answers").append("<br>");
            qNum = index;
        });
    }

    // this function will reset the page to set the stage for a new question to be asked
    function newQuestion(){
        // clear the previous question's gif and result
        $("#gifs, #result").empty();
        // ask a new question
        askQuestion(qNum);
        // start the timer counting down from 30 seconds
        startTimer(30);
    }
    
    // sets a timer for a set number of seconds
    function startTimer(time){
        // sets the global variable equal to the number of seconds desired
        seconds = time;
        // clears any previous intervalID
        clearInterval(intervalId);
        // starts a timer setting the global variable intervalId
        // this will run the decrement function each second
        intervalId = setInterval(decrement, 1000);
    }

     //  The decrement function.
    function decrement() {
        //  Decrease number by one.
        seconds--;
        //  Show the number in the #show-number tag.
        $("#timer").html("<h2>Time Remaining: " + seconds + " Seconds</h2>"); 
        //  Once number hits zero...
        if (seconds === 0) {
          //  ... run the stop function.
          stop();
          // run the timeout function, which will tell user that they ran out of time
          timeOut();
        }
    }
    //  The stop function
    function stop() {
        //  Clears our intervalId
        //  We just pass the name of the interval
        //  to the clearInterval function.
        clearInterval(intervalId);
        // clears the timer div as timer is done
        $("#timer").empty();
    }

    // starts the game
    function startGame(){
        // hide the start button
        $("#start").css("visibility", "hidden");
        // ask the first question in the chosen question order
        askQuestion(0);
        // start the timer with 30 seconds
        startTimer(30);
    }

    // activiate the startGame function when clicking the start button
    $(document).on("click", "#start", startGame);

    // determines what happens when a user chooses one of the answer buttons
    function chooseAnswer(){
        // stop the timer - the user has met the time        
        stop();
        // figure out the index of the answer they chose
        var idx = $(this).attr("question");
        // if the index matches the answerKey, then it's a correct answer (run
        // win function), otherwise, it's incorrect (run loss function)
        if(idx == trivia.questions[questionOrder[qNum]].answerKey){
            win();
        } else {
            loss();
        }
    }
    
    // on the click of any of the answer (qbtn) buttons, run the chooseAnswer function
    $(document).on("click", ".qbtn", chooseAnswer);

    // when the user picks the right answer
    function win(){
        // incrememnt the correct answers counter
        wins++;
        // tell the user they got it correct
        $("#result").html("<h2>Correct!</h2>");
        // display the correct gif
        $("#gifs").html("<img src="+trivia.questions[questionOrder[qNum]].gif+">");
        // run the setResults function
        setResults();
    }

    // when the user picks the incorrect answer
    function loss(){
        // incremement the incorrect answers counter
        losses++;
        // tell the user they got it incorrect and display the correct answer
        $("#result").html("<h2>Incorrect! The correct answer is "+ trivia.questions[questionOrder[qNum]].answers[trivia.questions[questionOrder[qNum]].answerKey] + "</h2>");
        // display the gif for incorrect answers
        $("#gifs").html("<img src="+trivia.questions[questionOrder[qNum]].gifIncorrect+">");
        // run the setResults function
        setResults();
    }

    // when the user doesn't pick an answer in the time allotted
    function timeOut(){
        // increment the unanswered questions counter
        unanswered++;
        // tell the user they got ran out of time and display the correct answer
        $("#result").html("<h2>Out of Time! The correct answer is "+ trivia.questions[questionOrder[qNum]].answers[trivia.questions[questionOrder[qNum]].answerKey] + "</h2>");
        // display the gif for incorrect answers
        $("#gifs").html("<img src="+trivia.questions[questionOrder[qNum]].gifIncorrect+">");
        // run the setResults function
        setResults();
    }

    // the setResults function runs the shared set of steps that are needed anytime
    // a user choosed an answer or runs out of time
    function setResults(){
        // clears the answer buttons
        $("#answers").empty();
        // increments the question counter to display the next question
        qNum++;
        // if they have seen all of the questions, then we end the game; otherwise,
        // the user gets a new question - the gif will display for 5 seconds before moving
        // on to the next step
        if (qNum === trivia.questions.length){
            setTimeout(endGame, 5*1000);
        } else {
            setTimeout(newQuestion, 5*1000);
        }
    }

    // this changes the displays of the page that ends the game
    function endGame(){
        // clear out all divs with questions, answers, and gifs
        $("#question, #result, #answers, #gifs").empty();
        // if they got more than 4 questions right, they get a chuck
        // norris gif, otherwise, they get a sad office thumbs down gif
        if(wins>4){
            $("#gifs").html("<img src='assets/images/chuckNorris-gif.gif'>");
        } else {
            $("#gifs").html("<img src='assets/images/thumbsDown.gif'>");
        }
        // display to the user the results of their game
        $("#result").html("<h2>All done, here's how you did:</h2><br>");
        $("#result").append("<h2>Correct Answers: " + wins + "</h2>");
        $("#result").append("<h2>Incorrect Answers: " + losses + "</h2>");
        $("#result").append("<h2>Unanswered Questions : " + unanswered + "</h2>");
        // unhide the reset button
        $(".reset").css("visibility", "visible");
    }

    // allows the user to reset the game by click reset
    $(".reset").on("click", function(){
        // empty the gifs and results of the previous game
        $("#gifs, #result").empty();
        // hide the reset button
        $(".reset").css("visibility", "hidden");
        // reset the counters for the new game
        wins=0;
        losses=0;
        unanswered=0;
        // pick a new question order
        questionOrder = trivia.questionOrder[Math.floor(Math.random()*5)];
        // run startGame function
        startGame();
        
    })

})