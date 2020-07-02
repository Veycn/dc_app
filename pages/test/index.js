// pages/test/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  rpxTopx() {
    var app = getApp()
    const device = wx.getSystemInfoSync()
    const width = device.windowWidth   //设备屏幕宽度
    const xs = width / 750
    return xs
  },
  add() {
    console.log(this.data.num)
    const temp = this.data.num
    this.setData({
      num: temp + 0.1
    })
    this.show()
  },
  minus() {
    const temp = this.data.num
    this.setData({
      num: temp - 0.1
    })
    this.show()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    

  },
  evenCompEllipse(context, x, y, a, b) {
    var step = (a > b) ? 1 / a : 1 / b
    context.beginPath()
    context.moveTo(x + a, y) //从椭圆的左端点开始绘制
    for (var i = 0; i < 2 * Math.PI; i += step) {
      //参数方程为x = a * cos(i), y = b * sin(i)，
      //参数为i，表示度数（弧度）
      context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));

    }
    context.closePath()
    context.fill()
    context.draw()
  },
  show() {
    var context = wx.createCanvasContext('myCanvas')
    context.lineWidth = 1
    context.setStrokeStyle = "lightblue"
    context.fillStyle = "lightblue"
    const xs = this.rpxTopx()
    const r = 50 * xs     // 将 rpx 转换为 px
    const x = r
    const l = 2 * r * Number(this.data.num.toFixed(2))
    const y = Number((r + Math.sqrt(r * r - l * l / 4)).toFixed(2))
    const s = Number((2 * (r - Math.sqrt(r * r - l * l / 4))).toFixed(2))
    console.log(l, s)
    this.evenCompEllipse(context, x, y, l, s)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.show()
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