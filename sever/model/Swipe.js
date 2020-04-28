var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema

var SwipeSchema = new Schema({
    img: {
        //分类
        type: String,
        required: true
    }



})
module.exports = mongoose.model('Swipe', SwipeSchema)