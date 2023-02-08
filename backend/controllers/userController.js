const {Consumable} = require('../models/models')
const ApiError = require('../error/ApiError')


class UserController {

  async addConsume (req, res) {
    const {name, count} = req.body
    const consume =  await Consumable.create({name: name, count:count})
    return res.json(consume)
  }

  async addSolution (req, res) {
    res.json({message: 'You can add some solution'})
  }

  async addComplete (req, res) {
    res.json({message: 'You can add some complete products'})
  }

  async addArchive (req, res) {
    res.json({message: 'You can add some archive'})
  }
}


module.exports = new UserController()