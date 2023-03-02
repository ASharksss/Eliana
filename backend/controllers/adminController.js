const ApiError = require("../error/ApiError");
const {
  Perfume,
  Role,
  TypeStock,
  TypeFlavoring,
  Flavoring,
  Consumable,
  User,
  FlavoringConsume,
  TypeConsumable
} = require("../models/models");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJWT = (id, username, roleId) => {
  return jwt.sign(
    {id, username, roleId},
    process.env.SECRET_KEY,
    {expiresIn: '72h'}
  )
}

class AdminController {

  async registrationUsers(req, res, next) {
    try {
      const {name, job_title, username, password_hash, roleId} = req.body
      if (!username || !password_hash) {
        return next(ApiError.badRequest('Не заполнены поля'))
      }
      const candidate = await User.findOne({where: [{username}]})
      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким username уже существует'))
      }
      const hashPassword = await bcrypt.hash(password_hash, 5)
      const user = await User.create({
        name,
        job_title,
        username,
        roleId,
        password_hash: hashPassword
      })
      const token = generateJWT(user.id, user.username, user.roleId)
      return res.json({token})
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }


  async addConsume(req, res, next) {
    try {
      const {name, typeConsumableId} = req.body
      const consume = await Consumable.create({name: name, typeConsumableId: typeConsumableId})
      return res.json(consume)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }

  }

  async addTypeConsumable(req, res, next) {
    try {
      const {name} = req.body
      const type = await TypeConsumable.create({name: name})
      return res.json(type)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }

  }

  async addFlavoringConsume(req, res, next) {
    try {
      const {consumables, typeFlavoringId, flavoringVendorCode} = req.body
      const flavoringConsume = await FlavoringConsume.create({
        consumables: JSON.stringify(consumables),
        typeFlavoringId: typeFlavoringId,
        flavoringVendorCode: flavoringVendorCode
      })
      return res.json(flavoringConsume)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }

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
    try {
      const {vendor_code, name, typeFlavoringId} = req.body
      const flavoring = await Flavoring.create({
        vendor_code: vendor_code,
        name: name,
        typeFlavoringId: typeFlavoringId
      })
      return res.json(flavoring)
    } catch (e) {
      return res.json(ApiError.badRequest(e.message))
    }
  }


}

module.exports = new AdminController()