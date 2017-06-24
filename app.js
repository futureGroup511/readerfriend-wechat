//app.js
var app = getApp()
App({
  onLaunch: function () {
    console.debug("pingToken")
    var that = this
    var url = that.globalData.server.address + that.globalData.server.common + 'pingToken';
    setInterval(function(){
      console.debug("pingToken1")
      that.myRequest({
        'url':url
      })
    },1000*60);
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  //对网络请求的封装，自动带上token头部,参数请参见wx.request函数
  myRequest: function (obj){
    if(! obj.method){
      obj.method = 'post';
    }
    if(! obj.header){
      obj.header={};
    }
    obj.header.token = this.globalData.token;
    wx.request(obj);
  },
  url:function(uri){
    var app = this;
    return app.globalData.server.address + app.globalData.server.prefix + uri;
  },
  globalData:{
    userInfo: null,
    token: "default",
    server:{
      "address": "https://three.jfree.top/",
      "prefix":"readerfriend/xiaochengxu/",
      "common":"readerfriend/common/",
      "static":"http://156jl23992.51mypc.cn:23742/static/"
    }
    
  }
})