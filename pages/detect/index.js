// pages/detect/index.js
const { request } = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pos: [],
    isToastShow: false,
    chapters: [],
    activeChapter: '',
    activeChapterId: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // request('')
    request('api/textbook/getTextbookByGradeIdAndSubjectId', 'get', {gradeId: 1, subjectId: 1}, res => {
      console.log(res)
    })
    request('api/chapter/getChapterList', 'get', {textbookId: 1}, res => {
      console.log(res)
      this.setData({chapters: res.data, activeChapter: res.data[0].chapter.substring(0, 3)})
    })
    this.getSections()
  },
  
  calculatePos: function () {
    const { list } = this.data, base = 450, rate = 0.017453293, res = []
    let len = list.length, deg = 180 / (len + 1)
    console.log(deg)
    if(len === 1) {return this.setData({pos: [{x: base, y: 0}]})}
    for (var i = 0; i < len; i++) {
      let pos = {}
      pos.x = Math.ceil(base * Math.cos(deg * rate * i - 45))
      pos.y = Math.ceil(base * Math.sin(deg * rate * i - 45))
      res.push(pos)
    }
    console.log(res)
    this.setData({pos: res})
  },
  toDetect: function (e) {
    console.log(e)
    let { id } = e.currentTarget.dataset.type
    wx.navigateTo({url: `/pages/exam/index?id=${id}`})
  },
  changeChapter: function (e) {
    console.log(e)
    let { c, i } = e.currentTarget.dataset
    this.setData({activeChapter: c.substring(0, 3), activeChapterId: i, isToastShow: false})
    this.getSections()
  }, 
  openToast: function () {
    this.setData({isToastShow: true})
  },
  closeToast () {
    this.setData({isToastShow: false})
  },
  getSections () {
    request('api/section/getSectionOfUser', 'get', {chapterId: +this.data.activeChapterId}, res => {
      console.log(res)
      this.setData({list: res.data})
      this.calculatePos()
    }, 'form')
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