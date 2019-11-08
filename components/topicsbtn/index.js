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
    },
    isK: {
      type: Boolean,
      value: false
    },
    spendTime: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // currentIndex: -1
    isDone: true
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
      let data = this.data.submitAnswer, url = ''
      console.log(this.data.isK)
      if (this.data.isK) {
        url = 'https://www.shenfu.online/sfeduWx/api/exam/dealKnowledgeExam'
      } else {
        url = 'https://www.shenfu.online/sfeduWx/api/exam/dealSectionExam'
      }
      wx.getStorage({
        key: 'userToken',
        success: res => {
          console.log(res)
          let header = {
            'content-type': 'application/json',
            token: res.data
          }
          wx.request({
            url,
            method: 'post',
            header,
            data: data,
            success: res => {
              console.log(res)
              wx.reLaunch({
                url: `/pages/detect/index?hasDetected=true`
              })
            }
          })
        }
      })


      let tempArr = this.data.submitAnswer.examItemTempList
      for (let i = 0; i < tempArr.length; ++i) {
        if (tempArr[i].userAnswer === 0) {
          console.log('还没做完，不能提交哦')
          this.setData({
            isDone: false
          })
          break
        }
      }
      if (this.data.isDone) {
        this.triggerEvent("isSubmit")
      }
    }
  }
})
