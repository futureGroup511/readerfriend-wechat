// register.js
var app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    phoneInputDisabled:false,
    btnDisabled:false,
    btnValue:"下一步"
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
        userInfo:userInfo
      })
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var app = getApp()
    
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  phoneInput:function(e){
    console.debug("phone input")
    this.setData({
      "phone":e.detail.value
    })
  },
  nextStep:function(event){
    console.debug("nextstep click .")
    this.setData({
      phoneInputDisabled:true,
      btnDisabled:true,
      btnValue:'请稍候 ...'
    })
    var server = app.globalData.server;
    if (app.globalData.userInfo){
      var nickName = app.globalData.userInfo.nickName;
    }else{
      nickName = '微信用户';
    }
    console.debug(this.data)
    var phone = this.data.phone;
    var obj = {
      url:server.address + server.common+'sendShortMessage',
      data:{
        "phone":phone,
        "nickName":nickName
      },
      success:function(res){
        if(res.data.result==0){
          console.debug("验证码已经发送")
          wx.redirectTo({
            url: '/pages/register/inputVCode'
          })
        }else if(res.data.result==3){
          console.debug("验证码发送失败")
        }
      }
    };
    console.debug(obj)
    app.myRequest(obj);
  }
})
//获取应用实例
