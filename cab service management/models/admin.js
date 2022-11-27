const {Sequelize, DataTypes} = require('sequelize');
// const { FOREIGNKEYS } = require('sequelize/types/query-types');
const db = require('./db');



const Admin = db.sequelize.define('admin',{
    admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING(50),
        allowNull: false
    },

    passwrd: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});


module.exports = Admin;

