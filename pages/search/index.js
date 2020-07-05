// pages/search/index.js
const {request} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
   courseList:['一元','一元一次','一元一次方程'],
   hasList:false,
   storageFlag:false,
   storageList:[],
   value:''
  },
  keywords(e){
     this.setData({
       value:e.detail.value
     })
     this.getSearchCourse(e.detail.value)
  },
  getSearchCourse(value){
    request('api/recommendCourse/searchCourse',"get",{
      courseName:value
     },res=>{
       // 判断data length 
       this.setData({
         hasList: true,
         storageFlag:false
       })
     })
  },
  search(){
    if(this.data.value){
      let flag = true
   this.data.storageList.forEach(item=>{
           if(item == this.data.value){
              return flag = false
           }else {
             return flag = true
           }
      })
      console.log(flag)
      if(flag){
        this.data.storageList.push(this.data.value)
        wx.setStorage({
          data:  this.data.storageList,
          key: 'searchList',
          success:()=>{
            console.log('保存成公')
          }
        })
      }
    }
  },
  showCourse(){

    this.setData({
      hasList:false
    })
  },
  clearHistory(){
    wx.removeStorage({
      key: 'searchList',
      success:()=>{
        this.setData({
          storageFlag:false,
          storageList:[]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'searchList',
      success:(res)=>{
        if(res.data.length!==0){
          this.setData({
            storageFlag:true,
            storageList:res.data
          })
        }
      }
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