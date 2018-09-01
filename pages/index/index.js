const app = getApp();

//require引入文件
var util = require("../../utils/util.js");

//require引入api.js文件
var CONFIG = require("../../utils/config.js");
var dialog = require("../../utils/dialog.js");

var pageNum = 1;
var goodsArr = [];

Page({
  data: {
    imgUrls: [
      'https://m.360buyimg.com/babel/jfs/t23872/175/2267232229/101107/aadbeed1/5b7a65c4N4fa91bb1.jpg',
      'https://img1.360buyimg.com/pop/jfs/t24883/133/854832443/89500/69c15484/5b7ea627N51299da6.jpg',
      'https://img1.360buyimg.com/pop/jfs/t19939/297/2595725080/73412/e71933d9/5b56cca2N51d1dbbf.jpg',
      'https://img1.360buyimg.com/pop/jfs/t24103/25/2332885207/98728/26a6c7f0/5b7bf077N65cb6722.jpg',
      'https://m.360buyimg.com/babel/jfs/t25177/22/852686615/47668/53ff0fe6/5b7e0e86Nd6021ef2.jpg'
    ],
    tagImage: [
      'https://img10.360buyimg.com/babel/s380x300_jfs/t24739/112/757013720/33508/a680b007/5b7bcb24N55abc5d8.jpg!q90!cc_190x150',
      'https://img10.360buyimg.com/babel/s380x300_jfs/t24565/224/2344510799/38866/7b655845/5b7bb47dN228601cc.jpg!q90!cc_190x150'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    list: "",
  },
  //商品详情页跳转
  goodsDetail: function (e) {
    console.log(">>>" + e.currentTarget.id)

    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.id,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //获取商品信息
  getGoodsList: function () {
    var that = this
    wx.request({
      url: CONFIG.API_URL.GOODS_INDEX_QUERY + pageNum,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);//errMsg: "request:ok", data: Object, statusCode: 200
        if (res.statusCode == 200) {
          //京东后台返回的数据有问题
          if (res.data.list.length < 80){
            for (let i = 0; i < res.data.list.length; i++) {
              goodsArr.push(res.data.list[i])
            }
            wx.setStorageSync('indexId', goodsArr)
            that.setData({
              list: wx.getStorageSync('indexId')
            })
          }
        }
      },
      fail: function () {
        setTimeout(function () {
          dialog.toast("请求失败，请检查您的网络！");
        }, 1000);
      }
    })
  },
  //搜索页面
  searchPage: function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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
    this.getGoodsList()
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
    goodsArr = [];
    wx.setStorageSync('indexId', goodsArr)
    pageNum = 1
    this.getGoodsList()
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    pageNum++;
    this.getGoodsList()
    console.log('<' + 'pageNum' + '>', pageNum)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
