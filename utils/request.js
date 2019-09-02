const BASE = 'https://www.shenfu.online/sfeduWx/api'
const header = {
  'content-type': 'application/json'
}

function request (url, method, data, callback) {
  wx.showLoading()
  getHeader().then(token => {
    if (token) {
      header.Authorization = 'Bearer ' + token                            
    } else {
      return console.error("token get faild!")
    }
    wx.request({
      url: BASE + url,
      method: method,
      data: data,
      header: header,
      success: result => { 
        wx.hideLoading()
        if(result.status === 0){
          callback(result.data)
        } else {
          wx.showToast({
            title: result.msg,
            icon: 'none',
            mask: true
          })
        }
      }
    })
  })
}


function getHeader () {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'userToken',
      success: result => {
        resolve(result.data)
      }
    })
  })
}

module.exports = {
  getHeader: getHeader,
  request: request
}

