const {
  request
} = require('../../utils/request.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sectionName: '',
    sectionId: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let { id, section} = options
    this.setData({sectionId: id, sectionName: section})
    this.getList(id)
  },
  
  getList (id) {
    request('api/exam/getSectionExamOfUser', 'get', {sectionId: id}, res => {
      console.log(res)
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