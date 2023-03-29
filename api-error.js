class ApiError {
	constructor(
		{ statusCode, message } = {
			statusCode: 500,
			message: 'Lỗi máy chủ',
		}
	) {
		this.statusCode = statusCode;
		this.message = message;
	}
}

module.exports = ApiError;
