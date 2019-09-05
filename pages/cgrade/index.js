// pages/cgrade/index.js
let { allSubjects, allGrades, allVersion } = require('../../utils/gradesubject.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    isStartStudy: false
  },

  changeGrade: function (e) {
    let choosed = e.detail.choosed
    this.choosedGrade(choosed)
    let currentSubjects = Object.values(allSubjects).find((value, index) => {
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
    let choosedGrade = allGrades[value]
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentSubjects: allSubjects['first']
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