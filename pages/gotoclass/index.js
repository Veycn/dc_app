// pages/gotoclass/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: [{
        "id": "0",
        "url": "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      },
      {
        "id": "1",
        "url": "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      },
      {
        "id": "2",
        "url": "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      },
      {
        "id": "3",
        "url": "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      },
      {
        "id": "4",
        "url": "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      }
    ],
    autoplay: false,
    current: 0,
    playIndex:0,
    classNum: ["1", "2", "3","4","5"]
  },

  update(e) {
    var detail = e.detail;
    wx.setStorage({
      key: 'homeCurrentTime'+this.data.current,
      data: detail.currentTime,
      success(res) {
        console.log("保存成功")
        console.log(res);
      }
    })
  },

  stopTouchMove: function () {
    return false;
  },
  playVideo(e) {
    var index = e.target.dataset.index;
    this.setData({
      current: index
    })
    var VideoContext = wx.createVideoContext("myVideo" + this.data.current);
    wx.getStorage({
      key: 'homeCurrentTime' + this.data.current,
      success: (res) => {
        console.log("获取缓存myVideo" + this.data.current);
        VideoContext.seek(res.data);
      }
    })
    console.log("myVideo" + this.data.current);
    var videoContextPrev = wx.createVideoContext('myVideo' + this.data.playIndex)
    if (this.data.playIndex != index) {
      videoContextPrev.pause()
    }
    this.setData({
      playIndex: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(res) {
    console.log("进来了");
    var VideoContext = wx.createVideoContext("myVideo0");
    wx.getStorage({
      key: 'homeCurrentTime0',
      success: (res) => {
        console.log("获取缓存myVideo0");
        VideoContext.seek(res.data);
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("推出了");

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})