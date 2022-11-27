const Customer = require('./customer')
const Booking=require('./booking');
const Driver = require('./driver');
const Cab = require('./cab');
const Admin = require('./admin');

Customer.sync({alter: true});
// Booking.sync({alter:true})
// Driver.sync({alter:true})
// Cab.sync({alter:true})
// Driver.sync({alter:true})