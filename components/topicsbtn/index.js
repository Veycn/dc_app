// components/topicsbtn/index.js
const { request } = require('../../utils/request.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scantronList: {
      type: Array,
      value: []
    },
    isFinshed: {
      type: Array,
      value: []
    },
    submitAnswer: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // currentIndex: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    rediretTopic(e) {
      let currentIndex = e.currentTarget.dataset.index
      this.triggerEvent('rediretTopic', { currentIndex })
    },
    onClose() {
      setTimeout(() => {
        this.triggerEvent('hideAnswerCard')
      }, 300)
    },
    // 提交并查看结果
    watchResult() {
      this.onClose()
      console.log(this.data.submitAnswer)
      request('/api/exam/dealExam', 'post', this.data.submitAnswer, res => {
        console.log(res)
        wx.reLaunch({
          url: `/pages/detect/index?hasDetected=true`
        })
      })
      wx.request({
        url: '/api/exam/dealExam',
        method: 'post',
        
      })
    }
  }
})
