// components/mylesson/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: Number,
    name: String,
    tx: String,
    title:String,
    edi:String,
    point:String,
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
    toclass() {
      this.triggerEvent('toClass')
    }
  }
})