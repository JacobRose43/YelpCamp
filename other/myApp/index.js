const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const db = mongoose.connection;
const ejsMate = require('ejs-mate');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/nodeApp');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({ secret: 'blockofsecret', resave: true, saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login', async (req, res) => {
	const { password, username } = req.body;
	const foundUser = await User.findAndValidate(username, password);
	if (foundUser) {
		req.session.user_id = User._id;
		req.session.loggedin = true;
		res.send(`welcome ${username}`);
	} else {
		res.redirect('/login');
	}
});

app.get('/signup', (req, res) => {
	res.render('signup');
});

app.post('/signup', async (req, res) => {
	const { password, username } = req.body;
	const user = new User({ username, password });
	await user.save();
	req.session.user_id = User._id;
	res.redirect('/');
});

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});
