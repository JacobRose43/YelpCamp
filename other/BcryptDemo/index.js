const express = require('express');
const app = express();
const port = 8080;
const User = require('./models/user');
const mongoose = require('mongoose');
const db = mongoose.connection;
const bcrypt = require('bcrypt');
const saltRounds = 12;

mongoose.connect('mongodb://localhost:27017/loginDemo');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Home page!');
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', async (req, res) => {
	const { password, username } = req.body;
	const hash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		password: hash,
	});
	await user.save();
	res.redirect('/');
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login', async (req, res) => {
	const { password, username } = req.body;
	const user = await User.findOne({ username: username });
	const validPassword = await bcrypt.compare(password, user.password);
	if (validPassword) {
		res.send(`Welcome ${username}`);
	} else {
		res.send('Something went wrong. Please try again.');
	}
});

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});
