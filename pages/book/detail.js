// detail.js
var app = getApp();
var douban = require('../../utils/douban.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbn:"",
    bookId:0,
    currentTab: 0,
    bookInfo:{},
    comment:"",
    recommendBook:[{
      "image":"/image/loading_two.gif",
      "name":"",
      "rating":5.4,
    }
    ],
    userInfo:null,
    bookInfo:{
      "image": "/image/loading_two.gif",
      "name":"加载中...",
      "rating":0,
      "ratingStar":[0,0,0,0,0],
      "summary":"加载中...",
      "author":["..."]
    },
    "bookSurplus": 0,
    "allBookNum":'...',
    BookComments:[
      {             
        "userHead":"",
        "userNickName":"提示",
        "content":"还没有评论",
        "createTime":"2017-02-21"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.debug(options)
    var that = this;
    var id = options.id
    if(id){
      that.setData({
        "bookId": id
      })
    }
    
    app.getUserInfo(function(res){
      that.setData({
        "userInfo":res
      });
    });
    
    var isbn = options.isbn;
    console.debug("书的isbn")
    console.debug(isbn)
    if(isbn){
      app.myRequest({
        "url": app.url('getBookNum?isbn=')+isbn,
        "method":"get",
        success:function(res){
          console.log("获取藏书量成功")
          var sur = 0;
          var all = 0;
          if(res.data.result ==0 ){
            sur = res.data.surplus
            all = res.data.all
          }
          that.setData({
            "bookSurplus": sur,
            "allBookNum":all
          })
        },
        fail:function(res){
          console.log("获取藏书量失败")
        }
      });

      douban.getBookInfoByIsbn(isbn,function(res){
        console.debug("获取的图书信息：")
        console.debug(res)
        var bookInfo = res.data;
        if(bookInfo.title){
          that.setData({
            "bookInfo": bookInfo
          });
          var tags = bookInfo.tags;
          //添加用户标签
          var tagNames = [];
          for(var i =0;i<tags.length;i++){
            tagNames[i] = tags[i].name;
          }
          app.myRequest({
            'url': app.url('addUserTag'),
            'data':{
              'tags':tagNames
            }
          })
          var x = tags.length > 1 ? 1 : tags.length;
          var q = '';
          for (var i = 0; i < x; i++) {
            q += tags[i].name;
            q += ',';
          }
          douban.searchBook(q, 6, function (res) {
            that.setData({
              "recommendBook": res.data.books
            });
          });
          var rating = bookInfo.rating.average;
          if (!that.data.bookInfo.ratingStar) {
            that.data.bookInfo.ratingStar = [0, 0, 0, 0, 0];
          }
          var ratingStar = [];
          for (var i = 0; i < 5; i++) {
            if (rating > i * 2) {
              ratingStar[i] = 1;
            } else {
              ratingStar[i] = 0;
            }
          }
          that.setData({
            "bookInfo.ratingStar": ratingStar
          });
        }else{
          var b = that.data.bookInfo
          b.title = '未找到'
          b.summary = '对不起，未找到相应的图书'
          that.setData({
            "bookInfo":b
          });
        }

        console.debug("开始获取评论：")
        that.getComment(isbn);

      });
    }
    
    that.setData({
      "isbn":isbn
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
  
  },
  swichTab:function(e){
    var that = this;
    console.debug("tab click:");
    var index = e.target.dataset.index;
    console.debug(index);
    this.setData({
      "currentTab": index
    });
  },
  commentFocus:function(e){
    this.setData({
      "scrollTop":100
    });
  },
  postComment:function(e){
    var that = this
    console.debug("发表评论：")
    var comment = this.data.comment;
    if(comment){
      var obj = {
        "url": app.url('book/addComment'),
        "data":{
          "isbn":this.data.isbn,
          "comment":comment
        },
        success:function(res){
          var r = res.data.result
          if(r == 0){
            that.getComment(that.data.isbn);
            wx.showToast({
              title: '评论成功',
              icon: 'success',
              duration: 2000
            })
          }else if(r==32){
            wx.showToast({
              title: '失败,您已经评论过此书',
              icon: 'loading',
              image:'/image/error.png',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '评论失败',
              icon: 'loading',
              image: '/image/error.png',
              duration: 2000
            })
          }
          console.debug(res)
        },
        fail:function(res){
          wx.showToast({
            title: '评论失败,网络原因',
            image: '/image/error.png',
            icon: 'loading',
            duration: 2000
          })
        }
      }
      app.myRequest(obj);
    }
  },
  commentInput:function(e){
    this.setData({
      "comment": e.detail.value
    });
    console.debug("输入评论：")
    console.debug(e.detail.value)
  },
  getComment:function(isbn){
    var that = this
    app.myRequest({
      "url": app.url('book/getComment?') + "isbn=" + isbn + "&page=" + "1",
      "method": "get",
      "success": function (res) {
        console.debug("获取评论成功：")
        console.debug(res.data)
        if (res.data.result == 0) {
          var c = res.data.comments
          if(c.length>0){
            that.setData({
              "BookComments": c,
              "comment": ""
            })
          }
        }
      }
    });
  },
  reserveBook:function(e){
    wx.showLoading({
      title: '预定中...',
    })
    var that = this
    var isbn = that.data.isbn
    var bookName = that.data.bookInfo.title
    if (isbn && bookName) {
      app.myRequest({
        "url": app.url('book/reserveBook'),
        "data": {
          "isbn": isbn,
          "bookName": bookName
        },
        success: function (res) {
          console.debug(res.data)
          wx.hideLoading()
          var remind = {
            i:"",
            r:""
          }
          if (res.data.result == 0) {
            var reserve = res.data.reserve
            if (reserve == 0) {
              remind.i = 'success'
              remind.r = '预定成功,请于3天内去图书馆取书，过期无效'
            } else if (reserve == -1) {
              remind.i = 'warn'
              remind.r = '预定失败,您已经预定过本书'
            } else if (reserve == 1) {
              remind.i = 'info'
              remind.r = '预定成功,暂无库存,我们会在有书时通知您'
            }
          } else {
            remind = {
              "i": "cancel",
              "r": "抱歉,预定失败,该书暂不可预定"
            }
          }
          console.debug('即将跳转')
          console.debug(remind)
          wx.navigateTo({
            url: '/pages/remind/remind?i='+remind.i + '&r='+remind.r
          })
        },
        fail:function(res){
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/remind/remind?i=warn&r=网络出错!'
          })
        }
      })
    }
  },
  borrowBook:function(e){
   console.debug(e)
   var isbn = this.data.isbn
   var id = this.data.bookId
   var name = this.data.bookInfo.title
   wx.navigateTo({
     url: '/pages/pay/pay?isbn='+isbn+'&id='+id+'&name='+name,
   }) 
  }
})