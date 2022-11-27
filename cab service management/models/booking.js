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
    
    }
});


module.exports = Booking;

