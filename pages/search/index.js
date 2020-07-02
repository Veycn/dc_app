// pages/search/index.js
const {request} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
   courseList:['一元','一元一次','一元一次方程'],
   hasList:false
  },
  keywords(e){
   let { value } = e.detail
   request('api/recommendCourse/searchCourse',"get",{
    courseName:value
   },res=>{
     // 判断data length 
     this.setData({
       hasList: true
     })
   })
  },
  showCourse(){
    this.setData({
      hasList:false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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