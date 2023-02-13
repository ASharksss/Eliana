const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Flavoring = sequelize.define('flavoring', {
  vendor_code: {type: DataTypes.STRING, primaryKey: true},
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
  },
  count: {
    type: DataTypes.STRING, allowNull: false

  }
})

const Perfume = sequelize.define('perfume', {
  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  name: {type: DataTypes.STRING},
  count: {type: DataTypes.INTEGER}
})

const TypeStock = sequelize.define('typeStock', {
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
  state: {type: DataTypes.STRING},
  count: {type: DataTypes.INTEGER}
})

const AromConsum = sequelize.define('aromConsum', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  count: {type: DataTypes.INTEGER}
})

const Solution = sequelize.define('solution', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  percent_solution: {
    type: DataTypes.INTEGER
  },
  consumable: {
    type: DataTypes.STRING
  },
  liter: {
    type: DataTypes.FLOAT
  },
  perfume: {
    type: DataTypes.STRING
  }
})

// Relationships

//Ароматизатор - Вид ароматизатора
TypeFlavoring.hasMany(Flavoring, {onDelete: 'cascade'})
Flavoring.belongsTo(TypeFlavoring)

//Склад - Вид склада
TypeStock.hasMany(Stock, {onDelete: 'cascade'})
Stock.belongsTo(TypeStock)

Flavoring.hasMany(Stock, {onDelete: 'cascade'})
Stock.belongsTo(Flavoring)

Solution.hasMany(Stock, {onDelete: 'cascade'})
Stock.belongsTo(Solution)

//Пользователь - Роль
Role.hasMany(User, {onDelete: 'cascade'})
User.belongsTo(Role)




// Ароматизатор-Материалы --> Расходники, раствор, ароматизатор
Consumable.hasMany(AromConsum)
Solution.hasMany(AromConsum)
Flavoring.hasMany(AromConsum)

AromConsum.belongsTo(Flavoring)
AromConsum.belongsTo(Solution)
AromConsum.belongsTo(Consumable)


module.exports = {
  Solution,
  AromConsum,
  Stock,
  User,
  Role,
  TypeStock,
  Perfume,
  Consumable,
  TypeFlavoring,
  Flavoring
}