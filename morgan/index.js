const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 8080;

app.use(morgan('tiny'));

app.get('/', (req, res) => {
	res.send('homepage');
});

app.listen(port, () => {
	console.log('listening on port ' + port);
});
