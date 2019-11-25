

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
      // if (app.globalData.userInfo) {
      //   this.setData({
      //     userInfo: app.globalData.userInfo,
      //     hasUserInfo: true
      //   })
      //   resolve(1)
      // } else if (this.data.canIUse) {
      //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      //   // 所以此处加入 callback 以防止这种情况
      //   app.userInfoReadyCallback = res => {
      //     this.setData({
      //       userInfo: res.userInfo,
      //       hasUserInfo: true
      //     })
      //     resolve(1)
      //   }
      // } else {
      //   // 在没有 open-type=getUserInfo 版本的兼容处理
      //   wx.getUserInfo({
      //     success: res => {
      //       app.globalData.userInfo = res.userInfo
      //       this.setData({
      //         userInfo: res.userInfo,
      //         hasUserInfo: true
      //       })
      //       resolve(1)
      //     }
      //   })
      // }
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
    Promise.all([codeP, userInfoP]).then((res) => {
      console.log(res)
      this.setData({canLogin: true})
    }).catch(err => {
      wx.showToast({
        title: '系统异常！'
      })
    })
  },
  userLogin: function () {
    const { code } = this.data
    const { nickName, gender, city, province, country, avatarUrl	} = this.data.userInfo
    wx.request({
      url: "https://www.shenfu.online/sfeduWx/api/userAccount/login",
      method: 'POST',
      data: {code, nickName, gender, city, province, country, avatarUrl},
      success: res => {
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
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    if(this.data.canLogin){
      this.userLogin()
    }
  }
})
