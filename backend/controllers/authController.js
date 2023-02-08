const ApiError = require('../error/ApiError')

class AuthController {
  async login(req, res) {
    res.json({message: 'login post'})
  }

  async check(req, res, next) {
    const id = req.query.id
    if(!id){
      return next(ApiError.badRequest('Не задан id '))
    }
    res.json(id)
  }
}

module.exports = new AuthController()