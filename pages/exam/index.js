// pages/exam/index.js
const { request } = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerLists: ['A', 'B', 'C', 'D'],
    isLastTopic: false,
    currentTopicIndex: 0,
    topicsLength: 3,
    topicsList: [],
    isShowAnswerCard: false,
    isShowExitModal: false,
    choosedTopicIndex: -1,
    count: [],                // 用来记录用户做过题的数量
    userAnswers: [],          // 记录用户做过的题目
    examTemp: {
      "dealType": 0,
      "examId": 0,
      "examItemTempList": [
        {
          "questionId": 0,
          "userAnswer": 0
        }
      ],
      "examTimes": 0,
      "knowledgePointId": 0,
      "timeSpend": 0
    }
  },
  // 显示退出检测的模态框
  showExitModal() {
    this.setData({
      isShowExitModal: true
    })
  },
  // 隐藏退出检测的模态框
  hideExitModal(e) {
    this.setData({
      isShowExitModal: false
    })
    if (e.detail.isExitDetect) {
      // 退出时需要保存什么东西。。。
    }
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
  // 得到用户的答案
  getUserAnswer(e) {
    this.isMakeAllTopic()
    let userAnswers = this.data.userAnswers
    let choosedTopicIndex = e.target.dataset.index
    this.setData({
      choosedTopicIndex
    })

    // let userAnswer = this.data.answerLists[choosedTopicIndex]
    let currentTopicIndex = this.data.currentTopicIndex

    let submitAnswer = this.data.examTemp.examItemTempList
    let len = submitAnswer.length
    let obj = {}
    obj.questionId = currentTopicIndex
    obj.userAnswer = choosedTopicIndex + 1
    for (let i = 0; i < len; ++i) {
      if (submitAnswer[i].questionId === obj.questionId) {
        submitAnswer[i].userAnswer = obj.userAnswer
        this.setData({
          ['examTemp.examItemTempList']: submitAnswer
        })
        break
      }
      if (i == len - 1) {
        submitAnswer.push(obj)
        this.setData({
          ['examTemp.examItemTempList']: submitAnswer
        })
      }
    }


    if (userAnswers.length === 0) {
      let arrLength = this.data.topicsLength
      let tempArr = new Array(arrLength).fill(-1)
      tempArr[currentTopicIndex] = choosedTopicIndex
      this.setData({
        userAnswers: tempArr
      })
    } else {
      userAnswers[currentTopicIndex] = choosedTopicIndex
      this.setData({
        userAnswers
      })
    }
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
  // 提交答案
  submitUserAnswer() {
    this.setData({
      isShowAnswerCard: true,
      ['examTemp.dealType']: 2
    })
    let submitAnswer = this.data.examTemp
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
    let length = this.data.topicsLength
    currentTopicIndex = currentTopicIndex < length ? currentTopicIndex : length - 1
    this.setData({
      currentTopicIndex
    })
  },
  // 得到题目集合
  getTopicsList(id) {
    request('api/exam/getSectionExamOfUser', 'get', { sectionId: id }, res => {
      console.log(res.data)
      this.setData({
        topicsList: res.data.questionList,
        topicsLength: res.data.questionList.length
      })
    }, 'form')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      ['examTemp.knowledgePointId']: options.id
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