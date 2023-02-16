const {Consumable, Solution, Stock, Perfume, FlavoringConsume, Archive} = require('../models/models')
const ApiError = require('../error/ApiError')


class UserController {

  async addConsume(req, res, next) {
    try {
      const {name, count} = req.body
      let consumables = await Consumable.findOne({where: {name}})
      consumables.count += parseInt(count, 10)
      await consumables.save()
      return res.json(consumables)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async addSolution(req, res, next) {
    try {
      const {percent_solution, liter, perfumes, consumables} = req.body
      for (let i = 0; i < perfumes.length; i++) {
        let perfume = await Perfume.findOne({where: {name: perfumes[i]['name']}})
        if (perfume.count < perfumes[i]['count']) {
          return (
            next(ApiError.badRequest('Не достаточно отдушки ' + perfume.name))
          )
        }
      }
      for (let i = 0; i < consumables.length; i++) {
        let chemistry = await Consumable.findOne({where: {name: consumables[i]['name']}})
        if (chemistry.count < consumables[i]['count']) {
          return (
            next(ApiError.badRequest('Не достаточно ' + chemistry.name))
          )
        }
      }
      for (let i = 0; i < perfumes.length; i++) {
        let perfume = await Perfume.findOne({where: {name: perfumes[i]['name']}})
        perfume.count -= parseInt(perfumes[i]['count'], 10)
        await perfume.save()
      }
      for (let i = 0; i < consumables.length; i++) {
        let chemistry = await Consumable.findOne({where: {name: consumables[i]['name']}})
        chemistry.count -= parseInt(consumables[i]['count'], 10)
        await chemistry.save()
      }
      const solution = await Solution.create({
        percent_solution: percent_solution,
        liter: liter,
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
      let flavoringConsume = await FlavoringConsume.findOne({where: {flavoringVendorCode: flavoringVendorCode}})
      if (typeFlavoringId === 1) {
        liter = count * 0.3
        for (let item in JSON.parse(flavoringConsume.consumables)){
          let consumable = await Consumable.findOne({where: {name: item}})
          if (consumable.count < count)
            return next(ApiError.badRequest('Не достаточно ' + consumable.name))
        }
        for (let item in JSON.parse(flavoringConsume.consumables)){
          let consumable = await Consumable.findOne({where: {name: item}})
          consumable.count -= count
          await consumable.save()
        }
      }
      if (typeFlavoringId === 2) {
        liter = count * 0.1
        for (let item in JSON.parse(flavoringConsume.consumables)){
          let consumable = await Consumable.findOne({where: {name: item}})
          if (consumable.count < count)
            return next(ApiError.badRequest('Не достаточно ' + consumable.name))
        }
        for (let item in JSON.parse(flavoringConsume.consumables)){
          let consumable = await Consumable.findOne({where: {name: item}})
          consumable.count -= count
          await consumable.save()
        }
      }
      let solution = await Solution.findOne({where: {id: solutionId}})
      if (solution.liter < liter) {
        return (
          next(ApiError.badRequest('Не достаточно раствора'))
        )
      }
      solution.liter -= liter
      await solution.save()

      const stock = await Stock.findOne({where: {flavoringVendorCode: flavoringVendorCode}})
      if(stock) {
        stock.count += count
        await stock.save()
        return res.json(stock)
      }
      const completeProduct = await Stock.create({
        count,
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
      let flavoringInStock = await Stock.findOne({where: {flavoringVendorCode:flavoringVendorCode}})
      const flavoringSend = await Archive.create({
        count:count,
        flavoringVendorCode:flavoringVendorCode,
        client:client,
        userId:userId
      })
      flavoringInStock.count -= count
      await flavoringInStock.save()
      return res.json(flavoringSend)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }
}


module.exports = new UserController()