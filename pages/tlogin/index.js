// pages/tlogin/index.js
const {request} = require("../../utils/request")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '1791576240@qq.com',
    password: '105760'
  },

  onChange (e) {
    let val = e.detail.value
    let type = e.currentTarget.dataset.type
    if(type === 'acc'){
      this.setData({account: val})
    }else if(type === 'pas') {
      this.setData({password: val})
    }
  },

  teacherLogin () {
    let {account, password} = this.data
    if(!account || !password){

    }else{      
      request('/api/teacherAccount/login', 'post', {email: account, psw: password}, res => {
        console.log(res);
        if(res.status === 200){
          wx.setStorageSync('teacherToken', res.data.token)
          wx.navigateTo({url: '/pages/income/index'})
        }
      }, 'json', false, 1)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('teacherToken', "")
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