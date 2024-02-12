const express = require('express')
const userController = require('../controller/userController')
const userRouter = express.Router()

userRouter.post('/adduser',userController.addUser)
userRouter.post('/login',userController.loginUser)

module.exports = userRouter