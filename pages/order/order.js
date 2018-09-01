// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themes: [
      { id: 1, name: "全部订单" },
      { id: 2, name: "待付款" },
      { id: 3, name: "待收货" },
      { id: 4, name: "待评价" },
      { id: 5, name: "我的拼购" },
      { id: 6, name: "筹款" },
      { id: 7, name: "拍卖" },
      { id: 8, name: "常购清单" },
      { id: 9, name: "回收站" }
    ],
    curNav: ""
  },

  getTheme: function(e){
    var themeid = e.currentTarget.id;
    var that = this;
    that.setData({
      curNav: themeid
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})