class ApiError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequest extends ApiError {
  constructor(message = "BadRequest") {
    super(message);
    this.status = 400;
  }
}

class NotFound extends ApiError {
  constructor(message = "NotFound") {
    super(message);
    this.status = 404;
  }
}

class NotAuthenticated extends ApiError {
  constructor(message = "NotAuthenticated") {
    super(message);
    this.status = 401;
  }
}

class NotAuthorized extends ApiError {
  constructor(message = "NotAuthorized") {
    super(message);
    this.status = 403;
  }
}

module.exports = {
  ApiError,
  BadRequest,
  NotAuthenticated,
  NotAuthorized,
  NotFound,
};
