// components/descourse/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    section:String,
    courseId:String,
    buynum:String,
    teachecName:String,
    teacherImage:String,
    courseImage:String
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
    tobuy(e){
      var courseId = e.target.dataset.id
      wx.navigateTo({
        url: `/pages/publicinfo/index?id=${courseId}`,
      })
    }
  }
})