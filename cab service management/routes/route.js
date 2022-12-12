const express = require('express');
const cc = require('../controllers/Controller');

const router = express.Router()
router.get('/home',cc.home)
router.get('/login',cc.login)
router.post('/login',cc.loginPost)
router.get('/register',cc.register)
router.post('/register', cc.registerPost)
router.post('/booking',cc.bookingPost)
router.get('/booking',cc.booking)
router.get('/user/update',cc.userUpdate)
router.post('/user/update',cc.userUpdatePost)
router.get('/booking/update/:booking_id',cc.bookingUpdate)
router.post('/booking/update/:booking_id',cc.bookingUpdatePost)
router.get('/booking/delete/:booking_id',cc.bookingDelete)
router.get('/user/booking',cc.showBooking)
router.get('/user/logout',cc.logOut)
router.get('/booking/payment/:booking_id',cc.payment)
router.post('/booking/payment/:booking_id',cc.paymentConfirm)
router.get('/user/booking/confirm',cc.confirmedUserBooking)



router.get('/driver/booking',cc.showBookingToDriver)
router.get('/driver/update',cc.driverUpdate)
router.post('/driver/update',cc.driverUpdatePost)
router.get('/cab/add',cc.cabAdd)
router.post('/cab/add',cc.cabAddPost)
router.get('/cab/update/',cc.cabUpdate)
router.post('/cab/update',cc.cabUpdatePost)
router.get('/driver/cost/:booking_id',cc.cost)
router.post('/driver/cost/:booking_id',cc.costPost)
router.get('/driver/booking/confirmed',cc.confirmedBooking)
router.get('/user/delete',cc.userDelete)


router.get('/admin',cc.admin)
router.get('/admin/show/drivers',cc.adminShowDrivers)
router.get('/admin/show/passengers',cc.adminShowPassengers)






module.exports = router;