var fs = require('fs')
var Book = require('./model/book')
var User = require('./model/user')
var Swipe = require('./model/swipe')
var Order = require('./model/order')
var Comment = require('./model/comment')
var Article = require('./model/article')
var express = require('express')
var md5 = require('md5-node');
var router = express.Router()
var url = require('url')



router.get('/', function(req, res) {

        res.render('index.html')
    })
    /**
     * 渲染图书列表
     */
router.get('/books', function(req, res) {
    var data = req.query
        //返回书榜前6条数据limit(10)
    if (data.flag == '1') {
        Book.find({ category: data.category }).limit(parseInt(data.limit))
            .then(ret => {
                res.json(ret)
            })
    }

    //返回对应的书榜数据
    if (data.flag == '2') {
        Book.find({ category: data.category })
            .then(ret => {
                res.json(ret)
            })
    }

    //返回搜索结果 
    if (data.flag == '3') {



        Book.find({ name: new RegExp(data.value) })
            .then(ret => {
                if (ret) {
                    res.json(ret)
                }
            })
    }

    //根据id返回该id书籍
    if (data.flag == '4') {


        Book.findOne({ _id: data._id })
            .then(ret => {
                if (ret) {
                    res.json(ret)
                    console.log(ret);
                }
            })
    }

    // 当用户购买时，修改该图书库存
    if (data.flag == '5') {
        //当用提交订单时
        var num
        Book.findOne({ _id: data._id })
            .then(ret => {
                if (ret) {
                    if (data.opt == 'yes') {
                        num = parseInt(ret.num) - parseInt(data.num)
                    } else if (data.opt == 'no') {
                        num = parseInt(ret.num) + parseInt(data.num)
                    }
                    return Book.updateOne({ _id: data._id }, { num: num })
                }
            })

    }
    // console.log(req.query);

})

router.get('/swipes', function(req, res) {
    Swipe.find({})
        .then(ret => {
            res.json(ret)
        })
})

router.get('/user', function(req, res) {
    var data = req.query

    // data.flag =1 注册
    if (data.flag == '1') {

        data.addr = JSON.parse(data.addr)

        var obj = {
            name: data.name,
            password: md5(data.password), //加密
            tel: data.tel,
            addrs: [data.addr],
        }
        User.findOne({ name: obj.name })
            .then(ret => {
                if (ret) {
                    res.status(200).json({
                        code_error: 1,
                        message: '用户昵称已存在。'
                    })
                    return 0
                } else {
                    return new User(obj).save()

                }
            })
            .then(ret => {
                if (ret == '0') {
                    return 0
                } else {
                    if (ret) {
                        res.status(200).json({
                            code_error: 0,
                            message: '你注册的用户账号为：' + ret._id,
                            _id: ret._id

                        })
                    } else {
                        res.status(500).json({
                            code_error: 1,
                            message: '服务器错误！'
                        })
                    }
                }
            })
    }

    //data.flag =2 登录
    if (data.flag == '2') {
        var obj = {
            name: data.name,
            password: md5(data.password)
        }
        User.findOne(obj)
            .then(ret => {
                if (ret) {
                    res.status(200).json({
                        code_error: 0,
                        user: ret,
                        message: '登录成功'
                    })
                } else {
                    res.status(200).json({
                        code_error: 1,
                        message: '密码或昵称不正确！'
                    })
                }
            })
    }

    //data.flag = 3 添加地址
    if (data.flag == '3') {
        var addrs = null
        var addr = {
            name: data.name,
            tel: data.tel,
            addr: data.addr,
            flag: false
        }
        User.findOne({ _id: data._id })
            .then(ret => {
                if (ret) {
                    addrs = ret.addrs
                        // addrs = JSON.parse(addrs)
                    addrs.push(addr)
                    return User.updateOne({ _id: data._id }, { addrs: addrs })
                } else {
                    return 0
                }

            })
            .then(ret => {
                if (ret == '0') {
                    return 0
                } else if (ret) {
                    if (ret.n == 1) {
                        return User.findOne({ _id: data._id })
                    } else {
                        return 0
                    }
                } else {
                    return 0
                }
            })
            .then(ret => {
                if (ret) {
                    res.status(200).json({
                        code_error: 0,
                        message: '添加成功',
                        user: ret
                    })
                } else {
                    res.status(500).json({
                        code_error: 1,
                        message: '服务器错误'
                    })
                }
            })
    }

    //data.flag = 4 修改默认地址
    if (data.flag == '4') {
        User.findOne({ _id: data._id })
            .then(ret => {
                if (ret) {
                    var addrs = ret.addrs
                    addrs[data.oldi].flag = false
                    addrs[data.newi].flag = true
                    return User.updateOne({ _id: data._id }, { addrs: addrs })
                } else {
                    return 0
                }
            })
            .then(ret => {

                if (ret.n == 1) {
                    return User.findOne({ _id: data._id })
                }
                return 0
            })
            .then(ret => {
                if (ret) {
                    res.status(200).json({
                        code_error: 0,
                        message: '修改成功',
                        user: ret
                    })
                } else {
                    res.status(500).json({
                        code_error: 1,
                        message: '服务器错误'
                    })
                }
            })
    }

    //data.flag = 5 删除地址
    if (data.flag == "5") {
        User.findOne({ _id: data._id })
            .then(ret => {
                if (ret) {
                    var addrs = ret.addrs
                    addrs.splice(data.i, 1)
                    return User.updateOne({ _id: data._id }, { addrs: addrs })
                } else {
                    return 0
                }
            })
            .then(ret => {
                if (ret.n == 1) {
                    return User.findOne({ _id: data._id })
                }
                return 0
            })
            .then(ret => {
                if (ret) {
                    res.status(200).json({
                        code_error: 0,
                        message: '删除成功',
                        user: ret
                    })
                } else {
                    res.status(500).json({
                        code_error: 1,
                        message: '服务器错误'
                    })
                }
            })
    }

    //data.flag = 6 修改地址
    if (data.flag == '6') {


        User.findOne({ _id: data._id })
            .then(ret => {
                if (ret) {
                    var addrs = ret.addrs
                    addrs[data.i] = {
                        name: data.name,
                        tel: data.tel,
                        addr: data.addr,
                        flag: data.flag1
                    }
                    return User.updateOne({ _id: data._id }, { addrs: addrs })
                } else {
                    return 0
                }
            })
            .then(ret => {

                if (ret.n == 1) {
                    return User.findOne({ _id: data._id })
                } else {
                    return 0
                }
            })
            .then(ret => {
                if (ret) {
                    res.status(200).json({
                        code_error: 0,
                        message: '修改成功',
                        user: ret
                    })
                } else {
                    res.status(500).json({
                        code_error: 1,
                        message: '服务器错误'
                    })
                }
            })
    }

    //data.flag = 7 添加购物车

    if (data.flag == '7') {
        data.cart = JSON.parse(data.cart)
        User.findOne({ _id: data._id })
            .then(ret => { //找到该用户
                if (!ret.cart) { //购物车为空时

                    ret.cart.unshift(data.cart)
                } else {
                    var cart = ret.cart.find(item => {

                        return item.bookId == data.cart.bookId
                    })
                    if (!cart) { //没有在购物车
                        // ret.cart = []
                        ret.cart.unshift(data.cart)
                    } else {
                        cart.num = parseInt(cart.num) + parseInt(data.cart.num)
                    }
                }
                return User.updateOne({ _id: data._id }, { cart: ret.cart }) //更新购物车
            })
            .then(ret => {
                if (ret.n) {
                    return User.findOne({ _id: data._id })

                } else {
                    return 0

                }
            })
            .then(ret => {
                if (ret) {
                    res.status(200).json({
                        code_error: 0,
                        message: '添加成功',
                        user: ret
                    })
                } else {
                    res.status(500).json({
                        code_error: 1,
                        message: '服务器错误'
                    })
                }
            })
    }

    //data.flag = 8 修改购物车
    if (data.flag == '8') {


        console.log(data.cart);
        data.cart = JSON.parse(data.cart)


        User.findOne({ _id: data._id })
            .then(ret => {
                if (ret) {
                    return User.updateOne({ _id: data._id }, { cart: data.cart })
                }
            })
            .then(ret => {
                if (ret.n == '1') {
                    return User.findOne({ _id: data._id })
                }
            })
            .then(ret => {
                if (ret) {
                    res.status(200).json({
                        code_error: 0,
                        message: '修改成功',
                        user: ret
                    })
                } else {
                    res.status(500).json({
                        code_error: 1,
                        message: '服务器错误'
                    })
                }
            })
    }

    //data.flag = 8 

})

router.get('/order', function(req, res) {

    // 当flag不存在时，提交订单
    if (!req.query.flag) {


        // req.query.books = req.query.books.replace(/\'/g, "");
        console.log(req.query.books);
        req.query.books.forEach((item, index) => {
            req.query.books[index] = JSON.parse(item)
        })
        console.log(req.query.books);
        req.query.addr = JSON.parse(req.query.addr)
        new Order(req.query).save()
            .then(ret => {
                console.log(ret);
            })
    }


    //查找订单  flag = 1 根据state 返回对应的订单
    if (req.query.flag == '1') {


        if (req.query.state == '-1') {
            // 当状态为-1 返回所有订单
            Order.find({ userId: req.query.userId })
                .then(ret => {
                    res.status(200).json(ret)

                })
        } else {
            // 根据state 返回对应的订单
            Order.find({ state: req.query.state, userId: req.query.userId })
                .then(ret => {
                    res.status(200).json(ret)

                })
        }

    }

    //取消订单， flag = 2 orderId 删除订单
    if (req.query.flag == '2') {
        Order.deleteOne({ orderId: req.query.orderId })
            .then(ret => {
                console.log(ret);

            })
    }

    //修改订单状态
    if (req.query.flag == '3') {
        Order.updateOne({ orderId: req.query.orderId }, { state: req.query.state })
            .then(ret => {
                console.log(ret);

            })
    }

    //根据订单号返回对应的订单
    if (req.query.flag == '4') {
        Order.findOne({ orderId: req.query.orderId })
            .then(ret => {
                res.status(200).json(ret)
            })
    }

})

router.get('/comment', function(req, res) {
    data = req.query

    //当flag =1 提交评论
    if (data.flag == '1') {
        data.comment = JSON.parse(data.comment)
        new Comment(data.comment).save()
    }
    // 当flag  = 2 返回某书的评论
    if (data.flag == '2') {
        Comment.find({ bookId: data.bookId }).then(ret => {
            if (ret) {
                res.status(200).json(ret)
            }
        })

    }
})

router.get('/article', function(req, res) {

        var data = req.query
            // 返回所有的文章
        if (data.flag == '1') {
            Article.find()
                .then(ret => {

                    res.status(200).json(ret)
                })
        }
        //根据id 返回对应的文章
        if (data.flag == '2') {
            Article.find({ _id: data.id })
                .then(ret => {

                    res.status(200).json(ret)
                })
        }
    })
    // router.get('/new', function(req, res) {
    //     var arr = [{

//             "title": "读书的人生很甜美",
//             "img": "/public/img/article/a1.jpg",
//             "article": "<p>有人认为：群书为山，登山能高瞻远瞩；群书为海，搏海能锻体炼魄；群书为矿，采矿能聚富集财。笔者读书几十载，切身的体会是：只要你深深爱她，书是诚挚的朋友，能与你结缘；书是智慧的世界，能把你的人生之路展现。</p><p>随着年龄的增加，笔者“夕阳无限好，只是近黄昏”的感觉格外浓烈，下一步嘛就是候着到另一个世界去生活啰。犹如专业运动员，退役后只能在如火如荼的正式竞技比赛场外望洋兴叹，难免有些许惆怅之憾。某天外出办事后顺路到一个朋友家玩，见其新买了一本海伦·凯勒写的书《假如给我三天光明》。朋友说自己年老体弱，这段时间情绪欠佳，昨天闲逛书店，一个中年男营业员问需要买啥书？他咕咙道想买本振奋精神的书看看。中年男营业员热情地介绍了这本书。买来还没开始阅读。边嗅着书独有的香气边信手翻看，感觉有些意思。因为属铁哥们，就不讲规矩啦，赖着先借来看看。海伦·凯勒一岁多时因病造成盲聋哑，使其变得性情乘张桀骜不驯。在老师多年的耐心帮助下，她从七岁开始自强不息，经过艰辛的努力，学会了口语和写作，成为了著名的作家、教育家、慈善家、社会活动家，享年88岁，被美国《时代周刊》评为美国十大英雄偶像之一，荣获“总统自由勋章”等奖项。后来把借的还了，干脆自买了一本，又重新看了好几遍，每看一遍都心如潮涌，又四处寻觅她另外的著作阅读。</p>"
//         },
//         {

//             "title": "读书的境界",
//             "img": "/public/img/article/a2.jpg",
//             "article": "<p'>随着年龄的增加，笔者“夕阳无限好，只是近黄昏”的感觉格外浓烈，下一步嘛就是候着到另一个世界去生活啰。犹如专业运动员，退役后只能在如火如荼的正式竞技比赛场外望洋兴叹，难免有些许惆怅之憾。某天外出办事后顺路到一个朋友家玩，见其新买了一本海伦·凯勒写的书《假如给我三天光明》。朋友说自己年老体弱，这段时间情绪欠佳，昨天闲逛书店，一个中年男营业员问需要买啥书？他咕咙道想买本振奋精神的书看看。中年男营业员热情地介绍了这本书。买来还没开始阅读。边嗅着书独有的香气边信手翻看，感觉有些意思。因为属铁哥们，就不讲规矩啦，赖着先借来看看。海伦·凯勒一岁多时因病造成盲聋哑，使其变得性情乘张桀骜不驯。在老师多年的耐心帮助下，她从七岁开始自强不息，经过艰辛的努力，学会了口语和写作，成为了著名的作家、教育家、慈善家、社会活动家，享年88岁，被美国《时代周刊》评为美国十大英雄偶像之一，荣获“总统自由勋章”等奖项。后来把借的还了，干脆自买了一本，又重新看了好几遍，每看一遍都心如潮涌，又四处寻觅她另外的著作阅读。读罢她写的好几本书，情不自禁地写下了有四十行长的诗“海伦·凯勒印象”。</p>"
//         },

//         {

//             "title": "享受读书的乐趣 ",
//             "img": "/public/img/article/a3.jpg",
//             "article": "<p>从孩提时代起，书就成为我的玩伴，每一天陪着我遨游在知识的海洋里。童年时代的我，因为需要上学，所以书便每一天跟随我奔波于学校和家之间。现如今，我已迈入中学的大门，走出天真烂漫的童话时代，一篇篇生动优美、清新质朴的美文如磁铁般吸引了我，看着它们，我领略了别人不一样的生活，足不出户却可纵观世界。读书给我带来了无尽的欢乐，更重要的是它教会了我如何热爱他人、热爱生命！书中的大千世界令人神往，它令我充满对未来的憧憬，助我鼓起挑战未来的勇气，我自信地向自己喊到：向前冲！</p> <p>中学时代，《钢铁是怎样炼成的》《巴金选集》《上下五千年》闯进了我的生活，阅历的进一步扩大，让我学会了思考。读一本好书就如在同一个高贵的人谈话，一本本好书给我的心灵上了一堂堂非同寻常的课。对生活的赞美，对生命的热爱。对人生的感悟，让我真切地意识到，只有不断拼搏、不断奋斗的人生才最有价值。富国强民的神圣使命需要我们去完成，不容变更的人生目标让我感到每一天都很充实，而这一切都是读书带给我的。读书点燃我心中的激情，插上我青春的翅膀，推动我向未来奋飞。</p><p>我爱读书，因为读书能够扩大我的视野，让我的写作水平得到进一步提高；我爱读书，因为我喜欢书中那些优美的文章段落，它能够陶冶情操，让我的情绪愉快。</p>"
//         },
//         {

//             "title": "读书的人生很甜美",
//             "img": "/public/img/article/a1.jpg",
//             "article": "<p>有人认为：群书为山，登山能高瞻远瞩；群书为海，搏海能锻体炼魄；群书为矿，采矿能聚富集财。笔者读书几十载，切身的体会是：只要你深深爱她，书是诚挚的朋友，能与你结缘；书是智慧的世界，能把你的人生之路展现。</p><p>随着年龄的增加，笔者“夕阳无限好，只是近黄昏”的感觉格外浓烈，下一步嘛就是候着到另一个世界去生活啰。犹如专业运动员，退役后只能在如火如荼的正式竞技比赛场外望洋兴叹，难免有些许惆怅之憾。某天外出办事后顺路到一个朋友家玩，见其新买了一本海伦·凯勒写的书《假如给我三天光明》。朋友说自己年老体弱，这段时间情绪欠佳，昨天闲逛书店，一个中年男营业员问需要买啥书？他咕咙道想买本振奋精神的书看看。中年男营业员热情地介绍了这本书。买来还没开始阅读。边嗅着书独有的香气边信手翻看，感觉有些意思。因为属铁哥们，就不讲规矩啦，赖着先借来看看。海伦·凯勒一岁多时因病造成盲聋哑，使其变得性情乘张桀骜不驯。在老师多年的耐心帮助下，她从七岁开始自强不息，经过艰辛的努力，学会了口语和写作，成为了著名的作家、教育家、慈善家、社会活动家，享年88岁，被美国《时代周刊》评为美国十大英雄偶像之一，荣获“总统自由勋章”等奖项。后来把借的还了，干脆自买了一本，又重新看了好几遍，每看一遍都心如潮涌，又四处寻觅她另外的著作阅读。</p>"
//         },
//         {

//             "title": "读书的境界",
//             "img": "/public/img/article/a2.jpg",
//             "article": "<p'>随着年龄的增加，笔者“夕阳无限好，只是近黄昏”的感觉格外浓烈，下一步嘛就是候着到另一个世界去生活啰。犹如专业运动员，退役后只能在如火如荼的正式竞技比赛场外望洋兴叹，难免有些许惆怅之憾。某天外出办事后顺路到一个朋友家玩，见其新买了一本海伦·凯勒写的书《假如给我三天光明》。朋友说自己年老体弱，这段时间情绪欠佳，昨天闲逛书店，一个中年男营业员问需要买啥书？他咕咙道想买本振奋精神的书看看。中年男营业员热情地介绍了这本书。买来还没开始阅读。边嗅着书独有的香气边信手翻看，感觉有些意思。因为属铁哥们，就不讲规矩啦，赖着先借来看看。海伦·凯勒一岁多时因病造成盲聋哑，使其变得性情乘张桀骜不驯。在老师多年的耐心帮助下，她从七岁开始自强不息，经过艰辛的努力，学会了口语和写作，成为了著名的作家、教育家、慈善家、社会活动家，享年88岁，被美国《时代周刊》评为美国十大英雄偶像之一，荣获“总统自由勋章”等奖项。后来把借的还了，干脆自买了一本，又重新看了好几遍，每看一遍都心如潮涌，又四处寻觅她另外的著作阅读。读罢她写的好几本书，情不自禁地写下了有四十行长的诗“海伦·凯勒印象”。</p>"
//         },
//         {

//             "title": "享受读书的乐趣 ",
//             "img": "/public/img/article/a3.jpg",
//             "article": "<p>从孩提时代起，书就成为我的玩伴，每一天陪着我遨游在知识的海洋里。童年时代的我，因为需要上学，所以书便每一天跟随我奔波于学校和家之间。现如今，我已迈入中学的大门，走出天真烂漫的童话时代，一篇篇生动优美、清新质朴的美文如磁铁般吸引了我，看着它们，我领略了别人不一样的生活，足不出户却可纵观世界。读书给我带来了无尽的欢乐，更重要的是它教会了我如何热爱他人、热爱生命！书中的大千世界令人神往，它令我充满对未来的憧憬，助我鼓起挑战未来的勇气，我自信地向自己喊到：向前冲！</p> <p>中学时代，《钢铁是怎样炼成的》《巴金选集》《上下五千年》闯进了我的生活，阅历的进一步扩大，让我学会了思考。读一本好书就如在同一个高贵的人谈话，一本本好书给我的心灵上了一堂堂非同寻常的课。对生活的赞美，对生命的热爱。对人生的感悟，让我真切地意识到，只有不断拼搏、不断奋斗的人生才最有价值。富国强民的神圣使命需要我们去完成，不容变更的人生目标让我感到每一天都很充实，而这一切都是读书带给我的。读书点燃我心中的激情，插上我青春的翅膀，推动我向未来奋飞。</p><p>我爱读书，因为读书能够扩大我的视野，让我的写作水平得到进一步提高；我爱读书，因为我喜欢书中那些优美的文章段落，它能够陶冶情操，让我的情绪愉快。</p>"
//         }
//     ]
//     Article.insertMany(arr).then(ret => {
//         res.json(ret)
//     })
// })
module.exports = router