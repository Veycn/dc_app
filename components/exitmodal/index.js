// components/answercard/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "是否退出检测"
    },
    correctbtn: {
      type: String,
      value: "是"
    },
    errorbtn: {
      type: String,
      value: "否"
    },
    isShow: {
      type: Boolean,
      value: false
    },
    modal: {
      type:String,
      value: "nocomplete_frame_show"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: "/assets/icon/exit.png",
    bgc: "grade_item_white"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancel:function () {
      this.triggerEvent("hideExitModal",{
        isExitDetect: false
      })
    },
    confirm:function() {
      this.triggerEvent("hideExitModal",{
        isExitDetect: true
      })
    }
  }
})