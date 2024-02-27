const mongoose = require('mongoose');

const saleOrderDetailsSchema = new mongoose.Schema({
  saleorder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SaleOrder',
    required: true
  },
  stock_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit_price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const SaleOrderDetails = mongoose.model('SaleOrderDetails', saleOrderDetailsSchema);

module.exports = SaleOrderDetails;
