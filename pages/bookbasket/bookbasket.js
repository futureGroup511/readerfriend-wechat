// bookbasket.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "src":""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    wx.showLoading({
      title: '加载中',
    })
    var token = app.globalData.token
    var x = Math.random()
    var src = app.url('borrowToken/createToken?token=') + token + '&x='+ x
    console.debug(src)
    this.setData({
      "src": src
    })
    wx.hideLoading();
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
  refushCode:function(res){
    wx.showLoading({
      title: '加载中',
    })
    var token = app.globalData.token
    var x = Math.random()
    var src = app.url('borrowToken/createToken?token=') + token + '&x=' + x
    console.debug(src)
    this.setData({
      "src": src
    })
    wx.hideLoading();
  }
})