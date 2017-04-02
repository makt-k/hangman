## The Hallow Hangman
#### A quick AngularJS v1 / Node Hangman Game


##Synopsis
The intention of this project was to write a Hangman game as a Web application

##Game Logic
* When the game is started, the player is represented with an empty field for each letter in the word.
* When the player guesses a letter correctly, each field that represents that letter is filled with the letter.
* When the player guesses a letter incorrectly, a piece of a gallows with a hanging man is drawn.
* After 10 incorrect guesses, the game is over and the player lost.
* Thus, there should be 10 different states of the gallows to be drawn.
* If all fields are filled with their letter before 10 incorrect guesses, the player has won the game.

## Requirements
* Client implemented with AngularJS - *check!*
* Server implemented with NodeJS - *check!*!
* Game logic executed on the server (so nobody can cheat) - *check!*
* Allow for keeping simple statistics (games won/lost, based on a single session) - *check!*
* Game is self-contained - *check? see section below*
* Game must scale to millions of users - *check? see section below*

## Future developments
* Bundle and serve 3rd party libraries as ```vendor.js``` instead of using CDN
* Host game on AWS to scale to traffic

##Installation
Clone repo and run ```npm install```, then ```npm run start```

##Contributions
The set of Hangman images are by [Marc Oliveras](http://oligalma.com) under the Creative Commons License

**This game is built with love from Boston by Karen Mak**
