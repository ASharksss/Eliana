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
    type: DataTypes.INTEGER, defaultValue: 0, allowNull: false

  }
})

const Perfume = sequelize.define('perfume', {
  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  name: {type: DataTypes.STRING},
  count: {type: DataTypes.INTEGER}
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

const TypeConsumable = sequelize.define('typeConsumable', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING}
})


const Archive = sequelize.define('archive', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  count: {type: DataTypes.INTEGER},
  client: {type: DataTypes.STRING}
})

const Solution = sequelize.define('solution', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  percent_solution: {
    type: DataTypes.INTEGER
  },
  aroma: {
    type: DataTypes.STRING
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

const FlavoringConsume = sequelize.define('flavoringConsume', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  consumables: {
    type: DataTypes.STRING
  }
})
// Relationships

Flavoring.hasMany(FlavoringConsume, {onDelete: 'cascade'})
FlavoringConsume.belongsTo(Flavoring)

TypeFlavoring.hasMany(FlavoringConsume, {onDelete: 'cascade'})
FlavoringConsume.belongsTo(TypeFlavoring)

//Ароматизатор - Вид ароматизатора
TypeFlavoring.hasMany(Flavoring, {onDelete: 'cascade'})
Flavoring.belongsTo(TypeFlavoring)

TypeConsumable.hasMany(Consumable, {onDelete: 'cascade'})
Consumable.belongsTo(TypeConsumable)

Flavoring.hasMany(Stock, {onDelete: 'cascade'})
Stock.belongsTo(Flavoring)

Flavoring.hasMany(Archive, {onDelete: 'cascade'})
Archive.belongsTo(Flavoring)

User.hasMany(Archive, {onDelete: 'cascade'})
Archive.belongsTo(User)

// Раствор - склад
Solution.hasMany(Stock, {onDelete: 'cascade'})
Stock.belongsTo(Solution)

//Пользователь - Роль
Role.hasMany(User, {onDelete: 'cascade'})
User.belongsTo(Role)


module.exports = {
  Solution,
  FlavoringConsume,
  Stock,
  TypeConsumable,
  User,
  Role,
  Perfume,
  Consumable,
  TypeFlavoring,
  Flavoring,
  Archive
}