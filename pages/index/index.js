// pages/cgrade/index.js
const app = getApp()
// const { allSubjects, allGrades, allVersion } = require('../../utils/gradesubject.js')
const { request } = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    currentSubjects: [],
    choosed: -1,
    isChoosed: {
      grade: true,
      subject: false,
      version: false
    },
    choosedList: {
      grade: '',
      subject: '',
      version: ''
    },
    allSubjects: [], 
    allGrades: [], 
    allVersion: [],
    isStartStudy: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {}
  },

  changeGrade: function (e) {
    let choosed = e.detail.choosed
    this.choosedGrade(choosed)
    let currentSubjects = Object.values(this.data.allSubjects).find((value, index) => {
      return index === choosed ? value : ''
    })
    this.setData({
      currentSubjects,
      choosed
    })
  },
  choosedSubject(e) {
    let choosedSubject = e.detail.choosedSubject
    let ischoosed = this.data.isChoosed.subject
    if (ischoosed) {
      this.setData({
        ['choosedList.subject']: choosedSubject,
        ['isChoosed.version']: true
      })
    }
  },
  choosedGrade(value) {
    let choosedGrade = this.data.allGrades[value]
    this.setData({
      ['choosedList.grade']: choosedGrade,
      ['isChoosed.subject']: true
    })
  },
  choosedVersion(e) {
    let index = e.detail.choosed
    let choosedVersion = allVersion[index]
    let ischoosed = this.data.isChoosed.version
    if (ischoosed) {
      this.setData({
        ['choosedList.version']: choosedVersion,
        isStartStudy: true
      })
    }
  },
  startStudy() {
    if(this.data.isStartStudy) {
      console.log(`选中的信息是:`)
      console.log(this.data.choosedList)
      wx.switchTab({url: '../detect/index',})
    }
  },

  getCourseInfo () {
    request('api/userInfo/getGradeAndSubjectList', 'get', {}, res => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { allSubjects } = this.data
    this.setData({
      currentSubjects: allSubjects['first']
    })
    this.getCourseInfo()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  userLogin: function () {
    const { code } = this.data
    const { nickName, gender, city, province, country, avatarUrl	} = this.data.userInfo
    console.log(code, nickName, gender, city, province, country, avatarUrl)
    request('api/userAccount/login', 'post', {wxUserInfo: {
      code, nickName, gender, city, province, country, avatarUrl
    }}, function (res) {
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