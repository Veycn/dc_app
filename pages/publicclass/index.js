const {request} = require("../../utils/request.js")
Page({
  data: {
    publicCourseInfo: null,
    course: null,
    videoInfo: null,
    courseInfo: null,
    counter: -1,
    currentTime: 0,
    pause: true
  },

  update (e) {
    let {currentTime, duration} = e.detail
    let {counter} = this.data
    this.setData({currentTime, duration, counter: ++counter})
    if(counter < 1) {
      this.videoContext.seek(this.data.course.historyVideoSecond)
      this.videoContext.play()
      console.log(1111)
    }
    if(counter % 20 == 0){
      let {courseId} = this.data.courseInfo
      let {videoId} = this.data.course.videoInfoList[0]
      request('api/userCourse/saveWatchRecord', 'post', {
        courseId: +courseId, videoId, watchSecond: Math.floor(currentTime)
      }, () => {}, "form", true)
    }
  },

  playVideo(){
    console.log("开始播放")
    this.videoContext.seek(this.data.course.historyVideoSecond)
    this.videoContext.play()
    this.setData({
      pause:false
    })
  },

  // 获取公开课视频列表
  getCourseList (id) {
    id = id ? id : this.data.publicCourseInfo.courseId
    request('api/recommendCourse/getPublicVideoList', 'get', {courseId: id}, res => {
      console.log(res)
      this.setData({course: res.data})
    })
  },

  // 获取公开课详细信息

  getCourseInfo (id) {
    request("api/recommendCourse/getPublicCourseInfo", 'get', {courseId: id}, res => {
      this.setData({courseInfo: res.data})
      this.getPlayInfo(res.data && res.data.ossVideoId)
    })
  },

  // 获取播放信息

  getPlayInfo (id){
    id = id ? id : this.data.courseInfo.ossVideoId
    request('api/recommendCourse/getVideoPlayInfo', 'get', {videoPlayId: id}, res => {
      this.setData({videoInfo: res.data})
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request('/api/recommendCourse/getSimplePublicCourse', 'get', {}, res => {
      this.setData({publicCourseInfo: res.data && res.data[0]})
      // this.getCourseList(res.data && res.data[0].courseId)
      this.getCourseInfo(res.data && res.data[0].courseId)
    })
    this.videoContext = wx.createVideoContext('myVideo')
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