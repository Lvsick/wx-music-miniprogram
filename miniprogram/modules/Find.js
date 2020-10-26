const api = require('../utils/api')
class Find {
  getFind() {
    return api._fetch({
      url: '/top/playlist?limit=6&order=hot&cat=流行'
    })
  }
}

export { Find }