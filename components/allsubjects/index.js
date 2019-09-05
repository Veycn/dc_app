// components/allsubjects/index.js
let { allSubjects } = require('../../utils/gradesubject.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentSubjects: {
      type: Array,
      value: []
    },
    isTap: {
      type: Boolean,
      value: false
    }
  },
  

  /**
   * 组件的初始数据
   */
  data: {
    allSubjects: [],
    choosed: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseSubject(e) {
      let index = e.currentTarget.dataset.index
      if (this.data.isTap) {
        this.setData({
          choosed: index
        })
      }
      let choosedSubject = this.data.currentSubjects[this.data.choosed]
      this.triggerEvent('choosedSubject', { choosedSubject })
    }
  }
})
