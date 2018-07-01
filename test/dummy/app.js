const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine(
  '.html',
  hbs({
    extname: '.html'
  })
);
app.set('view engine', '.html');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/form', function(req, res) {
  res.render('form');
});

app.post('/form', function(req, res) {
  const { username, password, realm } = req.body;

  res.render('posted', { username, password, realm });
});

module.exports = app;
