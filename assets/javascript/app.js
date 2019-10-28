$(document).ready(function() {
    var trivia = {
        questions: [one = {
            question: "tbd",
            answers: ["tbd", "tbd", "tbd", "tbd"],
            answerKey: 0,
            gif: "img tbd"
        },
        two = {
            question: "tbd",
            answers: ["tbd", "tbd", "tbd", "tbd"],
            answerKey: 0,
            gif: "img tbd"
        },
        three = {
            question: "tbd",
            answers: ["tbd", "tbd", "tbd", "tbd"],
            answerKey: 0,
            gif: "img tbd"
        },
        four = {
            question: "tbd",
            answers: ["tbd", "tbd", "tbd", "tbd"],
            answerKey: 0,
            gif: "img tbd"
        },
        five = {
            question: "tbd",
            answers: ["tbd", "tbd", "tbd", "tbd"],
            answerKey: 0,
            gif: "img tbd"
        },
        six = {
            question: "tbd",
            answers: ["tbd", "tbd", "tbd", "tbd"],
            answerKey: 0,
            gif: "img tbd"
        },
        seven = {
            question: "tbd",
            answers: ["tbd", "tbd", "tbd", "tbd"],
            answerKey: 0,
            gif: "img tbd"
        }], 

        // askQuestion: function(index){
        //     $("#question").text(trivia.questions[index].question);
        //     $.each(trivia.questions[index].answers, function (i, ans) { 
        //         var ansBtn = $("<button>");
        //         ansBtn.addClass("btn btn-light qbtn");
        //         ansBtn.attr("question", i);
        //         ansBtn.text(ans);
        //         $("#answers").append(ansBtn);
        //         qNum = index;
        //     });
        // },


    }
    var seconds;
    var intervalId;
    var qNum;

    function askQuestion(index){
        $("#question").text(trivia.questions[index].question);
        $.each(trivia.questions[index].answers, function (i, ans) { 
            // var ansBtn = $("<div>");
            // ansBtn.addClass("btn btn-light qbtn");
            // ansBtn.attr("question", i);
            // ansBtn.text(ans);
            // $("#answers").append(ansBtn);
            var ansBtn = $("#q"+i);
            //ansBtn.addClass("btn btn-light qbtn");
            ansBtn.attr("question", i);
            ansBtn.text(ans);
            //$("#answers").append(ansBtn);
            qNum = index;
        });
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
        }
    }
    //  The stop function
    function stop() {
        //  Clears our intervalId
        //  We just pass the name of the interval
        //  to the clearInterval function.
        clearInterval(intervalId);
    }

    $("#start").on("click", function(){
        $("#start").css("visibility", "hidden")
        askQuestion(0);
        startTimer(30);
    })

    $(".qbtn").on("click", function(){
        
        var idx = $(this).attr("question");
        console.log("button clicked", idx, $(this).attr("question"), trivia.questions[qNum].answerKey)
        if(idx == trivia.questions[qNum].answerKey){
            // insert function for win
            console.log("win");
        } else {
            // insert function for loss
            console.log("loss");
        }
    })


})