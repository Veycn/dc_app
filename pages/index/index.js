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


  choosedSubject(e) {
    console.log(e)
    let choosedSubjectId = e.detail.id
    this.setData({
      ['getversion.subjectId']: choosedSubjectId
    })
    request('api/textbook/getTextbookByGradeIdAndSubjectId', 'get', { gradeId: this.data.getversion.gradeId, subjectId: this.data.getversion.subjectId }, res => {
      this.setData({
        allVersion: res.data
      })
    })

  },
  choosedGrade(value) {
    console.log(value.detail.id)
    console.log(value.detail.choosed)
    this.setData({
      isChoosed: true,
      choosed: value.detail.choosed,
      ['getversion.gradeId']: value.detail.id
    })
  },
  choosedVersion(e) {
    this.setData({
      ['getversion.textbookId']: e.detail.id,
      isStartStudy: true
    })
  },
  startStudy() {
    if (this.data.isStartStudy) {
      console.log(`选中的信息是:`)
      console.log(this.data.getversion)
      app.globalData.requestMsg = this.data.getversion
      wx.switchTab({ url: '../detect/index' })
    }
  },

  getCourseInfo() {
    request('api/userInfo/getGradeAndSubjectList', 'get', {}, res => {
      console.log(res)
      this.setData({
        allGrades: res.data.gradeList,
        currentSubjects: res.data.subjectList
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourseInfo()
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  userLogin: function () {
    const { code } = this.data
    const { nickName, gender, city, province, country, avatarUrl } = this.data.userInfo
    console.log(code, nickName, gender, city, province, country, avatarUrl)
    request('api/userAccount/login', 'post', {
      wxUserInfo: {
        code, nickName, gender, city, province, country, avatarUrl
      }
    }, function (res) {
      console.log(res)
    })
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