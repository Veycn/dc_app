// components/topicsbtn/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scantronList: {
      type: Array,
      value: []
    },
    isFinshed: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // currentIndex: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    rediretTopic(e) {
      let currentIndex = e.currentTarget.dataset.index
      this.triggerEvent('rediretTopic', { currentIndex })
    }
  }
})
