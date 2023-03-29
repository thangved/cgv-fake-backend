const jsonwebtoken = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwt = {
	encode(doc) {
		return jsonwebtoken.sign(doc, secret);
	},
	decode(token) {
		return jsonwebtoken.decode(token, secret);
	},
};

module.exports = jwt;
