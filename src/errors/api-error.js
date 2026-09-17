class ApiError extends Error {
  constructor(statusCode, message, code = 'API_ERROR') {
    super(message);

    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(404, message, 'NOT_FOUND');
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(400, message, 'BAD_REQUEST');
  }
}

export default ApiError;