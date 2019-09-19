// components/allgrades/index.js
let { allGrades } = require('../../utils/gradesubject.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    allGrades: [],
    choosed: -1
  },

  attached() {
    this.getAllGrades()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getAllGrades() {
      this.setData({
        allGrades
      })
    },
    chooseGrade(e) {
      let index = e.currentTarget.dataset.index
      this.setData({
        choosed: index
      })
      this.triggerEvent("choosedType",{ choosed: this.data.choosed })
    }
  }
})
