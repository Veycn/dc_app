// components/grcourse/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: Number,
    name: String,
    pic: String
  },

  /**
   * 组件的初始数据
   */
  data: {
      mask:"mask-hidden"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancel:function(){
      this.setData({
        mask:"mask"
      })
    },
    cancelpic(){
      this.setData({
        mask:"mask-hidden"
      })
    },
    confirm(){
      this.setData({
        mask: "mask-hidden",
        
      })
    }
  }
})
