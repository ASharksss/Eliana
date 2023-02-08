class ApiError extends Error{
  constructor(status, message) {
    super();
    this.status = status
    this.message = message
  }

  //Страница не найдена
  static badRequest(message) {
    return new ApiError(404, message)
  }

  //Ошибка сервера
  static internalRequest(message) {
    return new ApiError(500, message)
  }

  //Нет доступа
  static forbidden(message) {
    return new ApiError(403, message)
  }
}