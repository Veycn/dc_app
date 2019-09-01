// components/button/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btnText: {
      type: String,
      value: '请设置按钮文案'
    },
    bgColor: {
      type: String,
      value: '#ffffff'
    },
    fontColor: {
      type: String,
      value: "#000000"
    }
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
    handleClick () {
      this.triggerEvent('btnClick', {})
      console.log("按钮组件被点击~")
    }
  }
})
