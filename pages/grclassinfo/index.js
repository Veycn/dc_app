// pages/grclassinfo/index.js
import { formatTime, countDown, clearTimeOut } from "../../utils/retime.js" 
const {
  request
} = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainTime: 3600,
    clock: formatTime(3600),
    videoSrc: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    pause: true,
    videoCover: ""
  },
  playVideo() {
    console.log("开始播放")
    var videoPlay = wx.createVideoContext("myVideo")
    videoPlay.play()
    this.setData({
      pause: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  onReady: function () {
    clearTimeOut()
    if (this.data.remainTime) {
      countDown(this)
    }
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