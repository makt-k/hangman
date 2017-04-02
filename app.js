const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const routes = require('./routes');

// init server
const app = express();
const hbs = exphbs.create();

// config app
app.engine('html', hbs.engine);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use(routes.initGame);
app.use(routes.validateGuess);

module.exports = app;

const port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});
