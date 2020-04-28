var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema

var OrderSchema = new Schema({
    orderId: {
        //订单号
        type: String,
        required: true
    },
    userId: {
        //用户id
        type: String,
        required: true
    },
    addr: {
        // 收货地址
        type: Object,
        required: true
    },
    books: {
        //    要购买的书
        type: Array,
        required: true
    },
    state: {
        //    订单状态 0待付款 1待发货， 2待收货，3待评论 4已经评论
        type: String,
        required: true
    },
    total: {
        //    总价
        type: String,
        required: true
    },
    num: {
        //    总件数
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Order', OrderSchema)