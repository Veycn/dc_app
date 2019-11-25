// pages/pay/index.js

const {
  request
} = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxPay: true,
    courseId: 0,
    isGroup: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({courseId: options.courseId, isGroup: options.isGroup})
    this.getCousePayInfo()
  },
  getCousePayInfo(){
    let {courseId, isGroup} = this.data
    request('api/wxPay/getPayInfo', 'get', {
      courseId,
      isGroup
    }, res => {
      console.log(res)
    })
  },

  choosePayWay: function (e) {
    let {
      type
    } = e.currentTarget.dataset
    console.log(type)
    type === 'wx' ? this.setData({
      wxPay: true
    }) : this.setData({
      wxPay: false
    });

  },
  submitPay: function () {

    console.log('是否为微信自己支付: ' + this.data.wxPay)
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