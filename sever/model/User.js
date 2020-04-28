var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema

var UserSchema = new Schema({
    name: {
        // 昵称
        type: String,
        required: true
    },
    avatar: {
        // 头像
        type: String,
        required: true,
        default: '/public/img/avatar.jpg'
    },
    password: {
        // 密码
        type: Array,
        required: true
    },
    tel: {
        // 手机号码
        type: String,
        required: true
    },
    addrs: {
        // 地址组
        type: Array,
    },
    cart: {
        // 购物车
        type: Array,
        required: true,
        default: [],
    },
    order: {
        // 订单
        type: Array,
        required: true,
        default: [],
    },
    bookcomments: {
        // 评论书本
        type: Array,
        default: [],
    },
})
module.exports = mongoose.model('User', UserSchema)