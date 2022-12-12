const db = require('../models/customer');
const db2=require('../models/booking')
// const db3=require('../models/driver')
const db4=require('../models/cab')
const auth=require('../middlewares/authenticationMiddleware')
const {body, validationResult} = require('express-validator');
const path=require('path');
const { where } = require('sequelize');
const { log } = require('console');
const { sequelize } = require('../models/db');

module.exports.showBooking=(req,res,next)=> {

db2.findAll({where:{passenger_id:req.session.passenger_id,booking_status:'pending'}}).then(user=> {
    res.render('booking-index',{
        data:user
    })
})


}

module.exports.bookingDelete= (req,res,next)=> {

db2.destroy({

where: {booking_id: req.params.booking_id}

}
).then(user=>{
res.render('booking-index')
})
}

module.exports.home=function(req, res, next){
res.render('home')
}
module.exports.register=function(req, res, next){
res.render('register')
}
module.exports.booking=function(req, res, next){

res.render('booking')

}
module.exports.login=function(req, res, next){
res.render('login')
}
module.exports.registerPost = (req, res, next)=>{

   
                db.create({
                    first_name: req.body.firstname,
                    last_name: req.body.secondname,
                    email: req.body.email,
                    phone: req.body.phone,
                    passwrd: req.body.password,
                    role:req.body.role
                })
                .then((user)=>{
                    res.redirect('login')
               
            }).catch((err)=>{
                res.render('register',{message:"User already registered"})
            })
    }

module.exports.bookingPost = (req, res, next)=>{
    db2.create({
        pick_up: req.body.pickup,
        destination: req.body.destination,
        passenger_id:req.session.passenger_id,
        time: req.body.time,
        date:req.body.date,
        capacity:req.body.capacity
    })
    .then((user)=>{
        // res.json(user);
        res.redirect('/api/booking')
        console.log("ok")
    })
}

module.exports.userUpdate=function(req, res, next){
db.findByPk(req.session.passenger_id).then((data)=>{res.render('user-update',{data:data})})
    
    
    }

module.exports.userUpdatePost=(req,res,next)=> {
db.update({
        first_name: req.body.firstname,
        last_name: req.body.secondname,
        email: req.body.email,
        phone: req.body.phone,
        passwrd: req.body.password
},
        {
        where: {passenger_id: req.session.passenger_id},
    },{multi:true}
    ).then((user)=>{
        res.redirect('/api/booking')
    }).catch(next)
}
module.exports.bookingUpdatePost= (req, res, next)=>{
    db2.update({
        pick_up: req.body.pickup,
        destination: req.body.destination,
        time: req.body.time
},
{
    where: {booking_id:req.params.booking_id}
},
{multiple: true}
).then(user=>{res.redirect('booking-index')})
}

module.exports.bookingUpdate = async(req, res, next) => {
   

    db2.findByPk(req.params.booking_id)
        .then(booking => {
            res.render('booking-show', {
                data: booking
            });
        });
    
}

module.exports.loginPost= (req, res, next)=>{
   db.findOne({
        where: {email: req.body.email,passwrd:req.body.pwd}
    }).then((user)=>{
        if(user == null){
            return res.render('login', {message: 'Wrong email or password'})
        }
        req.session.passenger_id=user.passenger_id
        req.session.role=user.role
       if(user)
       {
           if(req.session.role=='Driver')
           {
            
            req.session.passenger_id = user.passenger_id
            
            db4.findAll({
                where: {driver_id:user.passenger_id}
            }).then(data =>{
                
                if(data.length==0)
                {
                    res.redirect("/api/cab/add")
                }
                else{
                    res.redirect('/api/driver/booking')
                }
            })
           }
           else if(req.session.role=='Passenger'){
            res.redirect("/api/booking")
       
           }
           else{
            res.redirect("/api/admin")
           }
       }
      

})
}


module.exports.logOut= (req, res, next)=>{
    req.session=null 
    res.redirect("/api/login")
}

 module.exports.payment=(req,res,next)=>{
        // db2.findAll({where:{
        //     booking_id:req.params.booking_id}}).then((data)=>{res.render('pay',{data:data})})
        sequelize.query('SELECT * FROM csm.bookings inner join csm.passengers on passengers.passenger_id=bookings.passenger_id and bookings.booking_id=?',{replacements:[req.params.booking_id]}).then(data => {data=data.pop();res.render('pay',{data:data})})
        
    }
    module.exports.paymentConfirm=(req,res,next)=> {
        db2.update({payment_status:'Confirm'},{where:{booking_id:req.params.booking_id}})
        .then(data=>{sequelize.query('SELECT * FROM csm.bookings inner join csm.passengers on passengers.passenger_id=bookings.passenger_id and bookings.booking_id=?',{replacements:[req.params.booking_id]}).then(data => {data=data.pop();res.render('download',{data:data})})})
    }

     module.exports.userDelete=(req,res,next)=> {
                        db.destroy({
                            where: {passenger_id: req.session.passenger_id}
                            })
                        .then(data => {
                            res.redirect('/api/home');
                        });
                        }

                        module.exports.confirmedUserBooking=(req,res,next)=> {
        sequelize.query('SELECT * FROM csm.bookings inner join csm.passengers on passengers.passenger_id=bookings.driver_id and bookings.passenger_id=?',
        {replacements:[req.session.passenger_id]}).then((data)=>{
           
           
            data = data.pop()
            res.render('confirmed-user-booking',{
                data:data
            })
        })
    }

////////////////////////////////////////////////////////////driver

module.exports.cost=(req,res,next)=> {
    res.render('cost')
}

module.exports.costPost=(req,res,next)=> {
    db2.update({
        cost: req.body.cost,
        driver_id:req.session.passenger_id,
        booking_status:'Confirmed'
},
{
    where: {booking_id:req.params.booking_id}
},{multi:true}
).then(user=>{res.redirect('/api/driver/booking')})
   
    }
   

module.exports.driverUpdate=(req,res,next)=> {
    db.findByPk(req.session.passenger_id)
    .then(booking => {
        res.render('driver-update', {
            data: booking
        });
    });
    }
    module.exports.driverUpdatePost=(req,res,next)=> {
        db.update({
            first_name: req.body.firstname,
            last_name: req.body.secondname,
            email:req.body.email,
            phone: req.body.phone,
            passwrd:req.body.password
    },
    {
        where: {passenger_id:req.session.passenger_id}
    },
    {multiple: true}
    ).then(user=>{res.redirect('/api/driver/booking')})
        }
    module.exports.cabAdd=(req,res,next)=> {
       res.render('cab')
        } 
        module.exports.cabAddPost=(req,res,next)=> {
            console.log(req.session.passenger_id)
            db4.create({
                
                cab_number:req.body.cabnumber,
                cab_capacity:req.body.cabcapacity,
                driver_id:req.session.passenger_id
            }).then(user=>{res.redirect('/api/driver/booking')})
             } 
             module.exports.cabUpdate=(req,res,next)=> {
                db4.findOne({where:{driver_id:req.session.passenger_id}}).then((data)=>{res.render('cab-update',{data:data})})
                
             }
 module.exports.cabUpdatePost=(req,res,next)=> {
    db4.update({
        cab_number: req.body.cabnumber,
        cab_capacity: req.body.cabcapacity,
       
},
{
    where: {driver_id:req.session.passenger_id}
},
{multiple: true}
).then(user=>{res.redirect('/api/driver/booking')})
                 } 
                //  module.exports.showBookingToDriver=(req,res,next)=> {

                //     db2.findAll({where:{booking_status:"pending"}}).then(user=> {
                //         res.render('driver-booking-index',{
                //             data:user
                //         })
                //     })
                    
                    
                //     }
                   
                   

                    
                
                
                
                
                
                
                 //  module.exports.cabDelete=(req,res,next)=> {
                //     db4.destroy({
                //         where: {cab_id: req.params.cab_id}
                //         })
                //     .then(booking => {
                //         res.redirect('/api/admin/driver');
                //     });
                //     }



   

    


// module.exports.driverAdd=function(req, res, next){
//     res.render('driver-add')
// }
// module.exports.driverAddPost=function(req, res, next){
//     db3.create({
//         first_name: req.body.firstname,
//         last_name: req.body.secondname,
//         email: req.body.email,
//         phone: req.body.phone,
//     })
//     .then((user)=>{
//         res.redirect('/api/admin/driver')
//     })
// }
// module.exports.driver=function(req, res, next){
//     {
    
//         if(req.session.role!='admin')
//         {
//             res.send('No access')
//         }
//         else{
//         db3.findAll().then(user=> {
//             res.render('driver-index',{
//                 data:user
//             })
//         })
//     }
    
// }

// }
// module.exports.driverPost = (req, res, next)=>{
//     db3.create({
//         first_name: req.body.firstname,
//         last_name: req.body.secondname,
//         email: req.body.email,
//         phone: req.body.phone,
//         passwrd: req.body.password
       
//     })                                         
//     .then((user)=>{
//         console.log("ok")
//     })
// }

// module.exports.cab=(req,res,next)=> {
//     db4.findAll({
//         where:{driver_id: req.params.driver_id}
//     }).then((user)=> {
//         res.render('show-cab',{
//             data:user
//         })
    
//     })


//     }
         



// module.exports.confirmedBooking=(req,res,next)=> {
//     db2.findAll({where:{
//         driver_id:req.session.passenger_id,
//         booking_status:'Confirmed'
        
//     }}).then(user=> {
//         console.log(user)
//         res.render('confirmed-booking',{
//             data:user
//         })
//     })
   
//     }
   

   


    module.exports.confirmedBooking=(req,res,next)=> {
        sequelize.query('SELECT * FROM csm.bookings inner join csm.passengers on passengers.passenger_id=bookings.passenger_id and bookings.driver_id=?',
        {replacements:[req.session.passenger_id]}).then((data)=>{
           
           
            data = data.pop()
            res.render('confirmed-booking',{
                data:data
            })
        })
    }
    
    module.exports.showBookingToDriver=(req,res,next)=> {
        sequelize.query('SELECT * FROM csm.bookings inner join csm.passengers on passengers.passenger_id=bookings.passenger_id and bookings.booking_status=?',
        {replacements:['pending']}).then((data)=>{
           
           
            data = data.pop()
            res.render('driver-booking-index',{
                data:data
            })
        })
    }
    ///////////////////////////////admin

    module.exports.admin=(req,res,next)=> {
        sequelize.query('SELECT * FROM csm.bookings inner join csm.passengers on passengers.passenger_id=bookings.driver_id'
        ).then((data)=>{
           
           
            data = data.pop()
            res.render('admin',{
                data:data
            })
        })
    }
    module.exports.adminShowDrivers=(req,res,next)=> {sequelize.query('SELECT * FROM csm.cabs inner join csm.passengers on passengers.passenger_id=cabs.driver_id').then(data=>{data=data.pop();console.log(data);console.log(data);res.render('admin-show-drivers',{data:data})})}
    module.exports.adminShowPassengers=(req,res,next)=> {db.findAll({where:{role:'Passenger'}}).then(data=>{res.render('admin-show-passengers',{data:data})})}
   


