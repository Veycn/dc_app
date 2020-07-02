const {
  request
} = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseId: 0,
    courseName: '',
    teacherName: '',
    timer: null,
    course: null,
    courseIntro: '', 
    historyVideoId: 0, 
    historyVideoSecond: 0, 
    videoInfoList: null,
    currentTime: 0,
    duration: 0,
    counter: 0,
    activeIndex: 0
  },

  update(e) {
    let {currentTime, duration} = e.detail
    let {counter} = this.data
    this.setData({currentTime, duration, counter: ++counter})
    if(counter % 20 == 0){
      let {currentTime, courseId} = this.data
      let {videoId} = this.data.videoInfoList[0]
      request('api/userCourse/saveWatchRecord', 'post', {
        courseId: +courseId, videoId, watchSecond: Math.floor(currentTime)
      }, () => {}, "form", true)
    }
  },


  stopTouchMove: function () {
    return false;
  },

  toggleClass (e) {
    let {item, index} = e.currentTarget.dataset
    console.log(item)
    this.setData({activeIndex: index, historyVideoSecond: 0, currentTime: 0, counter: 0})
    this.getVideoPlayInfo()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({courseId: options.courseId, courseName: options.courseName, teacherName: options.teacherName})
    this.getPrivateCourseInfo()
    this.getMyVideoList()
    const video = wx.createVideoContext('myVideo')
    this.videoContext = video
  },

  getVideoPlayInfo(){
    let {videoInfoList, historyVideoSecond, activeIndex} = this.data
    request('api/recommendCourse/getVideoPlayInfo', 'get', {videoPlayId: videoInfoList[activeIndex].videoPlayId, isTry: false}, res => {
      console.log(res)
      this.setData({course: res.data})
      this.videoContext.seek(historyVideoSecond)
      // this.videoContext.play()
    })
  },

  getPrivateCourseInfo (){
    let {courseId} = this.data
    request('api/recommendCourse/getPrivateCourseInfo', 'get', {courseId}, res => {
      this.setData({courseDuration: res.data.courseDuration})
    })
  },
  //api/userCourse/getMyVideoList 获取定制课程视频列表
  getMyVideoList () {
    let {courseId} = this.data
    request('api/userCourse/getMyVideoList', 'get', {courseId}, res => {
      let {courseIntro, historyVideoId, historyVideoSecond, videoInfoList} = res.data
      this.setData({courseIntro, historyVideoId, historyVideoSecond, videoInfoList})
      this.getVideoPlayInfo()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(res) {
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
    clearTimeout(this.data.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("推出了");
    clearTimeout(this.data.timer)
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