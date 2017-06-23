// loading.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputVal:"",
    names:[],
    history:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'history',
      success: function(res) {
        var hist = res.data;
        var history = []
        if(hist){
          var ii = 0;
          for(var i = hist.length-1;i>=0;i--){
            history[ii] = hist[i]
            ii++;
            if(ii>9){
              break;
            }
          }
          that.setData({
            'history':history
          })
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
    var that = this;
    
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
    var that = this
    var s = e.detail.value

    this.setData({
      "inputVal": s
    })
    if(s==''){
      that.setData({
        'names': []
      })
      return;
    }
    app.myRequest({
      'url': app.url('searchNameFuzzy?search=')+s,
      success:function(res){
        console.debug(res)
        if(res.data.result == 0){
          that.setData({
            'names': res.data.names
          })
        }
      }
    })
    console.debug(this.data.inputVal)
  },
  searchFunc:function(e){
    var that = this
    var s = this.data.inputVal;
    var history = that.data.history
    if(s && s.length>0){
      var temp = false;
      for(var i=0;i<history.length;i++){
        if(history[i] == s){
          temp = true;
          break;
        }
      }
      if(!temp){
        history.push(s)
      }
      
      that.setData({
        'history':history
      })
      wx.setStorage({
        key: 'history',
        data: history
      })
    }
    wx.redirectTo({
      url: 'result?s='+s,
    })
  },
  cleanHistoryFunc:function(e){
    var that = this
    that.setData({
      'history':[]
    })
    wx.setStorage({
      key: 'history',
      data: []
    })
    wx.showToast({
      title: '删除成功',
    })
  },
  remindTap:function(e){
    var s = e.currentTarget.dataset.search
    var that = this
    var history = that.data.history
    if (s && s.length > 0) {
      var temp = false;
      for (var i = 0; i < history.length; i++) {
        if (history[i] == s) {
          temp = true;
          break;
        }
      }
      if (!temp) {
        history.push(s)
      }
      that.setData({
        'history': history
      })
      wx.setStorage({
        key: 'history',
        data: history
      })
    }
    wx.redirectTo({
      url: 'result?s=' + s,
    })
  }
})