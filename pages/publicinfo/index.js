// pages/courseinfo/index.js
const {
  request
} = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      desc: "本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍 本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍本课程介绍"
    }],
    videoInfoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    request("api/recommendCourse/getPublicCourseInfo", "get", {
        courseId: options.id
      },
      res => {
        console.log("请求公开课详细信息")
        console.log(res)
        this.setData({})
      })
    request("api/recommendCourse/getPublicVideoList", "get", {
      courseId: options.id
    }, res => {
      console.log("请求公开课视频列表")
      console.log(res)
    })

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