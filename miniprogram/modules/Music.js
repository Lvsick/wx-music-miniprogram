const api = require('../utils/api')
class Music {
  getMusic(id) {
    return api._fetch({
      url: '/song/url?id=' + id
    })
  }
  getLyric(id){
    return api._fetch({
      url: "/lyric?id=" + id
    })
  }
}

export { Music }