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




router.post('/driver/register',cc.driverPost)
router.get('/driver/update/:driver_id',cc.driverUpdate)
router.post('/driver/update/:driver_id',cc.driverUpdatePost)
router.get('/driver/delete/:driver_id',cc.driverDelete)
router.get('/driver/add',cc.driverAdd)
router.post('/driver/add',cc.driverAddPost)
router.get('/admin/driver',cc.driver)
router.get('/cab/:driver_id',cc.cab)
router.get('/cab/add/:driver_id',cc.cabAdd)
router.post('/cab/add/:driver_id',cc.cabAddPost)
router.get('/cab/update/:cab_id',cc.cabUpdate)
router.post('/cab/update/:cab_id',cc.cabUpdatePost)
router.get('/cab/delete/:cab_id',cc.cabDelete)





module.exports = router;