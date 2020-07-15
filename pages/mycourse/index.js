// pages/mycourse/index.js
const { request } = require('../../utils/request.js')
import { formatTime, countDown, clearTimeOut } from "../../utils/retime.js" 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainTime: 3600,
    clock: formatTime(3600),
    groupList: [],
    course: null,
    courseList: []
  },


  toClass (id, name, tname, oss) {
    wx.navigateTo({
      url: `/pages/gotoclass/index?courseId=${id}&courseName=${name}&teacherName=${tname}&oss=${oss}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCourseList()
  },

  onBtnTap (e) {
    console.log(1, e)
    let {id, name, tname, oss} = e.currentTarget.dataset
    this.toClass(id, name, tname, oss)
  },

  cancelGroup (id){
    console.log(1111)
    wx.showModal({
      title: '深辅AI友情提示',
      title: '真的要取消团购吗?',
      success:res => {
        if(res.confirm) {
          request('api/userCourse/cancelCourse', 'get', {courseId: id}, res => {
            wx.showToast({
              icon:'none',
              title: '请求成功, 请耐心等待!'
            })
            this.getMyCourseList()
          })
        }
      }
    })
    
  },

  reFound(){
    wx.showToast({
      icon:'none',
      title: '退款中, 请耐心等待!'
    })
  },

  getMyCourseList (){
    request('api/userCourse/getMyCourseList', 'get', {}, res => {
      console.log(res)
      this.setData({courseList: res.data})
    })
  },


  buyCourse () {
    wx.switchTab({url: '/pages/customize/index'})
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
    this.getMyCourseList()
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
    this.getMyCourseList()
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