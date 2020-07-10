// pages/income/index.js
const {request} = require("../../utils/request")
const  { descourse, desgrcourse }=require("../../utils/course.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    Income: {}
  },

  getData () {
    request('/api/teacherAccount/getTotalIncome', 'get', {}, res => {
      console.log(res);
      this.setData({Income: res.data})
      wx.setStorageSync('Income', JSON.stringify(res.data))
    }, 'json', false, 1)
  },
  
  getData2 () {
    request('/api/teacherAccount/getIncomeByCourse', 'get', {}, res => {
      console.log(res);
      this.setData({courseList: res.data})
    }, 'json', false, 1)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.getData2()
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