const express = require('express')
const SaleOrderController = require('../controller/saleOrderController')

const saleOrderRouter = express.Router()

saleOrderRouter.post('/order',SaleOrderController.addSaleOrder)
saleOrderRouter.get('/order',SaleOrderController.getAllSaleOrdersWithDetails)
saleOrderRouter.get('/order/:id',SaleOrderController.getSaleOrderWithDetails)
saleOrderRouter.patch('/order/:id',SaleOrderController.editSaleOrder)


module.exports = saleOrderRouter