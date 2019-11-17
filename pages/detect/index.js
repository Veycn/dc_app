// pages/detect/index.js
const { request } = require('../../utils/request.js')
const app = getApp()

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
    activeChapterId: 1,
    hasDetected: false,
    activeIndex: 0,
    seclist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData)
    // if(options.hasDetected) {
    //   this.setData({hasDetected: options.hasDetected})
    // }
    const { gradeId, subjectId, textbookId } = app.globalData.requestMsg
    request('api/chapter/getChapterList', 'get', { textbookId: 12 }, res => {
      console.log(res)
      this.setData({ 
        chapters: res.data, 
        activeChapter: res.data[0].chapter && res.data[0].chapter.substring(0, 3),
        activeChapterId: res.data[0].id
      })
      this.getSections(res.data[0].id)
    })
    
  },

  calculatePos: function () {
    const { list } = this.data, base = 450, rate = 0.017453293, res = []
    let len = list.length, deg = 180 / (len + 1)
    if (len === 1) { return this.setData({ pos: [{ x: base, y: 0 }] }) }
    for (var i = 0; i < len; i++) {
      let pos = {}
      pos.x = Math.ceil(base * Math.cos(deg * rate * i - 45))
      pos.y = Math.ceil(base * Math.sin(deg * rate * i - 45))
      res.push(pos)
    }
    this.setData({ pos: res })
  },
  toDetect: function (e) {
    console.log(e)
    let { id, section } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/exam/index?id=${id}` })
  },
  toPoints: function(e){
    let { id, section } = e.currentTarget.dataset.type
    console.log(e)
    wx.navigateTo({ url: `/pages/points/index?id=${id}&section=${section}` })
  },

  changeChapter: function (e) {
    let { c, i } = e.currentTarget.dataset
    this.setData({ activeChapter: c.substring(0, 3), activeChapterId: i, isToastShow: false })
    this.getSections()
  },
  openToast: function () {
    this.setData({ isToastShow: true })
  },
  closeToast() {
    this.setData({ isToastShow: false })
  },
  getSections(id) {
    request('api/section/getSectionOfUser', 'get', { chapterId: id }, res => {
      console.log(res.data)
      this.setData({seclist: res.data})
      if(res.status === 200){
        this.setData({ list: res.data })
        this.calculatePos()
        this.hasDetected()
      }else {
        wx.showToast({title: res.msg | '请求异常！', icon: 'none'})
      }
      
    }, 'form')
  },
  hasDetected () {
    const { list } = this.data;
    for(var i = 0; i < list.length; i++){
      if(list[i].submitStatus > 0){
        return this.setData({hasDetected: true})
      }
    }
  },

  chapterTap (e) {
    let { item, index} = e.currentTarget.dataset
    console.log(item,index)
    this.setData({activeIndex: index})
    this.getSections(item.id)
  },
  onCustomTap (e) {
    wx.reLaunch({
      url: `/pages/customize/index?hascustomize=${e.currentTarget.dataset.hascustomize}`,
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