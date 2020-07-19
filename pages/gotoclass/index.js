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
    courseInfo: {},
    historyVideoId: 0,
    historyVideoSecond: 0,
    videoInfoList: null,
    currentTime: 0,
    duration: 0,
    counter: 0,
    activeIndex: 0,
    oss: '',
    touchStartTime: 0,
    touchEndTime: 0,
    lastTapTime: '',
    isStar: false
  },

  update(e) {
    let {
      currentTime,
      duration
    } = e.detail
    let {
      counter
    } = this.data
    this.setData({
      currentTime,
      duration,
      counter: ++counter
    })
    if (counter % 20 == 0) {
      let {
        currentTime,
        courseId
      } = this.data
      request('api/userCourse/saveWatchRecord', 'post', {
        courseId: +courseId,
        videoId: courseId,
        watchSecond: Math.floor(currentTime)
      }, () => {}, "form", true)
    }
  },

  getStarInfo(courseId) {
    request('api/userCourse/judgeCourseIsStar', 'get', {
      courseId: +courseId
    }, res => {
      this.setData({
        isStar: res.data
      })
    }, 'json')
  },
  updateStar(type = 'add') {
    let {
      courseId,
      isStar
    } = this.data
    let {
      courseStars
    } = this.data.courseInfo

    if (type == 'add' && !isStar) {
      this.doUpdate('您已点赞', ++courseStars)
    } else if (type == 'sub' && isStar) {
      this.doUpdate('您已取消赞', --courseStars)
    }
  },

  doUpdate(title, courseStars) {
    let courseId = this.data.courseId
  
    request('api/userCourse/updateCourseStars', 'post', {
      courseId: +courseId,
      courseStars: courseStars
    }, res => {
      this.getStarInfo(+courseId)
       wx.showToast({
        title: title,
        icon: 'success'
      })
      this.setData({
        ['courseInfo.courseStars']: courseStars
      })
    }, 'form')
  },
  stopTouchMove: function () {
    return false;
  },

  toggleClass(e) {
    let {
      item,
      index
    } = e.currentTarget.dataset
    console.log(item)
    this.setData({
      activeIndex: index,
      historyVideoSecond: 0,
      currentTime: 0,
      counter: 0
    })
    this.getVideoPlayInfo()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    this.setData({
      courseId: options.courseId,
      courseName: options.name || '',
      teacherName: options.tname || '',
      oss: options.oss
    })
    this.getPrivateCourseInfo()
    this.getVideoPlayInfo()
    this.getStarInfo(options.courseId)
    // this.getMyVideoList()
    const video = wx.createVideoContext('myVideo')
    this.videoContext = video
  },
  /// 按钮触摸开始触发的事件
  touchStart: function (e) {
    this.touchStartTime = e.timeStamp
  },

  /// 按钮触摸结束触发的事件
  touchEnd: function (e) {
    this.touchEndTime = e.timeStamp
  },
  // 双击
  doubleTap: function (e) {
    var that = this
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if (that.touchEndTime - that.touchStartTime < 350) {
      // 当前点击的时间
      var currentTime = e.timeStamp
      var lastTapTime = that.lastTapTime
      // 更新最后一次点击时间
      that.lastTapTime = currentTime

      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime < 300) {
        console.log("double tap")
        this.updateStar('add')
        wx.showToast({
          title: "您已点赞!",
          icon: 'success'
        })
        // 成功触发双击事件时，取消单击事件的执行
        clearTimeout(that.lastTapTimeoutFunc);
      }
    }
  },
  cancelStar() {
    let isStar = this.data.isStar
    console.log(isStar);
    if(isStar){
      this.updateStar('sub')
    }else {
      this.updateStar('add')
    }
  },
  getVideoPlayInfo() {
    let {
      historyVideoSecond,
      oss
    } = this.data
    request('api/recommendCourse/getVideoPlayInfo', 'get', {
      videoPlayId: oss,
      isTry: false
    }, res => {
      console.log(res)
      this.setData({
        course: res.data
      })
      this.videoContext.seek(historyVideoSecond)
      // this.videoContext.play()
    })
  },

  getPrivateCourseInfo() {
    let {
      courseId
    } = this.data
    request('api/recommendCourse/getPrivateCourseInfo', 'get', {
      courseId
    }, res => {
      this.setData({
        courseInfo: res.data
      })
    })
  },
  //api/userCourse/getMyVideoList 获取定制课程视频列表
  getMyVideoList() {
    let {
      courseId
    } = this.data
    request('api/userCourse/getMyVideoList', 'get', {
      courseId
    }, res => {
      let {
        courseIntro,
        historyVideoId,
        historyVideoSecond,
        videoInfoList
      } = res.data
      this.setData({
        courseIntro,
        historyVideoId,
        historyVideoSecond,
        videoInfoList
      })
      this.getVideoPlayInfo()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearTimeout(this.data.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("推出了");
    clearTimeout(this.data.timer)
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