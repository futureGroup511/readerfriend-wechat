// loading.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputVal:""
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
    var that = this;
    console.debug("onLaunch start.")
    wx.login({
      success: function (res) {
        console.debug(res);
        var code = res.code;
        if (code) {
          wx.getUserInfo({
            success: function (res) {
              console.debug("获取用户信息成功：")
              console.debug(res.userInfo)
              app.globalData.userInfo = res.userInfo;
              that.setData({
                "remind": "授权成功，登录中..."
              })
              var obj = {
                url: app.url('login'),
                data: { 'code': code },
                success: function (res) {
                  console.debug(res);
                  if (res.data.result == 0) {
                    app.globalData.token = res.data.token;
                    wx.switchTab({
                      url: '/pages/index/index'
                    })
                  } else if (res.data.result == 1) {
                    app.globalData.token = res.data.token;
                    console.debug(app.globalData)
                    wx.redirectTo({
                      url: '/pages/register/register'
                    })
                  } else {
                    console.error("登录失败：" + res)
                  }
                },
                fail: function (res) {
                  that.setData({
                    "remind": "错误,网络连接失败."
                  })
                }
              }
              app.myRequest(obj);
            },
            fail: function (res) {
              that.setData({
                "remind": "登录失败，请允许我们需要的授权"
              })
            }
          })
        }
      },
      fail: function (res) {
        console.info("login fail")
        console.debug(res)
      }
    })
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
  searchInput:function(e){
    this.setData({
      "inputVal": e.detail.value
    })
    console.debug(this.data.inputVal)
  }
})