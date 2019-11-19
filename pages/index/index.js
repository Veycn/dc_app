// pages/cgrade/index.js
const app = getApp()
const { request } = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    currentSubjects: [],
    choosed: -1,
    isChoosed: false,
    getversion: {
      gradeId: -1,
      subjectId: -1,
      textbookId: -1
    },
    allGrades: [],
    allVersion: [],
    isStartStudy: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {}
  },
  startStudy() {
    if (this.data.isStartStudy) {
      console.log(`选中的信息是:`)
      console.log(this.data.getversion)
      app.globalData.requestMsg = this.data.getversion
      wx.switchTab({ url: '../detect/index' })
      request('api/userInfo/addUserInfo', 'post', this.data.getversion, res => {
        console.log(res)
      }, 'form')
    }
  },

  getAllGrades () {
    request('api/userInfo/getGradeList', 'get', {}, res => {
      this.setData({allGrades: res.data})
    })
  },
  getSubjects (id) {
    request('api/userInfo/getSubjectList', 'get', {gradeId: id}, res => {
      this.setData({currentSubjects: res.data})
    })
  },
  getTextBooks (id) {
    request('api/textbook/getTextbookBySubjectId', 'get', {subjectId: id}, res => {
      this.setData({allVersion: res.data})
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllGrades()
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  userLogin: function () {
    const { code } = this.data
    const { nickName, gender, city, province, country, avatarUrl } = this.data.userInfo
    request('api/userAccount/login', 'post', {
      wxUserInfo: {
        code, nickName, gender, city, province, country, avatarUrl
      }
    }, function (res) {
      console.log(res)
    })
  },


  gradeChoosed (e) {
    const id = e.detail.item.id
    this.setData({['getversion.gradeId']: id})
    this.getSubjects(id)
  },
  subjectChoosed (e) {
    const id = e.detail.item.id
    this.setData({['getversion.subjectId']: id})
    this.getTextBooks(id)
  },

  versionChoosed (e) {
    const id = e.detail.item.id
    this.setData({['getversion.textbookId']: id, isStartStudy: true})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.userLogin()
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