// booklist.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "books":[{
      "name":"测试-书的名字",
      "isbn":"1545454545",
      "nullBook":true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var o = options.o;
    console.debug(o)
    that.setData({
      "option":o
    })
    that.init();
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
  
  },
  init:function(){
    var that = this
    var o = that.data.option
    app.myRequest({
      "url": app.url('my/getBooks?o=') + o,
      "method": "get",
      success: function (res) {
        console.debug(res)
        if (res.data.result == 0) {
          that.setData({
            "books": res.data.books
          })
          if (res.data.books.length == 0){
            that.setData({
              "remind":"还没有书哇"
            })
          }
        }
      }
    });
  },
  deletebook:function(e){
    if('reserve' != this.data.option ){
      wx.showToast({
        title: '借书无法删除,还书时自动删除',
        image: '/image/error.png'
      })
      return;
    }
    
    console.debug(e)
    var that = this
    var isbn = e.currentTarget.dataset.isbn;
    console.debug(isbn)
    if(isbn){
      app.myRequest({
        "url": app.url('book/deleteReserveBook'),
        "data":{
          "isbn":isbn
        },
        success:function(res){
          console.debug(res)
          if(res.data.result == 0){
            that.init();
            wx.hideLoading();
            wx.showToast({
              title: '删除成功!',
            })
          }else{
            
          }
        }
      });
    }
  }
})