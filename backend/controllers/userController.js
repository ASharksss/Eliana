const {Consumable, TypeConsumable} = require('../models/models')
const ApiError = require('../error/ApiError')


class UserController {

  async addConsume (req, res) {
    const {name, type_id} = req.body
    const consume =  await Consumable.create({name: name, typeConsumableId: type_id})
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