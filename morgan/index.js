const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 8080;

app.use(morgan('tiny'));

app.use((req, res, next) => {
	req.requestTime = Date.now();
	console.log(req.method, req.originalUrl, req.hostname);
	next();
});

app.use((req, res) => {
	res.status(404).send('NOT FOUND');
});

app.get('/', (req, res) => {
	res.send('homepage');
});

app.listen(port, () => {
	console.log('listening on port ' + port);
});
