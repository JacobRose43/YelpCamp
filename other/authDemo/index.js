const bcrypt = require('bcrypt');

//option 1
const hashPassword = async (psswrd) => {
	const salt = await bcrypt.genSalt(12);
	const hash = await bcrypt.hash(psswrd, salt);
	console.log(hash);
};

// option 2
// bcrypt.hash(PlainTextPassword, saltRounds, () => {
//     //store password in db
// });

const login = async (psswrd, hashedPsswrd) => {
	const result = await bcrypt.compare(psswrd, hashedPsswrd);
	result ? console.log('Logged in!') : console.log('Wrong password');
};

// hashPassword('monkey');
login('monkey', '$2b$12$g5tl.7KTDzE3QGtFAauB8.dbN9u6LkC5gUxlJUOW9TDC4XjxzMSM.');
