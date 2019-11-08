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
      // this.onClose()
      
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
