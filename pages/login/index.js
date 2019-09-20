

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
    loginInfo: {}
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
          console.log(res)
          resolve(1)
        }
      })
    })
   
    let userInfoP = new Promise((resolve, reject) => {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
        resolve(1)
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          resolve(1)
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
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
      }
    })
    Promise.all([codeP, userInfoP]).then(() => {
      this.userLogin()
    })
  },
  userLogin: function () {
    const { code } = this.data
    const { nickName, gender, city, province, country, avatarUrl	} = this.data.userInfo
    // request('api/userAccount/login', 'post', {
    //   code, nickName, gender, city, province, country, avatarUrl
    // }, (res) => {
    //   console.log(res)
    //   if(res.status === 200){
    //     wx.setStorage({
    //       key: 'userToken',
    //       data: res.data.token
    //     })
    //     this.setData({loginInfo: res.data})
    //   }
    //   setTimeout(() => {
    //     wx.navigateTo({url: '/pages/index/index'})
    //   }, 1500)
    // })
    wx.request({
      url: "https://www.shenfu.online/sfeduWx/api/userAccount/login",
      method: 'POST',
      data: {code, nickName, gender, city, province, country, avatarUrl},
      success: res => {
        console.log(res)
        if(res.statusCode === 200){
          wx.showToast({title: '登录成功!', icon: 'none'})
          wx.setStorage({ 
            key: 'userToken',
            data: res.data.data.token
          })
          this.setData({loginInfo: res.data})
          setTimeout(() => {
            wx.navigateTo({url: '/pages/index/index'})
          }, 1500)
        }else {
          wx.showToast({title: '登录失败!', icon: 'none'})
        }
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    
  }
})
