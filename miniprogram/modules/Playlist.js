const api = require('../utils/api')
class Playlist {
  getHighquality() {
    return api._fetch({
      url: '/top/playlist/highquality?before=1588161129364&limit=15'
    })
  }
  getChinese() {
    return api._fetch({
      url: '/top/playlist/highquality?cat=华语&limit=15'
    })
  }
  getRap() {
    return api._fetch({
      url: '/top/playlist/highquality?cat=说唱&limit=9'
    })
  }
  getEle() {
    return api._fetch({
      url: '/top/playlist/highquality?cat=电子&limit=15'
    })
  }
  getPop() {
    return api._fetch({
      url: '/top/playlist/highquality?cat=流行&limit=9'
    })
  }
  getRock() {
    return api._fetch({
      url: '/top/playlist/highquality?cat=摇滚&limit=9'
    })
  }
}

export { Playlist }