

//index.js
//获取应用实例
const app = getApp()
const { request } = require('../../utils/request.js')

Page({
  data: {
    motto: '欢迎使用深辅微信小程序!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code: '',
    loginInfo: {},
    canLogin: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let codeP = new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          this.setData({code: res.code})
          resolve(res.code)
        }
      })
    })
   
    let userInfoP = new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          resolve(1)
        }
      })
    })
    Promise.all([codeP, userInfoP]).then(() => {
      this.setData({canLogin: true})
      this.userLogin()
    }).catch(err => wx.showToast({title: '系统异常！'}))
  },
  userLogin: function () {
    const { code } = this.data
    const { nickName, gender, city, province, country, avatarUrl	} = this.data.userInfo
    const { userInfo } = this.data
    wx.setStorage({
      key: 'userInfo',
      data: this.data.userInfo
    })
    wx.request({
      url: "https://www.shenfu.online/sfeduWx/api/userAccount/login",
      method: 'post',
      data: {code, nickName, gender, city, province, country, avatarUrl},
      success: res => {
        console.log(res)
        if(res.statusCode === 200){
          this.setData({loginInfo: res.data})
          wx.showToast({title: '登录成功!', icon: 'none'})
          wx.setStorage({key: 'userToken', data: res.data.data.token})
          if(res.data.data.infoComplete){
            setTimeout(() => {
              wx.switchTab({url: '/pages/detect/index'})
            }, 1500)
          }else{
            setTimeout(() => {
              wx.navigateTo({url: '/pages/index/index'})
            }, 1500)
          }
        }else {
          wx.showToast({title: '登录失败!', icon: 'none'})
        }
      }
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.userLogin()
  }
})
