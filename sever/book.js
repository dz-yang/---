var fs = require('fs')

var bookPath = './books.json'

/**
 * 获取学生列表
 * @param  {Function} callback 回调函数
 */
exports.find = function(pape, callback) {
    fs.readFile(bookPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var booksObj = JSON.parse(data).books
        var pageNum = Math.ceil(booksObj.length / 15)
        callback(null, booksObj, pageNum)
    })
}