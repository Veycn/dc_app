// components/sectionItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pointName: String,
    status: String,
    color: String,
    level: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap () {
      this.triggerEvent('pointTap')
    }
  }
})
