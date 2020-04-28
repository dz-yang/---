var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema

var ArticleSchema = new Schema({
    title: {
        //标题
        type: String,
        required: true
    },
    img: {
        //图片
        type: String,
        required: true
    },
    article: {
        //文章
        type: String,
        required: true
    },
})
module.exports = mongoose.model('Article', ArticleSchema)