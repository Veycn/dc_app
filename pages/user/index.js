// pages/user/index.js
const app = getApp()
const {
  request
} = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    bookInfo: '',
    isLogin: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code: '',
    loginInfo: {},
    canLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */

  login (){
    this.confirmLogin()
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      },
      fail: res => {
        console.log(res);
      }
    })
  },
  toGrade() {
    if(!this.data.isLogin) return
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  tLogin() {
    wx.showModal({
      title: '提示',
      content: '将要通过登录教师账号前往教师管理界面, 是否前往?',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/tlogin/index',
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onLoad: function (options) {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        console.log(res.data);
        if (Object.keys(res.data).length > 0) {
          this.setData({
            userInfo: res.data,
            isLogin: true
          })
        }
      }
    })
    this.getBookInfo()
  },


  getBookInfo () { 
    if(!this.data.isLogin) return
    request('api/exam/getUserTextbookInfo', 'get', {}, res => {
      console.log(res.data)
      this.setData({
        bookInfo: res.data
      })
    })
  },


  confirmLogin() {
    wx.showModal({
      title:"温馨提示",
      content: "深辅需要您登录以提供更优质服务!",
      confirmText: "确认登录",
      cancelText: "暂不登录",
      success: res => {
        let {cancel, confirm} = res
        if(cancel){
          wx.navigateTo({url: '/pages/user/index'})
          return 
        }
        if(confirm){
          this.handleLogin()
        }
      }
    })
  },

  handleLogin() {
    let codeP = new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          console.log(res);
          this.setData({code: res.code})
          resolve(res.code)
        }
      })
    })
   
    let userInfoP = new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: res => {
          console.log(res);

          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          resolve(1)
        },
        fail: res => {
          console.log(res);

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
      data: userInfo
    })

    console.log(userInfo);
    wx.request({
      url: "https://www.shenfu.online/sfeduWx/api/userAccount/login",
      method: 'post',
      data: {code, nickName, gender, city, province, country, avatarUrl},
      success: res => {
        console.log(res)
        if(res.statusCode === 200 && res.data.status !== -1){
          this.setData({loginInfo: res.data, isLogin: true})
          wx.showToast({title: '登录成功!', icon: 'none'})
          wx.setStorage({key: 'userToken', data:  res.data.data && res.data.data.token || ''})
          // if(res.data.data && res.data.data.infoComplete){
          //   setTimeout(() => {
          //     wx.switchTab({url: '/pages/detect/index'})
          //   }, 1500)
          // }else{
          //   setTimeout(() => {
          //     wx.navigateTo({url: '/pages/index/index'})
          //   }, 1500)
          // }
        }else {
          wx.showToast({title: '登录失败!', icon: 'none'})
          this.confirmLogin()
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
  },

  logout () {
    wx.showToast({title: '您已退出登录!'})
    this.setData({isLogin: false})
    wx.clearStorageSync()
    wx.switchTab({url: '/pages/user/index'})
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
    this.getBookInfo()
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