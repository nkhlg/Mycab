const {Sequelize, DataTypes} = require('sequelize');
// const { FOREIGNKEYS } = require('sequelize/types/query-types');
const db = require('./db');




const Booking = db.sequelize.define('booking',{
    booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    passenger_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete:"cascade",
        references:{
            model:"passengers",
            key:"passenger_id"
        }
    },
    driver_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete:"cascade",
        references:{
            model:"passengers",
            key:"passenger_id"
        }

    },

    pick_up: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    destination: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    time: {
        type: DataTypes.STRING(50),
        allowNull: false,
    
    },
    cost: {
        type: DataTypes.STRING(50),
        allowNull: true,
    
    },
    payment_status: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: 'pending'
    
    },
    booking_status: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: 'pending'
    
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull:false,
    },
    capacity:{
        type: DataTypes.STRING(10),
        allowNull:false
    }




});


module.exports = Booking;

