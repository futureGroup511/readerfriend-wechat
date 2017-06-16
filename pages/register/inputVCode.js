// inputVCode.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    btnValue:"验证",
    remind:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据

    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
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
  vCodeInput:function(e){
    this.setData({
      "vCode": e.detail.value
    });
  },
  btnValidate:function(e){
    var vCode = this.data.vCode;
    var that = this;
    var obj = {
      "url": app.url('newUser'),
      "data": { "vCode": vCode, "userInfo": app.globalData.userInfo},
      success:function(res){
        console.debug(res);
        if(res.data.result == 0){
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }else{
          console.debug("temp24")
          console.debug(res)
          that.setData({
            "remind": '验证码填写错误！'
          });
          console.debug("temp25")
        }
      }
    };
    app.myRequest(obj);
  }
})
