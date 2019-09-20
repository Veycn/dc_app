const BASE = 'https://www.shenfu.online/sfeduWx/'
const header = {
  'content-type': 'application/json'
}

function request (url, method, data, callback, type='json') {
  wx.showLoading()
  getHeader().then(token => {
    if (token) {
      header.token = token                            
    } else {
      return console.error("token get faild!")
    }
    if(type === 'form'){
      header['content-type'] = 'application/x-www-form-urlencoded'
    }
    wx.request({
      url: BASE + url,
      method: method,
      data: data,
      header: header,
      success: result => { 
        wx.hideLoading()
        if(result.statusCode === 200){
          callback(result.data)
        } else {
          console.log(result)
          wx.showToast({
            title: result.data.message || '请求异常',
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

