// pages/buycourse/index.js
const {request}=require("../../utils/request.js")
import {formatTime,countDown,clearTimeOut} from "../../utils/retime.js" 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    remainTime:3600,
    clock:formatTime(3600),
    courseId:Number
  },
  onetoPay(){
wx.navigateTo({
  url: `/pages/pay/index?id=${this.data.courseId}&&isGroup=${0}`
})
  },
  manytoPay(){
    wx.navigateTo({
      url: `/pages/pay/index?id=${this.data.courseId}&&isGroup=${1}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      console.log(options)
      this.setData({
        courseId:options.id
      })
    request("api/recommendCourse/getPrivateCourseInfo", "get", { courseId:options.id},
    res=>{
      console.log(res.data)
         var arr=[]
         arr.push(res.data)
       this.setData({
         list:arr
       })
    })
    request("api/recommendCourse/getPublicVideoList", "get", { courseId: options.id},
    res=>{
      console.log(res.data)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    clearTimeOut()
    if (this.data.remainTime) {
      countDown(this)
    }

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