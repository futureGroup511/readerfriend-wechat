// remind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "icon":"success",
    "remind":"预定成功,富家大室龙卷风打开了"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.debug(options)
    this.setData({
      "icon":options.i,
      "remind":options.r
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
  
  },
  returnpage:function(e){
    console.debug("返回按钮")
    wx.navigateBack({
      delta: 1
    })
  },
  toindex:function(e){
    console.debug("首页按钮")
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})