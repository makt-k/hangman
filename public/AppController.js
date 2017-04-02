var app = angular.module('Hangman', ['ngResource', 'angular.filter']);

app.controller('AppController', function($scope, $rootScope, $resource) {
    // set initial state
    const validPositions = [];
    const maxNumOfWrongGuesses = 10;
    let numOfWrongGuesses = 0;

    function init() {
        $scope.title = 'The Hallow Hangman with Node and Angular';
        $scope.gameOver = false;
        $scope.gameWon = false;
        startGame();
    }

    function submitGuess(userInput) {
        const guess = $resource('/validateGuess');

        // send user's guess to the server for validation
        guess.save({ letter: userInput }, function(res) {
            if(!res.validPositions.length) return drawHangman();

            // use the spread operator instead of .apply to update the validPositions array
            validPositions.push(...res.validPositions);
            $scope.validPositions = validPositions;
            if($scope.validPositions.length === $scope.lettersArray.length) return wonGame();
        });
    }

    function drawHangman() {
        // increment number of incorrect guesses and update hangman image
        numOfWrongGuesses++;
        $scope.imgSrc = `/img/${numOfWrongGuesses}.jpg`;

        // if maxed out incorrect guesses, end the game
        if (numOfWrongGuesses === maxNumOfWrongGuesses) return endGame();
    }

    function wonGame() {
        $scope.gameWon = true;
        $scope.gameOver = true;
    }

    function endGame() {
        $scope.gameOver = true;
    }

    function startGame() {
        const gameInit = $resource('/initGame');

        // get random word from server
        gameInit.get({}, function(res) {
           $scope.lettersArray = res.randomWord.split('');
        })

        // set initial image
        $scope.imgSrc = '/img/0.jpg';
    }

    $scope.submitGuess = function(userInput) {
        submitGuess(userInput);

        // clear input field and reset error state
        $scope.guess = '';
        $scope.guessForm.guess.$pristine = true;
    }

    $scope.restartGame = function(){
        window.location.reload();
    }

    init();
});
