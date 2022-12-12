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
        payment_status: 'pending',
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
        payment_status: 'pending',
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

let fildata = JSON.parse(JSON.stringify(data))
fildata = fildata.map((i)=>{
    return i[0]
})
console.log(fildata)