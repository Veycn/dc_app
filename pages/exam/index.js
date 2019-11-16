// pages/exam/index.js
const { request, getHeader } = require('../../utils/request.js')
const header = {
  'content-type': 'application/json'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    szimg: "../../assets/icon/clock.png",
    tyimg: "../../assets/icon/icon_circle.png",
    psimg: "../../assets/icon/icon_poss.png",
    minutes: '00',
    seconds: '00',
    timer: null, // 倒计时 器
    forwardtimer: null, //正向计时器
    lasttime: 0,  // 过去的秒数
    isDone: true,
    // forwardtime: 0, // 正向计时
    // sumTime: 0,   // 总时间
    // timeWay: 0,

    answerLists: ['A', 'B', 'C', 'D'],
    isLastTopic: false,
    isSubmit: false,
    currentTopicIndex: 0,
    topicsLength: 1,
    topicsList: [],
    // spendTime: 0,
    isShowAnswerCard: false,
    isShowExitModal: false,
    choosedTopicIndex: -1,
    type: '',
    isK: false,
    count: [],                // 用来记录用户做过题的数量
    userAnswers: [],          // 记录用户做过的题目
    examTemp: {
      "dealType": 0,
      "examItemTempList": [],
      "examSectionId": 0,
      "timeSecond": 0,
      "timeWay": 0
    },
    intervalTime: 1000 * 6,   // 自动保存的间隔时间
    stimer: null
  },

  init: function () {
    this.setData({
      minutes: '00',
      second: '00'
    })
  },
  // 清除倒计时的计时器
  clearTimer: function () {
    clearInterval(this.data.timer)
    this.setData({
      timer: null
    })
    this.init()
  },
  // 清除正向计时器
  clearForTimer: function () {
    clearInterval(this.data.forwardtimer)
    this.setData({
      forwardtimer: null
    })
    this.init()
  },
  forwardCount() {
    var forwardtimer = setInterval(() => {
      var forwardtime = this.data.examTemp.timeSecond + 1;
      this.setData({
        ['examTemp.timeSecond']: forwardtime,
        ['examTemp.timeWay']: 1
      })
      var str = this.conversion(forwardtime).split(":")
      this.setData({
        minutes: str[0],
        seconds: str[1]
      })
      if (this.data.isSubmit) {
        this.setData({
          isSubmit: false
        })
        this.spendAllTime()
      }
    }, 1000)
    this.setData({
      forwardtimer
    })
  },
  countDown: function (duration) {
    if (duration <= 0) {
      this.clearTimer()
      this.forwardCount()
    }
    return this.conversion(duration)

  },
  conversion: function (time) {
    var seconds = this._format(time % 60)
    var minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60)
    return `${minutes}:${seconds}`
  },
  _format: function (time) {
    return time >= 10 ? time : `0${time}`
  },
  runCountDown: function (initDuration) {
    console.log(`总时间为${initDuration}`)
    var timer = setInterval(() => {
      var totalseconds = initDuration;
      var lasttime = this.data.lasttime + 1;
      totalseconds = totalseconds - lasttime;
      this.setData({
        lasttime,
        ['examTemp.timeSecond']: totalseconds
      })
      var str = this.countDown(totalseconds).split(":")
      this.setData({
        minutes: str[0],
        seconds: str[1]
      })
      // 判断是否提交，如果提交计算做题花费总时间
      if (this.data.isSubmit) {
        this.setData({
          isSubmit: false
        })
        this.spendAllTime()
      }
    }, 1000)
    this.setData({
      timer
    })
  },

  autoSave() {
    let stimer = setInterval(() => {
      let sign = "save"
      console.log(`倒计时时间${this.data.examTemp.timeSecond}`)
      this.setData({
        ['examTemp.dealType']: 1
        // ['examTemp.timeSecond']: this.data.spendTime
      })
      this.subOrSaveReq(sign)
    }, this.data.intervalTime)
    this.setData({
      stimer
    })
  },
  // 显示答题卡
  showAnswerCard() {
    this.setData({
      isShowAnswerCard: true
    })
  },
  // 点击答题卡中的按钮进行跳转
  rediretTopic(e) {
    let currentTopicIndex = e.detail.currentIndex
    this.setData({
      currentTopicIndex,
      isShowAnswerCard: false
    })
  },
  // 隐藏答题卡
  hideAnswerCard() {
    this.setData({
      isShowAnswerCard: false
    })
  },
  subOrSaveReq(sign = "submit") {
    if (sign === "submit") {
      wx.showLoading({ title: '加载中...', icon: 'none' })
    }
    getHeader().then(token => {
      if (token) {
        header.token = token
      } else {
        console.error("token get faild!")
      }
      let url = ''
      console.log(`isK的值是${this.data.isK}`)
      if (this.data.isK) {
        url = 'https://www.shenfu.online/sfeduWx/api/exam/dealKnowledgeExam'
      } else {
        url = 'https://www.shenfu.online/sfeduWx/api/exam/dealSectionExam'
      }
      wx.request({
        url: url,
        data: this.data.examTemp,
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: header, // 设置请求的 header
        success:  (res) => {
          console.log(res)
          let tempArr = this.data.examTemp.examItemTempList
          for (let i = 0; i < tempArr.length; ++i) {
            let result = tempArr[i].userAnswer * 1
            if (result === 0 && sign === "submit") {
              console.log('还没做完')
              this.setData({
                isDone: false
              })
              wx.switchTab({
                url:"/pages/detect/index"
              })
              break
            }
          }
          if (sign === 'submit' && this.data.isDone) {
            wx.hideLoading()
            wx.reLaunch({
              url: `/pages/points/index?data=${JSON.stringify(res.data.data)}`
            })
          }

        },
        fail: function () {
          // fail
        },
        // 防止请求不成功一直 loading
        complete: () => {
          wx.hideLoading()
        }
      })
    })
  },
  spendAllTime() {
    console.log(`${this.data.examTemp.timeWay}计时,倒计时总时间为${this.data.examTemp.timeSecond}s`)
    this.setData({
      ['examTemp.dealType']: 2,
      ['examTemp.timeWay']: this.data.examTemp.timeWay
    })
    let data = this.data.examTemp
    console.log(data)
    this.subOrSaveReq()

  },
  // 得到用户的答案
  getUserAnswer(e) {
    this.isMakeAllTopic()
    let userAnswers = this.data.userAnswers
    let choosedTopicIndex = e.target.dataset.index
    this.setData({
      choosedTopicIndex
    })
    console.log(userAnswers)
    console.log(choosedTopicIndex)

    let currentTopicIndex = this.data.currentTopicIndex

    let submitAnswer = this.data.examTemp.examItemTempList
    submitAnswer[currentTopicIndex].userAnswer = choosedTopicIndex + 1
    this.setData({
      ['examTemp.examItemTempList']: submitAnswer
    })
    userAnswers[currentTopicIndex] = choosedTopicIndex
    this.setData({
      userAnswers
    })
    console.log(this.data.examTemp)
  },
  // 判断用户是否做完了所有题目
  isMakeAllTopic() {
    let currentTopicIndex = this.data.currentTopicIndex
    let count = new Set(this.data.count)
    let len = this.data.topicsLength
    count.add(currentTopicIndex)
    if (len === count.size) {
      this.setData({
        isLastTopic: true
      })
    }
    this.setData({
      count
    })
  },
  isSubmit() {
    this.setData({
      isSubmit: true
    })
  },
  // 提交答案
  submitUserAnswer() {
    this.setData({
      isShowAnswerCard: true
    })
  },
  // 滑动至下一题或上一题
  nextTopic(e) {
    let userAnswers = this.data.userAnswers
    let currentTopicIndex = e.detail.current
    if (userAnswers.length !== 0) {
      let choosedTopicIndex = userAnswers[currentTopicIndex]
      this.setData({
        choosedTopicIndex
      })
    }
    this.isShowSubmit(currentTopicIndex)
  },
  // 判断是否显示提交按钮
  isShowSubmit(value) {
    let currentTopicIndex = value
    let len = this.data.topicsLength
    let lastTopicIndex = len - 1
    let count = this.data.count.size
    if (currentTopicIndex === lastTopicIndex || count === len) {
      this.setData({
        isLastTopic: true
      })
    } else {
      this.setData({
        isLastTopic: false
      })
    }
    this.setData({
      currentTopicIndex
    })
  },
  // 跳过当前题目
  passCurrentTopic() {
    let currentTopicIndex = this.data.currentTopicIndex + 1
    let submitAnswer = this.data.examTemp.examItemTempList
    if (submitAnswer[currentTopicIndex - 1].userAnswer === 0) {
      submitAnswer[currentTopicIndex - 1].userAnswer = 5
    }
    let length = this.data.topicsLength
    currentTopicIndex = currentTopicIndex < length ? currentTopicIndex : length - 1
    this.setData({
      currentTopicIndex
    })
  },
  // 得到题目集合
  getTopicsList(id) {
    if (this.data.type === 'knowledgePointId') {
      request('api/exam/getKnowledgeExamOfUser', 'get', { knowledgePointId: id }, res => {
        let tempArr = [], ans = []
        let { id, questionList, timeSecond, timeWay } = res.data
        for (var i = 0; i < questionList.length; i++) {
          tempArr.push({
            questionId: questionList[i].id,
            userAnswer: questionList[i].userAnswer
          })
          ans.push(questionList[i].userAnswer)
        }
        this.setData({
          userAnswers: ans,
          topicsList: questionList,
          topicsLength: questionList.length,
          examTemp: {
            "dealType": 2,
            "examId": id,
            "examItemTempList": tempArr,
            "knowledgePointId": questionList[0].knowledgePointId,
            "timeSecond": timeSecond,
            "timeWay": timeWay
          }
        })
      }, 'form')
    } else {
      request('api/exam/getSectionExamOfUser', 'get', { sectionId: id }, res => {
        console.log(res.data)
        if (res.data.questionList) {
          this.setData({
            topicsList: res.data.questionList,
            topicsLength: res.data.questionList.length,
            ['examTemp.examSectionId']: res.data.examSectionId,
            ['examTemp.timeSecond']: res.data.timeSecond,
            ['examTemp.timeWay']: res.data.timeWay
          })

          let len = this.data.topicsLength
          for (let i = 0; i < len; ++i) {
            let obj = {
              "questionId": 0,
              "userAnswer": 0
            }
            obj.questionId = this.data.topicsList[i].id
            let tempArr = this.data.examTemp.examItemTempList
            tempArr.push(obj)
          }
          let arr = new Array(len).fill(-1)
          let answerArr = this.data.examTemp.examItemTempList
          for (let j = 0; j < len; ++j) {
            let lastAnswer = this.data.topicsList[j].userAnswer
            if (lastAnswer !== 0) {
              arr[j] = lastAnswer - 1
              answerArr[j].userAnswer = lastAnswer
            }
          }
          this.setData({
            userAnswers: arr,
            ['examTemp.examItemTempList']: answerArr
          })
          console.log(arr)
          console.log(this.data.examTemp.examItemTempList)
          if (arr[0] !== -1) {
            let choosedTopicIndex = arr[0]
            this.setData({
              choosedTopicIndex
            })
          }
          if (this.data.examTemp.timeWay === 0) {
            this.runCountDown(this.data.examTemp.timeSecond)
          } else {
            this.forwardCount()
          }
        }
      }, 'form')
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = Number(options.id)
    if (options.type) {
      this.setData({ type: 'knowledgePointId', isK: true })
    }
    this.setData({
      ['examTemp.knowledgePointId']: id
    })
    this.getTopicsList(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.autoSave()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.stimer)
    this.clearTimer()
    this.clearForTimer()
    console.log('exit...')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})