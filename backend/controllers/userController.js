class UserController {
  async addConsumable (req, res) {
    res.json({message: 'You can add some consumable'})
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