var express = require('express');
var path = require('path');
var request = require('request');
var app = express();

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.get('/api/data', (req, res) => {
  request('https://jsonplaceholder.typicode.com/users', (error, response, body) => {
    res.json(JSON.parse(body));
  });
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(8000, () => {
    console.log('listening on 8000');
});