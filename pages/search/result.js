// result.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    remind:'搜索中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.debug(options)
    var s = options.s
    var url = app.url('searchBookFuzzy?search=')+s+'&page=1&pageSize=10'
    app.myRequest({
      'url':url,
      success:function(res){
        console.debug(res)
        if(res.data.result == 0){
          var books = res.data.books
          that.setData({
            'books':books,
            'remind':'搜索结果：'
          })
          if(books.length==0){
            that.setData({
              'remind':'没有找到相应的书籍'
            })
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})