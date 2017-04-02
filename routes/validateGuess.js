const express = require('express');
const router = express.Router();


router.post('/validateGuess', function(req, res) {
  const correctWord = req.app.word;
  const guessedLetter = req.body.letter;
  let validPositions = [];
  let letterPosition = correctWord.indexOf(guessedLetter);

  // check to see if the guessedLetter is part of the word
  while (letterPosition != -1) {
    validPositions.push(letterPosition);

    // continue check in case there are multiple instances of the guessedLetter in the word
    letterPosition = correctWord.indexOf(guessedLetter, letterPosition + 1);
  }

  // send array of letterPositions to client
  res.send({ validPositions });

});

module.exports = router;
