const {Sequelize, DataTypes} = require('sequelize')
const db = require('./db');

const Customer = db.sequelize.define('passenger',{
    passenger_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique:true
    },
    passwrd:{
type: DataTypes.STRING(50),
allowNull:false,
    },
    role:
    {
        type: DataTypes.STRING(50),
        defaultValue:'user'
    }
});


module.exports = Customer;

