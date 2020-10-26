const baseURL = 'http://localhost:3000'

const http = ({ url, data, method }) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      data: data,
      method: method,
      complete: res => {
        if (res.statusCode === 200) {
          resolve(res)
        } else if (res.statusCode === 404) {
          console.log('请求失败!')
        } else if (res.statusCode !== 200) {
          console.log(res.errMsg)
        } else {
          reject(reject)
        }
      }
    })
  })
}

const _fetch = content => {
  return http({
    url: content.url,
    data: content.data,
    method: content.method
  })
}

module.exports = {
  _fetch
}
