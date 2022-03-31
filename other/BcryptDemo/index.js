const express = require('express');
const app = express();
const port = 8080;
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/register', (req, res) => {
	res.render('register');
});

app.get('/secret', (req, res) => {
	res.send('secret');
});

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});
