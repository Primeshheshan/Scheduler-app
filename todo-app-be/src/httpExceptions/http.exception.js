export function HttpException(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

HttpException.prototype = Object.create(Error.prototype);
