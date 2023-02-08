const {Consumable, Solution} = require('../models/models')
const ApiError = require('../error/ApiError')


class UserController {

  async addConsume (req, res) {
    const {name, count} = req.body
    const consume =  await Consumable.create({name: name, count:count})
    return res.json(consume)
  }

  async addSolution (req, res, next) {
    try{
      const {percent_solution, pag_count, pg_count, perfume_count, liter, perfumeId} = req.body
      const solution = await Solution.create({
        percent_solution:percent_solution,
        pag_count:pag_count,
        pg_count:pg_count,
        perfume_count:perfume_count,
        liter:liter,
        perfumeId: perfumeId
      })
      return res.json(solution)
    }catch (e) {
      next(ApiError.badRequest(e.message))
    }

  }

  async addComplete (req, res) {

  }

  async addArchive (req, res) {
    res.json({message: 'You can add some archive'})
  }
}


module.exports = new UserController()