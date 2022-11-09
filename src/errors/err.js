module.exports.ProductServiceError = class ProductServiceError extends Error {
	constructor({ message, status, statusCode, data }) {
		super(message);
		this.name = 'ProductServiceError';
		this.data = data;
		this.status = status;
		this.statusCode = statusCode;
	}

	toJson() {
		return {
			statusCode: this.statusCode,
			status: this.status,
			message: this.message,
		};
	}
};

class ResponseFormatter {
	ResponseWithStatusCode = (statusCode) => {
		return statusCode;
	};

	ResponseWithStatusCodeAndMessage = (statusCode, status, data, message) => {
		return {
			message,
			statusCode,
		};
	};

	ResponseWithCodeMessageAndStatus = (statusCode, status, message, data) => {
		return {
			message,
			statusCode,
			status,
		};
	};

	ResponseWithData = (statusCode, status, message, data) => {
		return {
			message,
			statusCode,
			status,
			data,
		};
	};
}

module.exports = {
	ResponseFormatter: new ResponseFormatter(),
};
