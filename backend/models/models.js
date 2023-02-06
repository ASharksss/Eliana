const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Flavoring = sequelize.define('flavoring', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING}
})

const TypeFlavoring = sequelize.define('typeFlavoring', {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
  },
  name: {
    type: DataTypes.STRING, unique: true
  }
})

const Consumable = sequelize.define('consumable', {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
  },
  name: {
    type: DataTypes.STRING, unique: true
  }
})

const TypeConsumable = sequelize.define('typeConsumable', {
  id: {
    type: DataTypes.INTEGER, primaryKey: true
  },
  name: {
    type: DataTypes.STRING, unique: true
  }
})

const Perfume = sequelize.define('perfume', {
  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  name: {type: DataTypes.STRING}
})

const TypeStock = sequelize.define('tpeStock', {
  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  name: {type: DataTypes.STRING}
})

const Role = sequelize.define('role', {
  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  name: {type: DataTypes.STRING}
})

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {
    type: DataTypes.STRING
  },
  job_title: {
    type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING
  }
})

const Stock = sequelize.define('stock', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  count: {type: DataTypes.INTEGER}
})

const AromConsum = sequelize.define('aomConsum', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  count: {type: DataTypes.INTEGER}
})

const Solution = sequelize.define('solution', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  percent_solution: {
    type: DataTypes.INTEGER
  },
  pag_count: {
    type: DataTypes.INTEGER
  },
  pg_count: {
    type: DataTypes.INTEGER
  },
  solution_count: {
    type: DataTypes.INTEGER
  },
  liter: {
    type: DataTypes.INTEGER
  }
})

// Relationships

//Ароматизатор - Вид ароматизатора
Flavoring.hasMany(TypeFlavoring, {onDelete: 'cascade'})
TypeFlavoring.belongsTo(Flavoring)

//Склад - Вид склада
Stock.hasMany(TypeStock, {onDelete: 'cascade'})
TypeStock.belongsTo(Stock)

//Пользователь - Роль
User.hasMany(Role, {onDelete: 'cascade'})
Role.belongsTo(User)

//Расходник - Вид расходника
Consumable.hasMany(TypeConsumable, {onDelete: 'cascade'})
TypeConsumable.belongsTo(Consumable)

//Раствор - Отдушка
Solution.hasMany(Perfume, {onDelete: 'cascade'})
Perfume.belongsTo(Solution)

// Ароматизатор-Материалы --> Расходники, раствор, ароматизатор
AromConsum.hasMany(Consumable)
AromConsum.hasMany(Solution)
AromConsum.hasMany(Flavoring)

Flavoring.belongsTo(AromConsum)
Solution.belongsTo(AromConsum)
Consumable.belongsTo(AromConsum)

module.exports = {
  Solution,
  AromConsum,
  Stock,
  User,
  Role,
  TypeStock,
  Perfume,
  TypeConsumable,
  Consumable,
  TypeFlavoring,
  Flavoring
}