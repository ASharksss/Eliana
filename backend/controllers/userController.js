const {
  Consumable,
  Solution,
  Stock,
  Perfume,
  FlavoringConsume,
  Archive,
  TypeFlavoring,
  Flavoring, User, TypeConsumable
} = require('../models/models')
const { Op } = require('sequelize')
const ApiError = require('../error/ApiError')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJWT = (id, username, roleId) => {
  return jwt.sign(
    {id, username, roleId},
    process.env.SECRET_KEY,
    {expiresIn: '144h'}
  )
}

const getUser = (token) => {
  return jwt.decode(token, process.env.SECRET_KEY)
}

class UserController {

  async login(req, res, next) {
    try {
      const {username, password} = req.body
      const user = await User.findOne({where: [{username}]})
      if (!user) {
        return next(ApiError.internalRequest('Пользователь не найден'))
      }
      let comparePassword = bcrypt.compareSync(password, user.password_hash)
      if (!comparePassword) {
        return next(ApiError.internalRequest('неверный пароль'))
      }
      const token = generateJWT(user.id, user.username, user.roleId)
      let date = new Date()
      return res.json({token: token, user: user, life: date.setDate(date.getDate() + 1)})
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async getUserByToken(req, res, next) {
    try {
      const {token} = req.body
      const _user = getUser(token)
      const user = await User.findOne({where: [{username: _user['username']}]})
      return res.json({user: user})
    } catch (e) {
      console.log(e)
      return next(ApiError.badRequest(e.message))

    }
  }

  async check(req, res, next) {
    try {
      const {token} = req.body
      const _user = getUser(token)
      const new_token = generateJWT(_user.id, _user.username, _user.roleId)
      return res.json({new_token})
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async addConsume(req, res, next) {
    try {
      const {name, count} = req.body
      let consumables = await Consumable.findOne({where: [{name: name}]})
      // Создания фитиля
      if (consumables.name === 'Фитиль') {
        let cloth = await Consumable.findOne({where: [{name: 'Ткань'}]})
        let wand = await Consumable.findOne({where: [{name: 'Фитильный каркас'}]})
        if (cloth.count < parseInt(count, 10)) {
          return next(ApiError.internalRequest('Недостаточно ткани'))
        } else if (wand.count < parseInt(count, 10)) {
          return next(ApiError.internalRequest('Недостаточно фитильного каркаса'))
        } else {
          cloth.count -= parseInt(count, 10)
          wand.count -= parseInt(count, 10)
          await cloth.save()
          await wand.save()
        }
      }
      consumables.count += parseInt(count, 10)
      await consumables.save()
      return res.json(consumables)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async addSolution(req, res, next) {
    try {
      const {percent_solution, aroma, liter, perfumes, consumables} = req.body
      for (let i = 0; i < perfumes.length; i++) {
        let perfume = await Perfume.findOne({where: [{name: perfumes[i]['name']}]})
        if (perfume.count < perfumes[i]['count']) {
          return (
            next(ApiError.badRequest('Не достаточно отдушки ' + perfume.name))
          )
        }
      }
      for (let i = 0; i < consumables.length; i++) {
        let chemistry = await Consumable.findOne({where: [{name: consumables[i]['name']}]})
        if (chemistry.count < consumables[i]['count']) {
          return (
            next(ApiError.badRequest('Не достаточно ' + chemistry.name))
          )
        }
      }
      for (let i = 0; i < perfumes.length; i++) {
        let perfume = await Perfume.findOne({where: [{name: perfumes[i]['name']}]})
        perfume.count -= parseInt(perfumes[i]['count'], 10)
        await perfume.save()
      }
      for (let i = 0; i < consumables.length; i++) {
        let chemistry = await Consumable.findOne({where: [{name: consumables[i]['name']}]})
        chemistry.count -= parseInt(consumables[i]['count'], 10)
        await chemistry.save()
      }
      const solution = await Solution.create({
        percent_solution: percent_solution,
        aroma: aroma,
        liter: parseFloat(liter).toFixed(2),
        consumable: JSON.stringify(consumables),
        perfume: JSON.stringify(perfumes)
      })
      return res.json(solution)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }


  async addComplete(req, res, next) {
    try {
      const {count, flavoringVendorCode, solutionId, typeFlavoringId} = req.body
      let liter
      let flavoringConsume = await FlavoringConsume.findOne({where: [{flavoringVendorCode: flavoringVendorCode}]})
      if (typeFlavoringId == 1) {
        liter = parseInt(count, 10) * 0.3
      }
      if (typeFlavoringId == 2) {
        liter = parseInt(count, 10) * 0.1
      }
      for (let item in JSON.parse(flavoringConsume.consumables)) {
        let consumable = await Consumable.findOne({where: [{name: item}]})
        if (consumable.count < parseInt(count, 10))
          return next(ApiError.badRequest('Не достаточно ' + consumable.name))
      }
      for (let item in JSON.parse(flavoringConsume.consumables)) {
        let consumable = await Consumable.findOne({where: [{name: item}]})
        consumable.count -= parseInt(count, 10)
        await consumable.save()
      }
      let solution = await Solution.findOne({where: [{id: solutionId}]})
      if (solution.liter < liter) {
        return (
          next(ApiError.badRequest('Не достаточно раствора'))
        )
      }
      solution.liter = solution.liter.toFixed(2) - liter.toFixed(2)
      await solution.save()

      const stock = await Stock.findOne({where: [{flavoringVendorCode: flavoringVendorCode}]})
      if (stock) {
        stock.count += parseInt(count, 10)
        await stock.save()
        return res.json(stock)
      }
      const completeProduct = await Stock.create({
          count: parseInt(count, 10),
        flavoringVendorCode,
        solutionId
      })
      return res.json(completeProduct)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async addArchive(req, res, next) {
    try {
      const {count, flavoringVendorCode, client, userId} = req.body
      let flavoringInStock = await Stock.findOne({where: [{flavoringVendorCode: flavoringVendorCode}]})
      const flavoringSend = await Archive.create({
        count: count,
        flavoringVendorCode: flavoringVendorCode,
        client: client,
        userId: userId
      })
      flavoringInStock.count -= count
      await flavoringInStock.save()
      return res.json(flavoringSend)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async getConsumables(req, res, next) {
    try {
      const names = await Consumable.findAll({
        where: [{typeConsumableId: 1}],
        order: [['name', 'ASC']]
      })
      return res.json(names)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async getConsumablesChemistry(req, res, next) {
    try {
      const names = await Consumable.findAll({
        where: [{typeConsumableId: 2}],
        order: [['name', 'ASC']]
      })
      return res.json(names)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async getConsumablesStickers(req, res, next) {
    try {
      const names = await Consumable.findAll({
        where: [{typeConsumableId: 3}],
        order: [['name', 'ASC']]
      })
      return res.json(names)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async getSolute(req, res) {
    const fullSolutions = await Solution.findAll({where: {liter: {[Op.gt]: 0}}})
    return res.json(fullSolutions)
  }

  async getCompleteProducts(req, res) {
    const fullCompleteProducts = await Stock.findAll({
      include: [
        {
          model: Flavoring,
          include: TypeFlavoring
        }
      ]
    })
    return res.json(fullCompleteProducts)
  }

  async getArchive(req, res) {
    const fullAllArchive = await Archive.findAll({
      include: [
        {
          model: Flavoring,
          include: TypeFlavoring
        },
        {
          model: User
        }
      ]
    })
    return res.json(fullAllArchive)
  }

  async getNamesConsumables(req, res, next) {
    try {
      const names = await Consumable.findAll({attributes: ['name'], include: [{model: TypeConsumable, attributes: ['name']}]})
      return res.json(names)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async getPerfumes(req, res, next) {
    try {
      const perfumes = await Perfume.findAll({
        attributes: ['name', 'count'],
        order: [['name', 'ASC']]
      })
      return res.json(perfumes)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }


  async getSelectsForComplete(req, res, next) {
    try {
      const typesFlavoring = await TypeFlavoring.findAll({attributes: ['id', 'name']})
      const flavorings = await Flavoring.findAll({
        attributes: ['name', 'vendor_code', 'typeFlavoringId'],
        include: TypeFlavoring
      })
      const solutions = await Solution.findAll({attributes: ['id', 'percent_solution', 'perfume', 'liter', 'aroma'], where: {liter: {[Op.gt]: 0}}})
      const flavoringConsume = await FlavoringConsume.findAll({attributes: ['consumables', 'flavoringVendorCode']})

      return res.json({
        typesFlavoring,
        flavorings,
        solutions,
        flavoringConsume
      })
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }
}


module.exports = new UserController()