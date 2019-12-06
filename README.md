# TriviaGame
Timed Trivia Game

A little bit of random movie trivia never hurt anyone. Beware of trying to trick the game - the order
of the questions and the order the answers will be randomized each time through the game!

Please access the game at https://alixgrillo.github.io/TriviaGame/.


## Table of Contents
* [About](#about)
* [How to Play](#how-to-play)
* [Technical Features](#technical-features)
* [Requirements](#requirements)
* [Build Tools](#build-tools)
* [Acknowledgements](#acknowledgements)


## About
The Cinema Trivia game asks the user to answer 7 multiple choice movie questions. The user will be timed
from the moment they hit the start button and will have 30 seconds to answer each question. If answered
correctly, the user will be rewarded with a positive gif relating to the movie in question, otherwise, the 
gif will be more chastising in nature.

<img src="/assets/images/movies.gif">

## How to Play
To begin the game, the user hit the start button. The first question will appear and the timer will begin
counting down from 30 seconds.

<img src="/assets/images/start-game.gif">

The user should choose one of the four answers. If the answer is correct, a rewarding gif will populate 
about the movie related to the question. 

<img src="/assets/images/correct-answer.gif">

If the answer is incorrect, or if the user fails to answer within the alloted time, then a different gif
will populate. The next question will automatically generate after 5 seconds.

<img src="/assets/images/incorrect-answer.gif">

## Technical Features
* Leveraged `SetInterval()` method to incorporate a time element to the game. The clock starts over whenever
an answer is chosen and the player is penalized for letting time elapse.
* A `Math.floor(Math.random())` method is used to create random arrays controlling the question order and answer 
order for each question so that every game will be unique to the user.
* JQuery dynamically controls the DOM as the entire game exists in one browser.

## Requirements
There are no requirements for this game.

## Build Tools
* HTML/CSS
* Bootstrap 4.3.1 
* JQuery 3.2.1
* Google Font 

## Acknowledgements
* Thanks to Google fonts for all the variations of fonts available.
* Thanks to Google for finding excellent and related gifs to use.