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
    cart: '',
    totalPrice: 0,           // 总价，初始为0
    selectAll: true,    // 全选状态，默认不全选
    selectNum: 0                // 选中的件数
  },

  //清空购物车
  clearCart() {
    let cart = this.data.cart;
    const length = cart.length;
    let arr2 = [];
    wx.showModal({
      title: '提示',
      content: '确定要删除该商品吗？',
      success: res => {
        if (res.confirm) {
          for (let i = 0; i < length; i++) {
            if (!cart[i].data.jdSelection){
              arr2.push(cart[i])
            }
          }
          wx.clearStorageSync()
          this.setData({
            clicked: false,
            cart: []
          })
          wx.setStorageSync('id', arr2)
          var that = this;
          that.setData({
            cart: arr2,
          })
          this.totlePrice();
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  },
  //计算总价格
  totlePrice: function () {
    
    let cart = this.data.cart;
    let total = 0;
    let position = 0;
    for (let i = 0; i < cart.length; i++) {         // 循环列表得到每个数据
      if (cart[i].data.jdSelection) {               // 判断选中才会计算价格
        total += cart[i].data.position * cart[i].data.skuPrice;
        position += cart[i].data.position;
      }
    }
    this.setData({
      selectNum: position,
      totalPrice: total.toFixed(2)
    });
  },
  //选中反选
  selected: function (e) {
    
    const index = e.currentTarget.dataset.num;
    let cart = this.data.cart;
    let selectAll = this.data.selectAll;
    let count = 0;
    cart[index].data.jdSelection = !cart[index].data.jdSelection;
    //判断全选状态
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].data.jdSelection == true) {
        count++;
      }
    }
    if (count == cart.length) {
      selectAll = true;
    } else {
      selectAll = false;
    }
    this.setData({
      cart: cart,
      selectAll: selectAll
    });
    this.totlePrice();
  },
  //全选
  selectedAll: function () {
    
    let selectAll = this.data.selectAll;   // 是否全选状态
    selectAll = !selectAll;
    let cart = this.data.cart;

    for (let i = 0; i < cart.length; i++) {
      cart[i].data.jdSelection = selectAll;    // 改变所有商品状态
    }
    this.setData({
      selectAll: selectAll,
      cart: cart
    });
    this.totlePrice();     // 获取总价
  },
  //增加
  addNum : function (e) {
    const index = e.currentTarget.dataset.num;
    let cart = this.data.cart;
    let position = cart[index].data.position;
    position = position + 1;
    cart[index].data.position = position;
    this.setData({
      cart: cart
    });
    this.totlePrice();
    wx.setStorageSync('id', cart)
  },
  //减少
  subNum : function (e) {
    const index = e.currentTarget.dataset.num;
    let cart = this.data.cart;
    let position = cart[index].data.position;
    if (position <= 1) {
      return false;
    }
    position = position - 1;
    cart[index].data.position = position;
    this.setData({
      cart: cart
    });
    this.totlePrice();
    wx.setStorageSync('id', cart)
  },
  //获取商品信息
  getCart: function (){
    var that = this;
    var arr = wx.getStorageSync('id') ? wx.getStorageSync('id') : []
    that.setData({
      cart: arr,
    })
  },
  complete: function () {
    setTimeout(function () {
      dialog.hide();
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) { 
    dialog.loading();
    var that = this;
    this.complete()
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
    this.getCart()
    this.totlePrice()
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