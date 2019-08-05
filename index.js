var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

// configuramos el nuevo motor de render handlebars
app.engine('handlebars', exphbs());
// le decimos que use handlebars
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  let context = {
    title: 'Home desde contexto',
    description: 'description desde contexto',
    menu: [
      {
        url: '/',
        title: 'Home',
        active: true,
      },
      {
        url: '/about',
        title: 'About',
        active: false,
      }
    ]
  };
  res.render('home', context);
});

app.get('/about', function (req, res) {
  let context = {
    title: 'About desde contexto',
    description: 'description desde contexto',
    menu: [
      {
        url: '/',
        title: 'Home',
        active: false,
      },
      {
        url: '/about',
        title: 'About',
        active: true,
      }
    ]
  };
  res.render('home', context);
});

app.get('/api/otro', (req, res) => {
    res.json([
        {name: 'Sebas'},
        {name: 'Andrés'},
        {name: 'Sofía'}
    ])
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});