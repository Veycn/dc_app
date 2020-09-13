// pages/detect/index.js
const {
  request
} = require('../../utils/request.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjectVersion: '数学七年级上人教版',
    chapters: [],
    list: [],
    seclist: [],
    isToastShow: false,
    activeChapter: '',
    activeChapterId: 1,
    hasDetected: false,
    activeIndex: 0,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    background: ['../../assets/pic/pic1.png', '../../assets/pic/pic2.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    this.launch()
    let {
      activeIndex
    } = this.data
    request('api/exam/getChapterList', 'get', {}, res => {
      console.log("first:", res)
      if (res.status == 200) {
        this.setData({
          chapters: res.data
        })
        this.getSections(res.data && res.data[activeIndex].id)
      }
    })
  },
  skip(e) {
    console.log(e.currentTarget.dataset.url)
  },
  skipPage: function(e) {
    let {
      submitstatus
    } = e.currentTarget.dataset
    if (submitstatus === 2) {
      this.toPoints(e)
    } else {
      this.toDetect(e)
    }
  },
  toDetect: function(e) {
    let {
      id,
      section,
      examid
    } = e.currentTarget.dataset
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: `/pages/exam/index?knowledgePointId=${id}&&examId=${examid}`
    })
  },
  toPoints: function(e) {
    let {
      id,
      item
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/points/index?id=${id}&section=${item}`
    })
  },
  changeChapter: function(e) {
    let {
      c,
      i
    } = e.currentTarget.dataset
    this.setData({
      activeChapter: c.substring(0, 3),
      activeChapterId: i,
      isToastShow: false
    })
    this.getSections()
  },
  openToast: function() {
    this.setData({
      isToastShow: true
    })
  },
  closeToast() {
    this.setData({
      isToastShow: false
    })
  },
  getSections(id) {
    request('api/exam/getSectionList', 'get', {
      chapterId: id
    }, res => {
      console.log(res)
      if (res.status === 200) {
        this.setData({
          seclist: res.data
        })
        this.setData({
          list: res.data
        })
      } else {
        wx.showToast({
          title: res.msg | '请求异常！',
          icon: 'none'
        })
      }
    }, 'form')
  },
  chapterTap(e) {
    let {
      item,
      index
    } = e.currentTarget.dataset
    console.log(item, index)
    this.setData({
      activeIndex: index
    })
    this.getSections(item.id)
  },
  onCustomTap(e) {
    wx.reLaunch({
      url: `/pages/customize/index?hascustomize=${e.currentTarget.dataset.hascustomize}`,
    })
  },
  reselect() {
    wx.navigateTo({url: '/pages/index/index'})
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  onShow() {
    try {
      var choosedTitle = wx.getStorageSync('choosedTitle')
      if (choosedTitle) {
        this.setData({
          subjectVersion: choosedTitle
        })
      }
    } catch (e) {
      console.log('从缓存中获取choosedTitle失败！')
    }
    
    let {
      activeIndex
    } = this.data
    request('api/exam/getChapterList', 'get', {}, res => {
      console.log(res)
      if (res.status == 200) {
        this.setData({
          chapters: res.data
        })
        this.getSections(res.data && res.data[activeIndex].id)
      } else {
        wx.navigateTo({
          url: '/pages/login/index'
        })
      }
    })
  },
  /**
   * 加入启动小程序逻辑:
   *  任何时候启动都应该进入此页面, 然后判断用户身份信息
   *  即: 进行一次用户不知道的登录
   *  一是已经完成登录过程(选择年级科目并保存)的用户, 此举可以更新用户身份信息(token)
   *  二是登录如果失败则证明是新用户, 执行跳转至登录页逻辑
   */
  launch() {
    wx.getStorage({
      key: 'userToken',
      success: res => {
        this.login()
      },
      fail: res => { // token 获取失败
        wx.navigateTo({
          url: '/pages/login/index'
        })
      }
    })
  },
  login() {
    wx.getStorage({
      key: 'userInfo',
      success: res => {},
      fail: res => {
        console.log(res)
        wx.navigateTo({
          url: '/pages/login/index'
        })
      }
    })
  }
})