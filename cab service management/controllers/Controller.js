const db = require('../models/customer');
const db2=require('../models/booking')
const db3=require('../models/driver')
const db4=require('../models/cab')
const db5=require('../models/admin')
const auth=require('../middlewares/authenticationMiddleware')
const {body, validationResult} = require('express-validator');
const path=require('path');
const { where } = require('sequelize');
const { log } = require('console');

module.exports.showBooking=(req,res,next)=> {

db2.findAll({where:{passenger_id:req.session.passenger_id}}).then(user=> {
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
        passwrd: req.body.password
    })
    .then((user)=>{
        res.redirect('login')
        
    })
}

module.exports.bookingPost = (req, res, next)=>{
    db2.create({
        pick_up: req.body.pickup,
        destination: req.body.destination,
        passenger_id:req.session.passenger_id,
        time: req.body.time,
    })
    .then((user)=>{
        // res.json(user);
        res.redirect('booking')
        console.log("ok")
    })
}

module.exports.userUpdate=function(req, res, next){

    res.render('user-update')
    
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

    console.log(req.body)
    try{
   db.findOne({
        where: {email: req.body.email,passwrd:req.body.pwd}
    }).then((user)=>{
        req.session.passenger_id=user.passenger_id
        req.session.role=user.role
        console.log(req.session.passenger_id)
        console.log(req.session.role)
     
       if(user){
           if(req.session.role=='admin')
           {
        
        req.session.passenger_id = user.passenger_id
        res.redirect("/api/admin/driver")
           }
           else{
            req.session.passenger_id = user.passenger_id
        res.render("booking")
           }
       }
       else{
         db5.findOne({
            where: {email: req.body.email,passwrd:req.body.pwd}
        }).then((user)=>{
            
                db3.findAll().then((user)=> {
                res.render('driver-index',{
                    data:user
                })
            
            })

        })
       }
    })
    .catch((err)=>{

       
        console.log("error")
    })}
    catch{
console.log("error")
    }
}


// module.exports.loginPost=(req, res, next)=>{
//     db.findAll({
//         where: {email: req.body.email,passwrd:req.body.pwd}
       
//     }).then((user)=>{
//         console.log(req.session.passenger_id)
//         if(user.passenger_id==1)
//         {
//             res.redirect("/api/admin/driver")
//         }
//         else{
//             res.render("booking")
//         }
//     })
// }


module.exports.logOut= (req, res, next)=>{
    req.session=null 
    res.redirect("/api/login")
}
////////////////////////////////////////////////////////////admin 

module.exports.driverUpdate=(req,res,next)=> {
    db3.findByPk(req.params.driver_id)
    .then(booking => {
        res.render('driver-update', {
            data: booking
        });
    });
    }
    module.exports.driverUpdatePost=(req,res,next)=> {
        db3.update({
            first_name: req.body.first_name,
            second_name: req.body.last_name,
            email:req.body.email,
            phone: req.body.phone
    },
    {
        where: {driver_id:req.params.driver_id}
    },
    {multiple: true}
    ).then(user=>{res.redirect('/api/admin/driver')})
        }


        module.exports.driverDelete=(req,res,next)=> {
    db3.destroy({
        where: {driver_id: req.params.driver_id}
        })
    .then(booking => {
        res.redirect('/api/admin/driver');
    });
    }

    


module.exports.driverAdd=function(req, res, next){
    res.render('driver-add')
}
module.exports.driverAddPost=function(req, res, next){
    db3.create({
        first_name: req.body.firstname,
        last_name: req.body.secondname,
        email: req.body.email,
        phone: req.body.phone,
    })
    .then((user)=>{
        res.redirect('/api/admin/driver')
    })
}
module.exports.driver=function(req, res, next){
    {
    
        if(req.session.role!='admin')
        {
            res.send('No access')
        }
        else{
        db3.findAll().then(user=> {
            res.render('driver-index',{
                data:user
            })
        })
    }
    
}

}
module.exports.driverPost = (req, res, next)=>{
    db3.create({
        first_name: req.body.firstname,
        last_name: req.body.secondname,
        email: req.body.email,
        phone: req.body.phone,
        passwrd: req.body.password
       
    })
    .then((user)=>{
        console.log("ok")
    })
}

module.exports.cab=(req,res,next)=> {
    db4.findAll({
        where:{driver_id: req.params.driver_id}
    }).then((user)=> {
        res.render('show-cab',{
            data:user
        })
    
    })


    }
    module.exports.cabAdd=(req,res,next)=> {
       res.render('cab')
        } 
        module.exports.cabAddPost=(req,res,next)=> {
            db4.create({
                cab_number:req.body.cabnumber,
                cab_capacity:req.body.cabcapacity,
                driver_id:req.params.driver_id
            }).then(user=>{res.redirect('/api/admin/driver')})
             } 
             module.exports.cabUpdate=(req,res,next)=> {
                res.render('cab-update')
             }
 module.exports.cabUpdatePost=(req,res,next)=> {
    db4.update({
        cab_number: req.body.cabnumber,
        cab_capacity: req.body.cabcapacity,
       
},
{
    where: {cab_id:req.params.cab_id}
},
{multiple: true}
).then(user=>{res.redirect('/api/admin/driver')})
                 } 
                 module.exports.cabDelete=(req,res,next)=> {
                    db4.destroy({
                        where: {cab_id: req.params.cab_id}
                        })
                    .then(booking => {
                        res.redirect('/api/admin/driver');
                    });
                    }
         





