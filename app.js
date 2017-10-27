var express = require('express');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.get('/api/data', (req, res) => {
  setTimeout(() => {
    res.json({
      username: 'joe@aol.com',
      id: 19343823,
      type: 'admin'
    });
  }, 5000);
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(8000, () => {
    console.log('listening on 8000');
});