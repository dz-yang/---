var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema

var BookSchema = new Schema({
    category: {
        //分类
        type: String,
        required: true
    },
    name: {
        //书名
        type: String,
        required: true
    },
    imgs: {
        // 图片
        type: Array,
        required: true
    },
    old_price: {
        // 原价
        type: String,
        required: true
    },
    new_price: {
        // 现价
        type: String,
        required: true
    },
    author: {
        // 作者
        type: String,
        required: true
    },
    time: {
        // 出版时间
        type: String,
        required: true
    },
    title: {
        // 标题
        type: String,
        required: true
    },
    num: {
        // 库存
        type: String,
        required: true
    },
    comments: {
        // 用户评论
        type: Array,
        default: null
    }



})
module.exports = mongoose.model('Book', BookSchema)