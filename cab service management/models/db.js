const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize("csm", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});


module.exports.sequelize = sequelize;