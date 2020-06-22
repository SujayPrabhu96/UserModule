const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize('user_module','root','',{
    host: 'localhost',
    dialect: 'mysql',
    // dialectModule: "mysql2",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
