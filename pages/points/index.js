const {
  request
} = require('../../utils/request.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sectionName: '',
    sectionId: -1,
    renderList: null,
    examId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let {
      examId
    } = options
    // this.setData({
    //   sectionId: id,
    //   sectionName: section
    // })
    this.getList(examId)
  },

  getList(id) {
    request('api/exam/getSectionExamOfUser', 'get', {
      examId: id
    }, res => {
      console.log(res)
      let examId = res.data.examId
      this.setData({ examId })
      let renderList = res.data.knowledgeList
      let arr = [];
      for (let i = 0; i < renderList.length; i++) {
        let temp = new Object()
        if (renderList[i].ratio === 0) {
          temp.text = '未完成';
          temp.level = 0;
          temp.color = '#ececec'
        } else if (renderList[i].ratio < 0.4) {
          temp.text = '已了解/未掌握'
          temp.level = 1
          temp.color = '#afffeb'

        } else if (renderList[i].ratio < 0.7) {
          temp.text = '已理解/未掌握'
          temp.level = 2
          temp.color = '#55ffb1'
        } else {
          temp.text = '已掌握'
          temp.level = 3
          temp.color = '#15EC89'
        }
        renderList[i] = {...temp, ...renderList[i]}
        arr.push(temp)
      }
      this.setData({renderList})
    })
  },

  toQuestion(e) {
    console.log(e)
    let {id} = e.currentTarget.dataset
    let {examId, sectionId, sectionName} = this.data
    wx.navigateTo({ url: `/pages/exam/index?sectionId=${sectionId}&sectionName=${sectionName}&examId=${examId}&knowledgePointId=${id}&isKnowledge=${true}`})
  },

  customize () {
    app.globalData.hascustomize=true
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