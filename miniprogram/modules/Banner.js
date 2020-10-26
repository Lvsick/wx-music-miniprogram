const api = require('../utils/api')
class Banner {
  getBanner () {
    return api._fetch({
      url: '/banner?type=1'
    })
  }
}

export { Banner }
