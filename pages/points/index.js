const {
  request
} = require('../../utils/request.js')
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
    section: '',
    activeChapter: '',
    activeChapterId: 1,
    hasDetected: false,
    chapterId: null,
    resList: [],
    listLength: 0,
    loopIndex: 0,
    times: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      activeChapterId: options.id,
      section: options.section.substring(0, 7)+'...'
    })
    this.getPoints()
  },
  calculatePos: function () {
    const {
      list
    } = this.data, base = 450, rate = 0.017453293, res = []
    let len = list.length,
      deg = 180 / (len + 1)
    if (len === 1) {
      return this.setData({
        pos: [{
          x: base,
          y: 0
        }]
      })
    }
    for (var i = 0; i < len; i++) {
      let pos = {}
      pos.x = Math.ceil(base * Math.cos(deg * rate * i - 45))
      pos.y = Math.ceil(base * Math.sin(deg * rate * i - 45))
      res.push(pos)
    }
    this.setData({
      pos: res
    })
  },
  toDetect: function (e) {
    let {
      id
    } = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/exam/index?id=${id}&type=knowledgePointId`
    })
  },
  toPoints: function (e) {
    let {
      id
    } = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/exam/index?id=${id}`
    })
  },
  getPoints() {
    request('api/exam/getSectionExamOfUser', 'get', {
      sectionId: this.data.activeChapterId
    }, res => {
      console.log(res.data)
      let {
        knowledgeList
      } = res.data
      let listLength = knowledgeList.length
      let times = Math.floor(listLength / 6)
      this.setData({
        resList: knowledgeList,
        listLength,
        times
      })
      this.splitList()
    })
  },
  splitList() {
    //拆分知识点列表
    let {resList, loopIndex, listLength, times} = this.data
    let res = []
    for (var i = 0; i <= times; i++){
      res.push(resList.slice(i*6, (i+1)*6))
    }
    this.setData({showList: res, list: res[0]})
    this.calculatePos()
  },
  changePoints () {
    let {loopIndex, times, showList} = this.data
    if(loopIndex < times){
      loopIndex++
    }else{
      loopIndex = 0
    }
    this.setData({
      loopIndex,
      list: showList[loopIndex]
    })
  },
  onCustomTap(e) {
    wx.reLaunch({
      url: `/pages/customize/index?hascustomize=true`,
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