const BASE = ''


function request (url, method, data, callback) {
  wx.request({
    url: BASE + url,
    method,
    data,
    success: res => {
      if (res.status === 0) {
        callback(res.data)
      }
    }
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

module.exports.getHeader = getHeader
module.exports.request = request


