const {Perfume, Role, TypeStock, TypeFlavoring} = require("../models/models");

class AdminController {
  async registrationUsers(req, res) {

  }

  async addRole(req, res) {
    const {name} = req.body
    const role = await Role.create({name: name})
    return res.json(role)
  }

  async addPerfume(req, res) {
    const {name, count} = req.body
    const perfume = await Perfume.create({
      name: name,
      count: count
    })
    return res.json(perfume)
  }

  async addTypeStock(req, res) {
    const {name} = req.body
    const typeStock = await TypeStock.create({name: name})
    return res.json(typeStock)
  }

  async addTypeFlavoring(req, res) {
    const {name} = req.body
    const typeFlavoring = await TypeFlavoring.create({name: name})
    return res.json(typeFlavoring)
  }


}

module.exports = new AdminController()