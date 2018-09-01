// pages/detail/detail.js

//获取应用实例
const app = getApp();

//require引入文件
var util = require("../../utils/util.js");

//require引入api.js文件
var CONFIG = require("../../utils/config.js");
var dialog = require("../../utils/dialog.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: []
  },
  
  //加入购物车
  addCart: function () {
    
    var arr = wx.getStorageSync('id') ? wx.getStorageSync('id') : []
    this.data.data.jdSelection = true
    let j = arr.findIndex(item => item.data.id == this.data.data.id)
    if (j > -1) {
      arr[j].data.position += this.data.data.position
    } else{
      arr.unshift(this.data)
    }
    wx.setStorageSync('id', arr)
  },

  //购物车页面跳转
  goCart: function (){
    wx.switchTab({
      url: '../../pages/cart/cart'
    })
  },
  //增加
  addNum: function () {
    let cart = this.data.data;
    let position = cart.position;
    position = position + 1;
    cart.position = position;
    this.setData({
      data: cart
    })
  },
  //减少
  subNum: function () {
    let cart = this.data.data;
    let position = cart.position;
    if (position <= 1) {
      return false;
    }
    position = position - 1;
    cart.position = position;
    this.setData({
      data: cart
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    dialog.loading();

    var that = this;

    wx.request({
      url: CONFIG.API_URL.GOODS_DETAIL_QUERY + option.id,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);//errMsg: "request:ok", data: Object, statusCode: 200
        if (res.statusCode == 200) {
        
        // html解析
        var data = res.data;
        var len = data.length;
        var newData = JSON.parse(data.substr(1, len - 3));
        
          that.setData({
            data: newData.data,
          })
        }
      },
      complete: function () {
        setTimeout(function () {
          dialog.hide();
        }, 1000);
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
    
  }
})