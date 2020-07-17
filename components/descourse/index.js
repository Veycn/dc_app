// components/descourse/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    section:String,
    courseId:String,
    courseDuration:String,
    teacherName:String,
    teacherImage:String,
    courseImage:String,
    courseStatus: Number,
    groupInfo: null,
    price:Number,
    sales: Number,
    section: String,
    stars:Number,
    videoId:String,
    source: String, // 组件被哪个页面使用
    playId: String,  // 视频播放id
    courseName: String, // 课程名称
    courseIntro: String, // 视频课程介绍,
    isBuy:{
      type:Boolean,
      value:true
    }, // 是否购买过
  },

  attached() {
    if (this.data.groupInfo) {
      let { expirationTime } = this.data.groupInfo
      let deadline = new Date(expirationTime).getTime()
      let curTime = new Date().getTime()
      let dis = Math.floor((deadline - curTime) / 1000)
      let timeStr = this.formatTime(dis)
      this.setData({time: dis, timeStr})
      this.countDown(dis)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    time: 0,
    timeStr: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tobuy(){
      let {courseId,teacherName,source,playId,courseIntro,courseName,videoId} = this.data
      wx.navigateTo({
        url: `/pages/publicinfo/index?id=${courseId}&teacherName=${teacherName}&videoId=${videoId}&source=${source}&playId=${playId}&courseIntro=${courseIntro}&courseName=${courseName}`
      })
    },
    formatTime(s) {
      var d = Math.floor(s / (24 * 3600));
      var h = Math.floor((s - d * 24 * 3600) / 3600);
      var m = Math.floor((s - d * 24 * 3600 - h * 3600) / 60);
      var s = s - d * 24 * 3600 - h * 3600 - m * 60;
      return `${h < 10 ? '0' + h : h}:${ m < 10 ? '0' + m : m}:${ s < 10 ? '0' + s : s}`
    },
    countDown(time){
      var timer = setTimeout(() => {
        clearTimeout(timer)
        let timeStr = this.formatTime(--time)
        this.setData({timeStr, time})
        this.countDown(time)
      }, 1000)
    }
  }
})