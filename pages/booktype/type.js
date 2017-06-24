// type.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "remind":"搜索中..."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var type = options.t
    console.debug(type)
    var url = app.url('getBookByType');
    app.myRequest({
      'url':url,
      'data':{
        'type':type,
        'page':'1',
        'pageSize':20
      },
      success:function(res){
        console.debug(res)
        if(res.data.result == 0 && res.data.books.length>0){
          that.setData({
            'remind':'搜索结果:',
            'books':res.data.books
          })
        }else{
          that.setData({
            'remind':'未找到书籍'
          })
        }
      },
      fail:function(res){
        that.setData({
          'remind':'网络错误,未找到结果'
        })
      }
    });
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