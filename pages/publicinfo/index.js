// pages/courseinfo/index.js
const {
  request
} = require("../../utils/request.js")
const {
  descourse
} = require("../../utils/course.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pause: true,
    videoInfo: null,
    courseInfo: null,
    descourseInfo: [],
    playInfo: {},
    course: null,
    canPlay: true,
    counter: 0,
    teacherName: '',
    isGroup: 0,
    time: 0,
    timeStr: '',
    sameCourse:[],
    freeCourse:[],
    courseId: '',
    source: '',
    courseName: '',
    courseIntro: '',
    courseStars: 0,
    Income: '',
    similarFlag:false,
    freeFlag:false,
    isBuy:false
  },

  // 视频播放完毕
  ended(){
    wx.showToast({
      title: '试看结束, 请购买!',
      icon: 'none'
    })
  },
  toSameCourse() {
    wx.navigateTo({
      url: `/pages/samecourse/index?id=${this.data.courseId}`,
    })
  },
  toFreeCourse() {
    wx.navigateTo({
      url: `/pages/freecourse/index?id=${this.data.courseId}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      teacherName: options.teacherName,
      courseId: options.id,
      courseInfo: descourse,
      source: options.source || '',
      playId: options.playId || '',
      courseIntro: options.courseIntro || '',
      courseName: options.courseName || '',
      courseStars: options.courseStars || 0,
      _income: options._income || '0.00',
      isBuy:(options.isBuy==='false'?false:true)
    })
    // 页面加载完成,初始化 video 对象
    var videoPlay = wx.createVideoContext("myVideo")
    this.videoContext = videoPlay
   
   
    this.getSimilarCourse()
    this.getFreeCourse()
    if (options.source === 'teacher') {
      this.getVideoPlayInfo(options.playId)
      this.getCourseDetailInfo()
      this.setData({Income: JSON.parse(wx.getStorageSync('Income'))})
    } else {
      request('api/recommendCourse/getVideoPlayInfo',"get",{
        videoPlayId:options.videoId, isTry: true
      },res=>{
        this.setData({
          playInfo:res.data
        })
      })
      request("api/recommendCourse/getPrivateCourseInfo", "get", {
        courseId: options.id
      }, res => {
        let {data} = res
        console.log(data)
        this.setData({
          courseInfo: data
        })
      })
    }
  },
  // 获取同类课程
  getSimilarCourse() {
    request('api/recommendCourse/getSimilarCourse', "get", {
      courseId: this.data.courseId
    }, res => {
      console.log(res)
      if(res.data.length>0){
        let sameCourse = res.data.filter((value,index)=>{
          return index<=1
        }) 
        this.setData({
          sameCourse:sameCourse,
          similarFlag:true,
        })
      }
    })
  },
  getFreeCourse() {
    request('api/recommendCourse/getFreeCourse', "get", {
      courseId: this.data.courseId
    }, res => {
      console.log(res)
      if(res.data.length>0){
        let freeCourse = res.data.filter((value,index)=>{
          return index<=1
        }) 
        this.setData({
          freeCourse:freeCourse,
          freeFlag:true
        })
      }
    })
  },
  // 获取视频播放信息
  getVideoPlayInfo(playId) {
    request('api/recommendCourse/getVideoPlayInfo', 'get', {
      videoPlayId: playId,
      isTry: false
    }, res => {
      console.log(res);
      this.setData({playInfo: res.data})
    }, 'json', false, 1)
  },
  getCourseDetailInfo(){
    request('/api/recommendCourse/getPrivateCourseInfo', 'get', {courseId: this.data.courseId}, res => {
      console.log(res);
      this.setData({courseInfo: res.data})
    }, 'json', false, 1)
  },
  videoPlay() {
    this.videoContext.play()
    this.setData({
      pause: false
    })
  },
  videoPause() {
    this.videoContext.pause()
    this.setData({
      pause: true
    })
  },
  toggleState() {
    if (!this.data.canPlay) {
      wx.showToast({
        title: '试看结束, 请购买!',
        icon: 'none'
      })
      return
    }
    let {
      pause
    } = this.data
    if (pause) {
      this.videoPlay()
    } else {
      this.videoPause()
    }
  },

  getTryVideoInfo() {
    let {
      videoInfo
    } = this.data
    request("api/recommendCourse/getVideoPlayInfo", "get", {
      videoPlayId: videoInfo[0] && videoInfo[0].videoPlayId,
      isTry: false
    }, res => {
      this.setData({
        playInfo: res.data
      })
    })
  },
  toPay(e) {
    this.videoContext.pause()
    let {type} = e.currentTarget.dataset
    let {courseInfo} = this.data
    wx.navigateTo({
      url: `/pages/pay/index?isGroup=${type}&courseId=${courseInfo.courseId}`
    })
  },

  formatTime(s) {
    var d = Math.floor(s / (24 * 3600));
    var h = Math.floor((s - d * 24 * 3600) / 3600);
    var m = Math.floor((s - d * 24 * 3600 - h * 3600) / 60);
    var s = s - d * 24 * 3600 - h * 3600 - m * 60;
    return `${h < 10 ? '0' + h : h}:${ m < 10 ? '0' + m : m}:${ s < 10 ? '0' + s : s}`
  },
  countDown(time) {
    var timer = setTimeout(() => {
      clearTimeout(timer)
      let timeStr = this.formatTime(--time)
      this.setData({
        timeStr,
        time
      })
      this.countDown(time)
    }, 1000)
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