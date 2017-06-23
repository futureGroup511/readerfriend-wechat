var isbnUrl = 'https://api.douban.com/v2/book/isbn/';
var searchUrl = 'https://api.douban.com/v2/book/search?';
function getBookInfoByIsbn(isbn, successFun) {
  wx.request({
    url: isbnUrl + isbn,
    header:{
      'Content-Type':'json'
    },
    success: successFun
  })
}
function searchBook(q,count,successFun) {
  wx.request({
    url: searchUrl + 'q='+q+'&count='+count,
    header: {
      'Content-Type': 'json'
    },
    success: successFun
  })
}
function searchByTag(t, count, successFun) {
  wx.request({
    url: searchUrl + 'tag=' + t + '&count=' + count,
    header: {
      'Content-Type': 'json'
    },
    success: successFun
  })
}


module.exports.getBookInfoByIsbn = getBookInfoByIsbn
module.exports.searchBook = searchBook
module.exports.searchByTag = searchByTag