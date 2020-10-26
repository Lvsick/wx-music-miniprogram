const api = require('../utils/api')
class Musiclist {
  getMusiclist(id) {
    return api._fetch({
      url: '/playlist/detail?id=' + id
    })
  }
}

export { Musiclist }