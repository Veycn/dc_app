const BASE = 'https://www.shenfu.online/sfeduWx/'
const header = {
  'content-type': 'application/json'
}

/**
 * 
 * @param {string}   url          请求地址: 'api/...'
 * @param {string}   method       'get' or 'post'
 * @param {object}   data         请求参数, {a:"", b:1} 的形式
 * @param {function} callback     数据返回回调函数
 * @param {string}   type         数据提交类型: 如果需要以form形式提交, 传递参数 'form' 即可, json 格式不需要传递此参数
 * @param {boolean}  identity     请求标记用户身份, 学生0, 教师为1
 */

function request (url, method, data, callback, type='json', cancelLoading=false, identity=0) {
  
  if(!cancelLoading){
    wx.showLoading({title: '加载中...', icon: 'none'})
  }
  getHeader(identity).then(token => {
    if (token) {
      header.token = token                            
    } else {
       console.error("token get faild!")
    }
    
    if(type === 'form'){
      header['content-type'] = 'application/x-www-form-urlencoded'
    }else if(type === 'json'){
      header['content-type'] = 'application/json;charset=UTF-8'
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
      },
      // 防止请求不成功一直 loading
      complete: () => {
        wx.hideLoading()
      }
    })
  }) 
}


function getHeader (id=0) {
  return new Promise((resolve, reject) => {
    if(id === 1){
      console.log(1);
      
      wx.getStorage({
        key: 'teacherToken',
        success: result => {
          resolve(result.data)
        }
      })
    }else if(id === 0){
      wx.getStorage({
        key: 'userToken',
        success: result => {
          resolve(result.data)
        }
      })
    }
  })
}

module.exports = {
  getHeader: getHeader,
  request: request
}

