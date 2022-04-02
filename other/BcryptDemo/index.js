const express = require('express');
const app = express();
const port = 8080;
const User = require('./models/user');
const mongoose = require('mongoose');
const db = mongoose.connection;
const bcrypt = require('bcrypt');
const saltRounds = 12;
const session = require('express-session');
const user = require('./models/user');

mongoose.connect('mongodb://localhost:27017/loginDemo');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'prettynicesecret', resave: true, saveUninitialized: true }));

const requireLogin = (req, res, next) => {
	if (!req.session.user_id) {
		return res.redirect('/login');
	} else {
		next();
	}
};

app.get('/', (req, res) => {
	res.send('Home page!');
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', async (req, res) => {
	const { password, username } = req.body;
	const user = new User({ username, password });
	await user.save();
	req.session.user_id = user._id;
	res.redirect('/');
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login', async (req, res) => {
	const { password, username } = req.body;
	const foundUser = await User.findAndValidate(username, password);
	if (foundUser) {
		req.session.user_id = user._id;
		res.send(`Welcome ${username}`);
	} else {
		res.send('Something went wrong. Please try again.');
	}
});

app.post('/logout', (req, res) => {
	req.session.user_id = null;
	res.redirect('/login');
});

app.get('/secret', requireLogin, (req, res) => {
	res.render('secret');
});

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});
