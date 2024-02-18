const express = require ('express')
const stockController = require('../controller/stockController')

const stockRouter = express.Router()

stockRouter.post('/addstock',stockController.addStock)
stockRouter.post('/addstocksingle',stockController.addSingleStock)

stockRouter.get('/stock/:id',stockController.getSingleStock)
stockRouter.get('/stock',stockController.getAllStock)
stockRouter.patch('/stock/:id',stockController.editStock)
stockRouter.delete('/stock/:id',stockController.deleteStock)

module.exports = stockRouter