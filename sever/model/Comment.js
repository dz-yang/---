var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema

var CommentSchema = new Schema({
    bookId: {
        //图书的Id
        type: String,
        required: true
    },
    userAvatar: {
        //用户的头像
        type: String,
        required: true
    },
    userName: {
        // 用户名称
        type: String,
        required: true
    },
    grade: {
        // 评分
        type: String,
        required: true
    },
    gmsg: {
        // 评分信息
        type: String,
        required: true
    },
    comment: {
        // 评论内容
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Comment', CommentSchema)