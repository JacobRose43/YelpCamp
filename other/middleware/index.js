import express from 'express';
import morgan from 'morgan';
const app = express();
const port = 8080;
import AppError from './AppError.js';

app.use(morgan('tiny'));

app.use((req, res, next) => {
	req.requestTime = Date.now();
	console.log(req.method, req.originalUrl, req.hostname);
	next();
});

const verifyPassword = (req, res, next) => {
	const { password } = req.query;
	if (password === 'password') {
		next();
	}
	throw new AppError();
};

app.get('/secret', verifyPassword, (req, res) => {
	res.send('Scooby-Doo');
});

app.get('/admin', (req, res) => {
	throw new AppError('You are not an Admin', undefined);
});

app.get('/', (req, res) => {
	res.send('homepage');
});

app.use((req, res) => {
	res.status(404).send('NOT FOUND');
});

app.use((err, req, res, next) => {
	const { status = 500, message = 'Something went wrong!' } = err;
	res.status(status).send(message);
});

app.listen(port, () => {
	console.log('listening on port ' + port);
});
