// pages/courseinfo/index.js
const {
  request
} = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pause: true,
    videoInfoList:[],
    courseInfo:[],
    descourseInfo:[],
    playInfo:[]
  },
  playVideo() {
    console.log("开始播放")
    console.log(this.data.videoInfoList[0].videoPlayId)
    var videoPlay = wx.createVideoContext("myVideo")
    request("api/recommendCourse/getVideoPlayInfo", "get", {
      videoPlayId: this.data.videoInfoList[0].videoPlayId || "",
      isTry: false
    }, res => {
      console.log(res.data)
      var videoArr = []
      videoArr.push(res.data)
      this.setData({
        playInfo: videoArr
      })
    })
    videoPlay.play()
    this.setData({
      pause: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    request("api/recommendCourse/getPublicVideoList", "get", {
      courseId: options.id
    }, res => {
      console.log("请求公开课视频列表")
      var arr = []
      arr.push(res.data)
      this.setData({
        videoInfoList: res.data.videoInfoList,
        courseInfo: arr
      })
      console.log(this.data.videoInfoList[0].videoPlayId)
    })
    request("api/recommendCourse/getPrivateCourseInfo", "get", {
        courseId: options.id
      },
      res => {
        console.log("请求定制课程详细信息")
        console.log(res)
        var newArr=[]
        newArr.push(res.data)
        this.setData({
          descourseInfo:newArr
        })
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