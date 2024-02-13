const express = require ('express')
const stockController = require('../controller/stockController')

const stockRouter = express.Router()

stockRouter.post('/addstock',stockController.addStock)

stockRouter.get('/stock/:id',stockController.getSingleStock)
stockRouter.get('/stock',stockController.getAllStock)

module.exports = stockRouter