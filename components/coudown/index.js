// components/coudown/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initDuration: {
      type: Number,
      value: 30
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    szimg: "../../assets/icon/clock.png",
    minutes: '30',
    seconds: '00',
    timer: null, // 存储setInterval的ID
    lasttime: 0  // 过去的秒数
  },

  attached() {
    this.runCountDown(this.data.initDuration)
  },
  detached() {
    //在组件实例从页面节点树移除时执行
    this.clearTimer()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init: function () {
      this.setData({
        minutes: '00',
        second: '00'
      })
    },
    clearTimer: function () {
      clearInterval(this.data.timer)
      this.setData({
        timer: null
      })
      this.init()
    },
    countDown: function (duration) {
      if (duration <= 0) {
        this.clearTimer()
        // 计时器停止 提醒用户马上提交测验结果
        return '00:00'
      }
      var seconds = this._format(duration % 60)
      var minutes = Math.floor(duration / 60) < 10 ? `0${Math.floor(duration / 60)}` : Math.floor(duration / 60)
      return `${minutes}:${seconds}`
    },
    _format: function (time) {
      return time >= 10 ? time : `0${time}`
    },
    runCountDown: function (initDuration) {
      var timer = setInterval(() => {
        var totalseconds = initDuration * 60
        var lasttime = this.data.lasttime + 1;
        this.setData({
          lasttime
        })
        totalseconds = totalseconds - this.data.lasttime;
        var str = this.countDown(totalseconds).split(":")
        this.setData({
          minutes: str[0],
          seconds: str[1]
        })
      }, 1000)
      this.setData({
        timer
      })
    }
  }
})
