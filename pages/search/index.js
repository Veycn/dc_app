// pages/search/index.js
const {
  request
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: null,
    course: [],
    hasList: false,
    storageFlag: false,
    storageList: [],
    value: '',
    searchFlag:false,
  },
  keywords(e) {
    this.setData({
      value: e.detail.value
    })
    if (e.detail.value === ''){
      this.setData({
        hasList:false
      })
    }else{
      this.getSearchCourse(e.detail.value)
    }
  },
  getSearchCourse(value) {
    request('api/recommendCourse/searchCourse', "get", {
      courseName: value
    }, res => {
      // 判断data.length 
      if (res.data.length > 0) {
        this.setData({
          hasList: true,
          storageFlag: false,
          courseList: res.data,
          searchFlag:false
        })
      }
    })
  },
  search() {
    // 有相关关键词直接显示课程卡片
    if (this.data.value) {
      request('api/recommendCourse/searchCourse', "get", {
        courseName: this.data.value
      }, res => {
        // 判断data.length 
        if (res.data.length > 0) {
          this.setData({
            hasList: false,
            storageFlag: false,
            course: res.data
          })
        }else {
          this.setData({
            searchFlag:true
          })
        }
      })
          let flag = true
          this.data.storageList.forEach(item => {
            if (item == this.data.value) {
              return flag = false
            }
          })
          if (flag) {
            wx.getStorage({
              key: 'searchList',
              success:res=>{
                if(res.data.length === 6){
                   res.data.pop()
                   console.log(res.data)
                }
                  res.data.unshift(this.data.value)
                  wx.setStorage({
                    data: res.data,
                    key: 'searchList',
                    success: () => {
                      console.log('保存成功')
                    }
                  })
              },
              fail:()=>{
                let searchList = []
                searchList.push(this.data.value)
                wx.setStorage({
                  data: searchList,
                  key: 'searchList',
                  success: () => {
                    console.log('保存成功')
                  }
                })
              }
            })
          }
    }
  },
  showCourse(e) {
    let courseName = e.target.dataset.item
    request('api/recommendCourse/searchCourse', "get", {
      courseName: courseName
    }, res => {
      // 判断data.length 
      if (res.data.length > 0) {
        this.setData({
          hasList: false,
          storageFlag: false,
          course: res.data,
          searchFlag:false
        })
      }else {
        this.setData({
          searchFlag:true
        })
      }
    })
          let flag = true
          this.data.storageList.forEach(item => {
            if (item == courseName) {
              return flag = false
            }
          })
          if (flag) {
            wx.getStorage({
              key: 'searchList',
              success:res=>{
                if(res.data.length === 6){
                   res.data.pop()
                   console.log(res.data)
                }
                  res.data.unshift(courseName)
                  wx.setStorage({
                    data: res.data,
                    key: 'searchList',
                    success: () => {
                      console.log('保存成功')
                    }
                  })
              },
              fail:()=>{
                let searchList = []
                searchList.push(courseName)
                wx.setStorage({
                  data: searchList,
                  key: 'searchList',
                  success: () => {
                    console.log('保存成功')
                  }
                })
              }
            })
          }
  },
  clearHistory() {
    wx.removeStorage({
      key: 'searchList',
      success: () => {
        this.setData({
          storageFlag: false,
          storageList: []
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
      success: (res) => {
        if (res.data.length !== 0) {
          this.setData({
            storageFlag: true,
            storageList: res.data
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
    // wx.getStorage({
    //   key: 'searchList',
    //   success: (res) => {
    //     if (res.data.length !== 0) {
    //       this.setData({
    //         storageFlag: true,
    //         storageList: res.data
    //       })
    //     }
    //   }
    // })
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