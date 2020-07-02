// components/allversion/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isTap: {
      type: Boolean,
      value: false
    },
    allVersion: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // allVersion: [],
    choosed: -1,
    id: -1
  },
  attached() {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    chooseVersion(e) {
      console.log(e)
      let choosed = e.currentTarget.dataset.index
      let id = e.currentTarget.dataset.idx
      if(this.data.isTap) {
        this.setData({
          choosed,
          id
        })
      }
      this.triggerEvent('choosedVersion', {choosed, id})
    }
  }
})
