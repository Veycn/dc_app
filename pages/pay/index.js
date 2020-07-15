// pages/pay/index.js

const {
  request
} = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseId: 0,
    isGroup: 0,
    course: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      this.setData({
        course: res.data
      })
    })
  },

  choosePayWay: function (e) {
    let {
      type
    } = e.currentTarget.dataset
    type === 'wx' ? this.setData({
      wxPay: true
    }) : this.setData({
      wxPay: false
    });

  },
  pay: function (e) {
    let {courseId} = this.data
    request('api/wxPay/placeOrder', 'post', {
      courseId: +courseId
    }, res => {
      this.doWxPay(res.data, courseId)
    }, 'form')
  },

  doWxPay(param, courseId){
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.packageStr,
      paySign: param.paySign,
      signType: param.signType,
      success: res => {
        wx.showToast({
          icon: 'none',
          title: '支付成功!'
        })
        setTimeout(() => {
          wx.switchTab({url: '/pages/mycourse/index'})
        }, 1500);
      },
      fail: res => {
        wx.showToast({
          icon: 'none',
          title: '支付失败, 课程已取消!'
        })
        setTimeout(()=>{
          wx.reLaunch({url: '/pages/customize/index'})
        }, 1500)
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