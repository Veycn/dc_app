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
    videoInfo: null,
    courseInfo:[],
    descourseInfo:[],
    playInfo:[],
    course: null,
    canPlay: true
  },
  tryPlayVideo() {
    let {videoInfo, canPlay} = this.data
    request("api/recommendCourse/getVideoPlayInfo", "get", {
      videoPlayId: videoInfo[0].videoPlayId,
      isTry: false
    }, res => {
      this.videoContext.pause()
      this.setData({
        playInfo: res.data
      })
    })

    // if(canPlay){
    //   this.videoContext.play()
    //   setTimeout(() => {
    //     this.videoContext.pause()
    //   }, 3000)
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var videoPlay = wx.createVideoContext("myVideo")
    this.videoContext = videoPlay

    request("api/recommendCourse/getPublicVideoList", "get", {
      courseId: options.id
    }, res => {
      let {data} = res
      this.setData({
        videoInfo: data.videoInfoList,
      })
    })
    request("api/recommendCourse/getPrivateCourseInfo", "get", {
        courseId: options.id
      },
      res => {
        this.getTryVideoInfo()
        this.setData({
          course: res.data
        })
      })
  },
  videoPlay(){
    this.videoContext.play()
    this.setData({pause: false})
  },
  videoPause(){
    this.videoContext.pause()
    this.setData({pause: true})
  },
  toggleState () {
    let {pause} = this.data
    if(pause){
      this.videoPlay()
    }else {
      this.videoPause()
    }
  },

  getTryVideoInfo () {
    let {videoInfo} = this.data
    request("api/recommendCourse/getVideoPlayInfo", "get", {
      videoPlayId: videoInfo[0].videoPlayId,
      isTry: false
    }, res => {
      this.setData({
        playInfo: res.data
      })
    })
  },
  toPay(e){
    console.log(this.data.course)
    let { type } = e.currentTarget.dataset
    let { course } = this.data
    wx.navigateTo({url: `/pages/pay/index?isGroup=${type}&courseId=${course.courseId}`})
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