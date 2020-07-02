// components/allgrades/index.js
// let { allGrades } = require('../../utils/gradesubject.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    allGrades: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    choosed: -1,
    id: -1
  },

  attached() {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseGrade(e) {
     console.log(1111)
      console.log(e)
      let index = e.currentTarget.dataset.index
      let id = e.currentTarget.dataset.idx
      this.setData({
        choosed: index,
        id
      })
      this.triggerEvent("choosedType",{ choosed: this.data.choosed, id: this.data.id })
    }
  }
})
