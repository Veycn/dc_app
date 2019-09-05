// components/grcourse/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: Number,
    name: String,
    tx: String,
    edi:String,
    retime:String,
    title: String,
    groupneed:Number,
    point:String
  },

  /**
   * 组件的初始数据
   */
  data: {
      mask:"mask-hidden",
      lesscancel:"取消课程",
      time:"time",
      cancel: "cancel"
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
        mask:"mask-hidden",
      })
    },
    confirm(){
      this.setData({
        mask: "mask-hidden",
        lesscancel: "退款中",
        time:"time-hidden",
        cancel:null
      })
      wx.showToast({
        title: '24小时内退款',
        icon:"none",
        success(){
          console.log("取消成功")
        }
      })
    },
    buycourse(){
      wx.navigateTo({
        url: '../../pages/buycourse/index'
      })
    }
  }
})
