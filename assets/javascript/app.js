$(document).ready(function() {
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

        // questionOrder: [
        //     order0 = [0,1,2,3,4,5,6],
        //     order1 = [3,6,2,1,5,0,4],
        //     order2 = [1,5,2,4,2,0,6],
        //     order3 = [4,2,6,1,5,3,0],
        //     order4 = [5,2,4,0,1,6,3]
        // ]


    }
    var seconds;
    var intervalId;
    

    var wins=0;
    var losses=0;
    var unanswered=0;
    var questionOrderIdx = "order"+Math.floor(Math.random()*5);
    // var qNumIdx;
    //var qNum = trivia.questionOrder.questionOrderIdx[qNumIdx];
    var qNum;

    function askQuestion(index){
        $("#question").html("<h2>"+trivia.questions[index].question+"<h2>");
        $(".qbtn").css("visibility", "visible");
        $.each(trivia.questions[index].answers, function (i, ans) { 
            // var ansBtn = $("<div>");
            // ansBtn.addClass("btn btn-light qbtn");
            // ansBtn.attr("question", i);
            // ansBtn.text(ans);
            // $("#answers").append(ansBtn);
            var ansBtn = $("#q"+i);
            //ansBtn.addClass("btn btn-light qbtn");
            ansBtn.attr("question", i);
            ansBtn.html(ans);
            //$("#answers").append(ansBtn);
            qNum = index;
            //qNum = trivia.questionOrder[qNumIdx];
        });
    }

    function newQuestion(){
        console.log(qNum);
        $("#gifs").empty();
        $("#result").empty();
        askQuestion(qNum);
        startTimer(30);
    }
    
    function startTimer(time){
        seconds = time;
        clearInterval(intervalId);
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
          //  ...run the stop function.
          stop();
          // INSERT FUNCTION HERE!!!
          timeOut();
        }
    }
    //  The stop function
    function stop() {
        //  Clears our intervalId
        //  We just pass the name of the interval
        //  to the clearInterval function.
        clearInterval(intervalId);
        $("#timer").empty();
    }

    $("#start").on("click", function(){
        $("#start").css("visibility", "hidden");
        askQuestion(0);
        startTimer(30);
    })

    $(".qbtn").on("click", function(){
        stop();
        var idx = $(this).attr("question");
        console.log("button clicked", idx, $(this).attr("question"), trivia.questions[qNum].answerKey)
        if(idx == trivia.questions[qNum].answerKey){
            win();
            console.log("win");
        } else {
            loss();
            console.log("loss");
        }
    })

    function win(){
        wins++;
        $("#result").html("<h2>Correct!</h2>");
        $("#gifs").html("<img src="+trivia.questions[qNum].gif+">");
        setResults();
    }

    function loss(){
        losses++;
        $("#result").html("<h2>Incorrect! The correct answer is "+ trivia.questions[qNum].answers[trivia.questions[qNum].answerKey] + "</h2>");
        $("#gifs").html("<img src="+trivia.questions[qNum].gifIncorrect+">");
        setResults();
    }

    function timeOut(){
        unanswered++;
        $("#result").html("<h2>Out of Time! The correct answer is "+ trivia.questions[qNum].answers[trivia.questions[qNum].answerKey] + "</h2>");
        $("#gifs").html("<img src="+trivia.questions[qNum].gifIncorrect+">");
        setResults();
    }
    function setResults(){
        $(".qbtn").css("visibility", "hidden");
        qNum++;
        console.log(qNum);
        if (qNum === trivia.questions.length){
            setTimeout(endGame, 5*1000);
        } else {
            setTimeout(newQuestion, 5*1000);
        }
    }

    function endGame(){
        $("#question").empty();
        $("#gifs").empty();
        if(wins>4){
            $("#gifs").html("<img src='assets/images/chuckNorris-gif.gif'>");
        } else {
            $("#gifs").html("<img src='assets/images/thumbsDown.gif'>");
        }
        $("#result").empty();
        $("#answers").empty();
        $("#result").html("<h2>All done, here's how you did:</h2><br>");
        $("#result").append("<h2>Correct Answers: " + wins + "</h2>");
        $("#result").append("<h2>Incorrect Answers: " + losses + "</h2>");
        $("#result").append("<h2>Unanswered Questions : " + unanswered + "</h2>");
        $(".reset").css("visibility", "visible");
    }
    $(".reset").on("click", function(){
        location.reload();
    })

})