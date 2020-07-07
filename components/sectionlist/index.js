// components/knoblist/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    done: {
      type: Boolean,
      value: true
    },
    seclist: {
      type: Object,
      value: {}
    },
    first: {
      type: Number,
      value: 0
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    didimg1: '../../assets/pic/paper1.png',
    didimg2: '../../assets/pic/paper2.png',
    didimg3: '../../assets/pic/paper3.png',
    didimg4: '../../assets/pic/paper4.png',
    nodidimg: '../../assets/pic/paper0.png',
    status: 0
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    
    // 判断status
    toExam(e) {
      console.log('exam',e)
      let {
        knowledgepointid,
        examid,
        submitstatus
      } = e.currentTarget.dataset
      console.log(knowledgepointid, examid,submitstatus)
      if(submitstatus === 0) {
        wx.navigateTo({
          url: `/pages/exam/index?examId=${examid}`
        })
      }else{
        wx.navigateTo({
          url: `/pages/points/index?knowledgepointid=${knowledgepointid}&&examId=${examid}`
        })
      }
    }
  }
})