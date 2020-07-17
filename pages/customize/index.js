// pages/customize/index.js
const { request } = require("../../utils/request.js")
import { formatTime, countDown, clearTimeOut } from "../../utils/retime.js" 
// const  { descourse, desgrcourse }=require("../../utils/course.js")
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainTime: 3600,
    clock: formatTime(3600),
    descourseList:[],
    desgrcourseList:[],
    hasCustomize: true,
    indicatorDots: true,
    autoplay:true,
    interval: 5000,
    duration: 1000,
    hasMore:true,
    list: [],
    imgUrls: [
      'https://www.shenfu.online/pic/banner2.jpg',
      'https://www.shenfu.online/pic/b2.jpg',
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

  jumpPage (e) {
    let {idx} = e.currentTarget.dataset
    if(idx == 1){ //反馈
      wx.navigateTo({url: '/pages/feedback/index'})
    }else if(idx == 0){
      // 公开课
      wx.navigateTo({url: '/pages/publicclass/index'})
    }
  },
  toDetect () {
    wx.switchTab({url:'/pages/detect/index'})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getList()
    // this.setData({
    //   descourseList: descourse,
    //   desgrcourseList:desgrcourse
    // })
    wx.showToast({
      title: '正在获取您的检测信息, 请稍后...'
    })
    request("api/recommendCourse/getSimplePublicCourse","get",{},function(res){
       console.log("请求公开课信息:",res)
    })

  },

  getList(){
    request("api/recommendCourse/getPrivateCourseList", "get", {}, res => {
      let {data} = res
      console.log(res)
      if(data && data.length>0){
        this.setData({
          hasCustomize: true
        })
      }else {
        this.setData({
          hasCustomize: false
        })
      }
      this.setData({
        descourseList: data
      })
    })
  },
  toSearch(){
   wx.navigateTo({
     url: '/pages/search/index'
   })
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
    this.getList()
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