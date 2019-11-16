// components/chooseBoard/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tagName: String,
    renderList: Array,
    type: String,
    activeColor: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemChoosed(e){
      console.log(e)
      let {item, index} = e.currentTarget.dataset
      this.setData({
        activeIndex: index
      })
      this.triggerEvent('tagBeChoosed', {item, index})
    }
  }
})
