class AuthController {
  async login(req, res) {
    res.json({message: 'login post'})
  }

  async check(req, res) {
    const id = req.query.id
    res.json(id)
  }
}

module.exports = new AuthController()