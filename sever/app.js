var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()



// 设置允许跨域访问该服务.
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

// 创建 application/json 解析
var jsonParser = bodyParser.json()
    // 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))
app.use('/css/', express.static('./dist/css/'))
app.use('/js/', express.static('./dist/js/'))
app.use('/img/', express.static('./dist/img/'))


app.engine("html", require("express-art-template"));


app.use(router)


app.listen(3000, function() {
    console.log('running!');

})