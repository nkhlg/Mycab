const express = require('express'); 


const app = express();  
const {engine} = require('express-handlebars');
const path = require('path');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
let data = [
    [
      {
        booking_id: 5,
        passenger_id: 15,
        pick_up: 'kym',
        destination: 'ern',
        time: '14:34',
        createdAt: "2022-12-05T08:58:03.000Z",
        updatedAt: "2022-12-05T08:58:03.000Z",
        driver_id: 3,
        cost: '1000',
        payment_status: 'Confirm',
        booking_status: 'Confirmed',
        first_name: 'nikhil',
        last_name: 'g',
        email: 'nik.gokul@gmail.com',
        phone: '8848505534',
        passwrd: '1234',
        role: 'Passenger'
      },
      {
        booking_id: 6,
        passenger_id: 15,
        pick_up: 'kott',
        destination: 'erna',
        time: '11:12',
        createdAt: "2022-12-05T08:58:03.000Z",
        updatedAt: "2022-12-05T08:58:03.000Z",
        driver_id: 3,
        cost: '500',
        payment_status: 'Confirm',
        booking_status: 'Confirmed',
        first_name: 'nikhil',
        last_name: 'g',
        email: 'nik.gokul@gmail.com',
        phone: '8848505534',
        passwrd: '1234',
        role: 'Passenger'
      }
    ],
    [
      {
        booking_id: 5,
        passenger_id: 15,
        pick_up: 'kym',
        destination: 'ern',
        time: '14:34',
        createdAt: "2022-12-05T08:58:03.000Z",
        updatedAt: "2022-12-05T08:58:03.000Z",
        driver_id: 3,
        cost: '1000',
        payment_status: 'Confirm',
        booking_status: 'Confirmed',
        first_name: 'nikhil',
        last_name: 'g',
        email: 'nik.gokul@gmail.com',
        phone: '8848505534',
        passwrd: '1234',
        role: 'Passenger'
      },
      {
        booking_id: 6,
        passenger_id: 15,
        pick_up: 'kott',
        destination: 'erna',
        time: '11:12',
        createdAt: "2022-12-05T08:58:03.000Z",
        updatedAt: "2022-12-05T08:58:03.000Z",
        driver_id: 3,
        cost: '500',
        payment_status: 'Confirm',
        booking_status: 'Confirmed',
        first_name: 'nikhil',
        last_name: 'g',
        email: 'nik.gokul@gmail.com',
        phone: '8848505534',
        passwrd: '1234',
        role: 'Passenger'
      }
    ]
  ]
data = data.pop()

console.log(data)
app.get("/", (req, res) => {
res.render('index',{data:data})
})
app.listen(80)