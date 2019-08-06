var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var sendmail = require('sendmail')();

var { getMenu } = require('./utils');
var products = require('./products');
var todos = [];

var app = express();

app.use(express.static('public'));

// configuramos el nuevo motor de render handlebars
app.engine('handlebars', exphbs());
// le decimos que use handlebars
app.set('view engine', 'handlebars');

// configurar req.body
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  console.log(req.path);
  let context = {
    title: 'Home desde contexto',
    description: 'description desde contexto',
    menu: getMenu(req.path),
  };
  res.render('home', context);
});

app.get('/about', function (req, res) {
  let context = {
    title: 'About desde contexto',
    description: 'description desde contexto',
    menu: getMenu(req.path),
  };
  res.render('home', context);
});

app.get('/tienda', function (req, res) {
  let context = {
    products: products,
    menu: getMenu(req.path),
  };
  res.render('tienda', context);
});

app.get('/product/:id', (req, res) => {
  var context = products[req.params.id];
  context.menu = getMenu(req.path);
  res.render('product', context);
});

app.get('/contact', (req, res) => {
  let context = {
    menu: getMenu(req.path),
    sent: req.query.sent,
  };
  res.render('contact', context);
});

app.post('/contact', (req, res) => {
  console.log(req.body);
  let message = `
    Email: ${req.body.email}
    Mensaje: ${req.body.message}
    ---------
  `;
  fs.appendFile('./messages/mensaje.txt', message, () => {
    console.log('achivo guardado');
    res.redirect('/contact?sent=true');
  });

  sendmail({
      from: 'test@sgaviria.com',
      to: 'sebasgavig@gmail.com',
      subject: 'test sendmail',
      html: message,
    }, function(err, reply) {
      console.log(err && err.stack);
      console.dir(reply);
  });
});

app.get('/todo', (req, res) => {
  res.render('todo');
});

app.get('/api/task', (req, res) => {
  res.json({
    message: 'ok',
    todos: todos,
  });
});

app.post('/api/task', (req, res) => {
  var task = {
    text: req.body.text,
    checked: false,
  };
  todos.push(task);
  console.log(todos);
  res.json({
    message: 'ok',
  });
});

app.put('/api/task/:id', (req, res) => {
  console.log(req.body);
  todos[req.params.id] = {
    ...todos[req.params.id],
    ...req.body,
    checked: req.body.checked === 'true',
  };
  res.json({
    message: `task actualizada: ${req.params.id}`
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});