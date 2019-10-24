// components/answercard/index.js
const { request } = require('../../utils/request.js')
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    submitAnswer: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    btnAnimation: '',
    modalAnimation: ''
  },
  attached() {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 两个动画
    hBtnAnimation() {
      let hideBtnAnimation = wx.createAnimation({
        duration: 300
      })
      hideBtnAnimation.translate(0, 300).opacity(0.3).step()
      this.setData({
        btnAnimation: hideBtnAnimation.export()
      })
    },
    hModalAnimation() {
      let hideModalAnimation = wx.createAnimation({
        duration: 300
      })
      hideModalAnimation.opacity(0).step()
      this.setData({
        modalAnimation: hideModalAnimation.export()
      })
    },
    // 关闭答题卡页面
    onClose() {
      this.hBtnAnimation()
      this.hModalAnimation()
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
