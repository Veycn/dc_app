// pages/customize/index.js
const { request } = require("../../utils/request.js")
import { formatTime, countDown, clearTimeOut } from "../../utils/retime.js" 
const  { descourse, desgrcourse }=require("../../utils/course.js")
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainTime: 3600,
    clock: formatTime(3600),
    imgUrls: [
      '/assets/pic/banner_1.png',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    video: [
      {
        "courseCoverUrl": "/assets/pic/banner_1.png",
        "courseId": 1
      },
      {
        "courseCoverUrl": "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
        "courseId": 2
      }
    ],
    descourseList:[],
    desgrcourseList:[],
    hasCustomize:false,
    indicatorDots: true,
    autoplay:true,
    interval: 5000,
    duration: 1000,
    hasMore:true,
    list: []
  },
  courseInfo(e) {
    console.log(e.target.dataset.index)
    wx.navigateTo({
      url: `../../pages/buycourse/index?id=${e.target.dataset.index}`
    })
  },
  publicInfo(e) {
    wx.navigateTo({
      url: `../../pages/publicclass/index?id=${e.target.dataset.index}`
    })
  },
  //加载更多
  loadMore() {
    if (!this.data.hasMore) return;
    request("api/recommendCourse/getPrivateCourseList", "get", res => {
      var newlist=res.data.data
      this.setData({
        descourseList: newList,
        hasMore: flag
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log(descourse)
    this.setData({
      // descourseList: descourse,
      desgrcourseList:desgrcourse
    })
    request("api/recommendCourse/getSimplePublicCourse","get",{},function(res){
       console.log("请求公开课信息:",res)
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    request("api/recommendCourse/getPrivateCourseList", "get", {}, res => {
      console.log(res.data)
      this.setData({
        descourseList: res.data.data
      })
    })
    clearTimeOut()
    if (this.data.remainTime) {
      countDown(this)
    }
    //公开课视频
    // request("api/recommendCourse/getSimplePublicCourse", "get", {}, res => {
    //   console.log("请求公开课简单信息");
    //   console.log(res)
    //   this.setData({
    //     // video:res.data
    //   })
    // })  
    // this.loadMore();
  //   request("api/recommendCourse/getPrivateCourseSimple", "get", {
  //     pageNum: this.data.pageNum,
  //     pageSize: ++this.data.pageSize
  //   }, res => {
  //     console.log("请求定制课程列表");
  //     console.log(res);
  //     this.setData({
  //       list: res.data.list
  //     })
  //   })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.hascustomize)
    if (app.globalData.hascustomize == true) {
      console.log("yes")
      this.setData({
        hasCustomize: true,
      })
    }
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
//  this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})