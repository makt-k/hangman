const express = require('express');
const router = express.Router();
const randomWords = require('random-words');

router.get('/initGame', (req, res) => {
  // fetch new random word
  const randomWord = randomWords();

  // save random word to app memory
  req.app.word = randomWord;

  // send random word to client
  res.send({ randomWord });
});

module.exports = router;
