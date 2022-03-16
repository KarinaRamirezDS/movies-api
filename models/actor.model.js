const { sequelize } = require('../util/database');

const Actor = sequelize.define('actor', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  profilePic: {
    type: DataTypes.STRING(55),
    allowNull: false
  },
  status: {
    // active | deleted
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'active'
  }

});

module.exports = { Actor };