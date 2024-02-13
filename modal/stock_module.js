const mongoose = require ('mongoose')
const user_model = require('./user_model')

const StockSchema = new  mongoose.Schema({
    stockId:{
        type:String,
        required:true,
        unique:true,
    },
    stockName:{
        type:String,
        required:true,
        
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc:{
        type:String,

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user_model,
        
    }

})

module.exports = mongoose.model('Stock',StockSchema)