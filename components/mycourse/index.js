import { countDown } from "../../utils/retime"

// components/mycourse/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    courseCoverUrl: String,
    courseDuration: Number,
    courseId: Number,
    courseName: String,
    courseSales: Number,
    courseStars: Number,
    knowledgePoint: String,
    learningProcess: String,
    teacherAvatar: String,
    teacherName: String,
    ossVedioId: String
  },

  attached() {
    // console.log(this.data)
    if (this.data.groupInfo) {
      let {
        expirationTime
      } = this.data.groupInfo
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
    onTap() {
      this.triggerEvent('btnTap')
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