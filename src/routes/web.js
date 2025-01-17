const express = require('express')
const router = express.Router()

//import controller
const HomeController = require('../controller/HomeController')

router.post('/update-user', HomeController.updateUserFromClient)
router.get('/delete-user/:id', HomeController.deleteUserFromClient)
router.post('/delete-user', HomeController.deleteUser)
router.get('/update/:id', HomeController.update)
router.get('/update', HomeController.updateUser)
router.get('/create-user', HomeController.createUser)
router.post('/create-user', HomeController.postCreateUser)
router.get('/', HomeController.home)

module.exports = router