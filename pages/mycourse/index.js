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
    groupList: [{
      courseId:1,
      num: 18,
      name: "马云",
      tx: "/assets/icon/pic.png",
      edi: "必修一",
      retime: "24:00:00",
      title: "一元一次方程解法与一元二次方程解法的比较分析",
      groupneed: 0,
      point: "2.1指数函数"
    }, {
      courseId: 2,
      num: 10,
      name: "俞敏洪",
      tx: "/assets/icon/pic.png",
      edi: "必修一",
      retime: "07:00:00",
      title: "集合的交，并，补集",
      groupneed: 0,
      point: "2.1指数函数"
    }],
    myList: [{
      courseId:3,
      num: 12,
      name: "马云",
      tx: "/assets/icon/pic.png",
      edi: "必修一",
      title: "一元一次方程解法详情",
      point: "2.1指数函数"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    clearTimeOut()
    if (this.data.remainTime) {
      countDown(this)
    }
    request('api/userCourse/getMyCourseList', 'get', {}, res => {
      console.log(res)
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