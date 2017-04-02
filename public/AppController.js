var app = angular.module('Hangman', ['ngResource', 'angular.filter']);

app.controller('AppController', function($scope, $rootScope, $resource) {
    const maxNumOfWrongGuesses = 10;
    let numOfWrongGuesses;

    $rootScope.gamesWon = 0;
    $rootScope.gamesLost = 0;

    // set initial state
    function init() {
        $scope.title = 'The Hallow Hangman with Node and Angular';
        $scope.gameOver = false;
        $scope.gameWon = false;
        $scope.validPositions = [];
        $scope.guessedLetters = [];
        numOfWrongGuesses = 0;
        startGame();
    }

    function submitGuess(userInput) {
        const guess = $resource('/validateGuess');

        // send user's guess to the server for validation
        guess.save({ letter: userInput }, function(res) {

            if(!res.validPositions.length) return drawHangman();
            // use the spread operator instead of .apply to update the validPositions array
            $scope.validPositions.push(...res.validPositions);
            if($scope.validPositions.length === $scope.lettersArray.length) return wonGame();
        });
    }

    function drawHangman() {
        // increment number of incorrect guesses and update hangman image
        numOfWrongGuesses++;
        $scope.imgSrc = `/img/${numOfWrongGuesses}.jpg`;

        // if maxed out incorrect guesses, end the game
        if (numOfWrongGuesses === maxNumOfWrongGuesses) return lostGame();
    }

    function wonGame() {
        $scope.gameWon = true;
        $scope.gameOver = true;
        $rootScope.gamesWon++;
    }

    function lostGame() {
        $scope.gameOver = true;
        $scope.gameWon = false;
        $rootScope.gamesLost++
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
        $scope.duplicateGuess = false;

        // check for duplicate guesses
        if ( $scope.guessedLetters.includes(userInput)) return $scope.duplicateGuess = true;
        $scope.guessedLetters.push(userInput);

        submitGuess(userInput);

        // clear input field and reset error state
        $scope.guess = '';
        $scope.guessForm.$setPristine();
    }

    $scope.restartGame = function(){
        init();
    }

    init();
});
