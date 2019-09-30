// pages/customize/index.js
const {
  request
} = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    video: [
      {
        "courseCoverUrl": "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
        "courseId": 1
      },
      {
        "courseCoverUrl": "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
        "courseId": 2
      }
    ],
    hasCustomize:false,
    customize:true,
    indicatorDots: true,
    autoplay:true,
    interval: 5000,
    duration: 1000,
     pageNum: 1,
    pageSize: 5,
    list: [{
      "courseDuration": 0,
      "courseId": 1,
      "courseName": "一次一次方程的解法于一元二次方程解法的比较分析",
      "coursePrice": "6.6",
      "courseType": 0,
      "knowledgePoint": "2.1指数函数",
      "teacherAvatar": "/assets/icon/pic.png",
      "teacherName": "马云"
    },
    {
      "courseDuration": 0,
      "courseId": 2,
      "courseName": "一次一次方程的解法与集合的交并补集",
      "coursePrice": "9.9",
      "courseType": 0,
      "knowledgePoint": "3.1指数函数",
      "teacherAvatar": "/assets/icon/pic.png",
      "teacherName": "雨果"
    }
    ]
  },
  courseInfo(e) {
    console.log(e.target.dataset.index)
    wx.navigateTo({
      url: `../../pages/buycourse/index?id=${e.target.dataset.index}`
    })
  },
  publicInfo(e) {
    wx.navigateTo({
      url: `../../pages/publicinfo/index?id=${e.target.dataset.index}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log("111111")
    if (options.hascustomize=="true"){
      console.log("yes")
      this.setData({
        hasCustomize:true,
        customize:false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //公开课视频
    request("api/recommendCourse/getSimplePublicCourse", "get", {}, res => {
      console.log("请求公开课简单信息");
      console.log(res)
      this.setData({
        // video:res.data
      })
    })
    request("api/recommendCourse/getPrivateCourseSimple", "get", {
      pageNum: this.data.pageNum,
      pageSize: ++this.data.pageSize
    }, res => {
      console.log("请求定制课程列表");
      console.log(res);
      this.setData({
        list: res.data.list
      })
    })
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