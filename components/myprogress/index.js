// components/myprogress/index.js
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [],
  properties: {
    percent: {
      type: [Number, String],
      value: 100
    },
    strokeWidth: {
      type: [Number, String],
      value: 16
    },
    activeLineColor: {
      type: Array,
      value: []
    },
    activeColor: {
      type: [String, Array],
      value: '#ffca49, #ffb262'
    },
    backgroundColor: {
      type: String,
      value: '#e5e5e5'
    },
    radius: {
      type: [Number, String],
      value: 15
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

  },
  methods: {},
  attached: function () {
    let activeColor = this.data.activeColor;

    if (!!~activeColor.indexOf(',')) {
      this.setData({
        activeLineColor: activeColor.split(',')
      })
    }
  }
})
