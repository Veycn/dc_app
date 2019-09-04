// components/allversion/index.js
let { allVersion } = require('../../utils/gradesubject.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isTap: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    allVersion: [],
    choosed: -1
  },
  attached() {
    this.getAllVersion()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getAllVersion() {
      this.setData({
        allVersion
      })
    },
    chooseVersion(e) {
      let choosed = e.currentTarget.dataset.index
      if(this.data.isTap) {
        this.setData({
          choosed
        })
      }
      this.triggerEvent('choosedVersion', {choosed})
    }
  }
})
