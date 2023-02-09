const {Perfume, Role, TypeStock, TypeFlavoring, Flavoring} = require("../models/models");
const ApiError = require("../error/ApiError");

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

  async addFlavoring(req, res) {
    try{
      const {vendor_code, name, typeFlavoringId} = req.body
      const flavoring = await Flavoring.create({
        vendor_code: vendor_code,
        name: name,
        typeFlavoringId: typeFlavoringId
      })
      return res.json(flavoring)
    }catch (e) {
      return res.json(ApiError.badRequest(e.message))
    }

  }


}

module.exports = new AdminController()