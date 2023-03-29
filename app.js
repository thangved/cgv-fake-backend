const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();

app.use(cors({ origin: '*' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);

// 404 - Not found
app.use((req, res, next) => {
	res.status(404).send({ message: 'Không tìm thấy tài nguyên' });
	next();
});

// 500 - Server error
/**
 * @type {import('express').ErrorRequestHandler}
 */
app.use((error, req, res, next) => {
	res.status(error.statusCode).send({ message: error.message });
	next();
});

module.exports = app;
