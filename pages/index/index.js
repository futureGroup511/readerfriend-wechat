var app = getApp()
var douban = require('../../utils/douban.js')
Page({
  data: {
    imgUrls: [
      
    ],
    images:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    summaryControl:[],
    recommendBooks:null
  },
  onLoad: function () {
    var that = this;
    var obj ={
      "url": app.url('getIndexImages'),
      success:function(res){
        var images = res.data.images;
        var imageUrls = [];
        for(var i=0;i<images.length;i++){
          images[i].imgUrl = app.globalData.server.address + images[i].imgUrl;
        }
        that.setData({
          "images": images
        });
      },
      fail:function(res){
        console.debug("加载轮播图失败");
      }
    }
    app.myRequest(obj);
    var obj1 = {
      "url": app.url('getUserTags?count=3'),
      "method":"get",
      success:function(res){
        console.debug(res)
        var tags = res.data.tags
        if(tags && tags.length >0){
          
          douban.searchByTag(tags[0],5,function(res){
            console.debug("获取图书成功")
            console.debug(res)
            that.setData({
              "recommendBooks":res.data.books
            })
          });
        }else{
          console.debug("获取用户标签失败");
          console.debug(res);
        }
        
      }
    };
    app.myRequest(obj1);
    
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  onChangeShowState: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    var temp = that.data.summaryControl
    temp[index] = ! temp[index]
    that.setData({
      "summaryControl":temp
    })
  },
  scanCode:function(){
    wx.scanCode({
      success:function(res){
        var result = res.result
        console.debug("扫码结果:")
        if(res.scanType == 'QR_CODE'){
          var resultJson = JSON.parse(result);
          console.debug(resultJson)
          wx.navigateTo({
            url: '/pages/book/detail?isbn=' + resultJson.isbn + '&id=' + resultJson.id
          })
        }else{
          wx.navigateTo({
            url: '/pages/book/detail?isbn='+result
          })
        }
      },
      fail:function(res){

      }
    })
  },
  indexImageTap:function(e){
    var image = e.target.dataset.image;
    if (image.operation == 'bookInfo'){
      wx.navigateTo({
        url: '/pages/book/detail?isbn=' + image.operationValue,
      })
    }
  },
  recommendBookTap:function(e){
    var book = e.currentTarget.dataset.book;
    var isbn = book.isbn13?book.isbn13:book.isbn10
    if(isbn){
      wx.navigateTo({
        url: '/pages/book/detail?isbn=' + isbn,
      })
    }
  },
  searchFocus:function(e){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})
