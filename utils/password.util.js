const { hash, verify } = require('argon2');

const password = {
	hash,
	verify,
};

module.exports = password;
