const {Consumable, Solution, Stock, Perfume} = require('../models/models')
const ApiError = require('../error/ApiError')


class UserController {

  async addConsume (req, res) {
    const {name, count} = req.body
    const consume =  await Consumable.create({name: name, count:count})
    return res.json(consume)
  }

  async addSolution (req, res, next) {
    try{
      const {percent_solution, pag_count, pg_count, perfume_count, liter,
        perfumes
      } = req.body
      for(let i=0; i<perfumes.length; i++){
        let perfume = await Perfume.findOne({ where: {name: perfumes[i]['name']}})
        if (perfume.count < perfumes[i]['name']){
          next(ApiError.badRequest('Не достаточно отдушки ' + perfume.name))
        }
        perfume.count -= parseInt(perfumes[i]['count'], 10)
        await perfume.save()
      }
      const solution = await Solution.create({
        percent_solution:percent_solution,
        pag_count:pag_count,
        pg_count:pg_count,
        perfume_count:perfume_count,
        liter:liter,
        perfume: JSON.stringify(perfumes)
      })
      return res.json(solution)
    }catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }


  async addComplete (req, res, next) {
    try{
      const {count, flavoringVendorCode, solutionId} = req.body
      const completeProduct = await Stock.create({
        state: 'Готово',
        count: count,
        flavoringVendorCode: flavoringVendorCode,
        typeStockId: 1,
        solutionId: solutionId
      })
      return res.json(completeProduct)
    }catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async addArchive (req, res) {
    res.json({message: 'You can add some archive'})
  }
}


module.exports = new UserController()