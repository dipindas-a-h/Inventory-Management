const mongoose = require('mongoose');

const saleOrderSchema = new mongoose.Schema({
  created_date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  saleorder_no: {
    type: String,
    unique: true
  },
  grand_total: {
    type: Number,
    required: true
  }
});

const SaleOrder = mongoose.model('SaleOrder', saleOrderSchema);

module.exports = SaleOrder;
