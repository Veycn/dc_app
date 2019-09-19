// pages/exam/index.js
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
    submitAnswer: []
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

    let userAnswer = this.data.answerLists[choosedTopicIndex]
    let currentTopicIndex = this.data.currentTopicIndex

    let submitAnswer = this.data.submitAnswer
    let obj = {}
    obj.id = currentTopicIndex
    obj.userAnswer = userAnswer
    submitAnswer.push(obj)
    this.setData({
      submitAnswer
    })

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
    let submitAnswer = this.data.submitAnswer
    console.log(submitAnswer)
  },
  // 滑动至下一题或上一题
  nextTopic(e) {
    let userAnswers = this.data.userAnswers
    let currentTopicIndex = e.detail.current
    if(userAnswers.length !== 0) {
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
    let currentTopicIndex = this.data.currentTopicIndex+1
    let length = this.data.topicsLength
    currentTopicIndex = currentTopicIndex < length ? currentTopicIndex : length - 1
    this.setData({
      currentTopicIndex
    })
  },
  // 得到题目集合
  getTopicsList() {
    let topicsList = [
      {
        path: "../../assets/icon/topic.jpg"
      },
      {
        path: "../../assets/icon/topic.jpg"
      },
      {
        path: "../../assets/icon/topic.jpg"
      },
      {
        path: "../../assets/icon/topic.jpg"
      }
    ]
    let topicsLength = topicsList.length
    this.setData({
      topicsList,
      topicsLength
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTopicsList()
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