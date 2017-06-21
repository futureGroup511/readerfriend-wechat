// pay.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "isbn":"",
    "name":""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.debug(options)
    var isbn = options.isbn
    var name = options.name
    var id = options.id;
    if(id && id>0){
      this.setData({
        "id": id,
        "name": name,
        "isbn": isbn,
        "money":"0.6元"
      })
    }else{
      this.setData({
        "remind":"借书请使用首页的扫码功能,扫描书上的二维码"
      })
    }
    
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
  ipay:function(e){
    var that = this
    console.debug(e)
    wx.showLoading({
      title: '借书中',
    })
    app.myRequest({
      "url": app.url('book/borrowBook'),
      "data":{
        "id":that.data.id
      },
      success:function(res){
        console.debug(res)
        wx.hideLoading();
        if(res.data.result == 0){
          console.debug("借书成功")
          wx.showToast({
            title: '借书成功',
            icon:'success'
          })
        } else if (res.data.result == 51){
          console.debug("借书失败,result51")
          wx.showToast({
            title: '借书失败,每人只能借2本书',
            image: '/image/error.png',
            icon:'loading'
          })
        } else {
          console.debug("借书失败,result52")
          wx.showToast({
            title: '借书失败,您来晚了,本书刚被借',
            image: '/image/error.png',
            icon: 'loading'
          })
        }
        setTimeout(function(){
          wx.navigateBack({

          })
        },1500)
        
      },
      fail:function(res){
        wx.hideLoading();
        console.debug("借书失败,网络fail")
        wx.showToast({
          title: '借书失败,网络错误',
          icon: 'loading',
          image: '/image/error.png'
        })
        setTimeout(function () {
          wx.navigateBack({

          })
        }, 1500)

      }
    })

  },
  returnPage:function(e){
    console.debug(e)
    wx.navigateBack({
      
    })
  }
})