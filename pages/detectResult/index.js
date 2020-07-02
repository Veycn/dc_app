// pages/detectResult/index.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList: ['本次测试题目数', '本次测试正确率', '本次测试正确题目', '花费时间'],
    resultArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.data)
    let arr = this.data.resultArr
    let { ratio, rightNum, useTime, submitNum } = JSON.parse(options.data)

    arr.push(`${submitNum}题`)
    arr.push(`${isNaN(ratio) ? 0 : ratio.toFixed(2) * 100}%`)
    arr.push(`${rightNum}题`)
    let m = Math.floor(useTime / 60)
    let s = useTime % 60
    arr.push(`${m}分${s}秒`)
    this.setData({
      resultArr: arr
    })
    console.log(arr)
  },

  exit () {
    wx.switchTab({url: '/pages/detect/index'})
  },
  toCourse () {
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