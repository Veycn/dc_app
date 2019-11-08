// components/coudown/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initDuration: {
      type: Number,
      value: 10
    },
    isSubmit: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    szimg: "../../assets/icon/clock.png",
    minutes: '30',
    seconds: '00',
    timer: null, // 倒计时 器
    forwardtimer: null, //正向计时器
    lasttime: 0,  // 过去的秒数
    forwardtime: 0, // 正向计时
    sinTime: 0.5,   // 预估每道题目所花的时间
    spendTime: 0,
    timeWay: 0
  },

  attached() {
    this.runCountDown(this.data.initDuration)
  },
  detached() {
    //在组件实例从页面节点树移除时执行
    this.clearTimer()
    this.clearForTimer()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 计算做题花费的总时间
    spendAllTime: function() {
      this.clearForTimer()
      this.clearTimer()
      this.triggerEvent("spendAllTime", {
        spendTime: this.data.spendTime,
        timeWay: this.data.timeWay
      })
    },
    init: function () {
      this.setData({
        minutes: '00',
        second: '00'
      })
    },
    // 清除倒计时的计时器
    clearTimer: function () {
      clearInterval(this.data.timer)
      this.setData({
        timer: null
      })
      this.init()
    },
    // 清除正向计时器
    clearForTimer: function () {
      clearInterval(this.data.forwardtimer)
      this.setData({
        forwardtimer: null
      })
      this.init()
    },
    countDown: function (duration) {
      if (duration <= 0) {
        this.clearTimer()
        var forwardtimer = setInterval(() => {
          var forwardtime = this.data.forwardtime + 1;
          this.setData({
            forwardtime,
            spendTime: forwardtime,
            timeWay: 1
          })
          console.log(forwardtime)
          var str = this.conversion(forwardtime).split(":")
          this.setData({
            minutes: str[0],
            seconds: str[1]
          })
          if(this.data.isSubmit) {
            this.spendAllTime()
          }
        }, 1000)
        this.setData({
          forwardtimer
        })
      }
      return this.conversion(duration)
      
    },
    conversion: function(time) {
      var seconds = this._format(time % 60)
      var minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60)
      return `${minutes}:${seconds}`
    },
    _format: function (time) {
      return time >= 10 ? time : `0${time}`
    },
    runCountDown: function (initDuration) {
      var timer = setInterval(() => {
        console.log(initDuration)
        var totalseconds = initDuration * 60 * this.data.sinTime;
        var lasttime = this.data.spendTime + 1;
        this.setData({
          spendTime: lasttime
        })
        totalseconds = totalseconds - this.data.spendTime;
        var str = this.countDown(totalseconds).split(":")
        this.setData({
          minutes: str[0],
          seconds: str[1]
        })
        // 判断是否提交，如果提交计算做题花费总时间
        if(this.data.isSubmit) {
          this.spendAllTime()
        }
      }, 1000)
      this.setData({
        timer
      })
    }
  }
})
