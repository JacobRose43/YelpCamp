const express = require('express');

const app = express();
const port = 8080;
const path = require('path');
const mongoose = require('mongoose');
const db = mongoose.connection;
const ejsMate = require('ejs-mate');

mongoose.connect('mongodb://localhost:27017/nodeApp');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});
