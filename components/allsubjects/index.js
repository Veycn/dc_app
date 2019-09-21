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
    choosed: -1,
    id: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    choosedSubject(e) {
      let index = e.currentTarget.dataset.index
      let id = e.currentTarget.dataset.idx
      console.log(index, id)
      if (this.data.isTap) {
        this.setData({
          choosed: index,
          id
        })
        this.triggerEvent('choosedSubject', { id:this.data.id })
      }
    }
  }
})
