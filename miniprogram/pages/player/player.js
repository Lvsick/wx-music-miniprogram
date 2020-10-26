
// pages/player/player.js
import { Music } from '../../modules/Music'
const app = getApp()
let musiclist = []
let nowPlayingIndex = 0
const musicData = new Music()
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
    isPlaying: false,
    isLyricShow:false,
    lyric:'',
    isSame:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: async function (options) {
    musiclist = wx.getStorageSync('musiclist')
    console.log(musiclist)
    nowPlayingIndex = options.index
    this._loadMusicDetail(nowPlayingIndex)
  },
  
  togglePlaying() {
    if (this.data.isPlaying) {
      backgroundAudioManager.pause()
    }
    else {
      backgroundAudioManager.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },
  onPrev() {
    nowPlayingIndex--
    if (nowPlayingIndex < 0) {
      nowPlayingIndex = musiclist.length - 1
    }
    this._loadMusicDetail(nowPlayingIndex)
  },
  onNext() {
    nowPlayingIndex++
    if (nowPlayingIndex === musiclist.length) {
      nowPlayingIndex = 0
    }
    this._loadMusicDetail(nowPlayingIndex)
  },
  onChangeLyricShow(){
    this.setData({
      isLyricShow:!this.data.isLyricShow
    })
  },
  onPlay() {
    this.setData({
      isPlaying: true,
    })
  },
  onPause() {
    this.setData({
      isPlaying: false,
    })
  },
  timeUpdate(event) {
    this.selectComponent('.lyric').update(event.detail.currentTime)
  },
  async _loadMusicDetail(nowPlayingIndex) {
    let music = musiclist[nowPlayingIndex]
    if(music.id == app.getPlayMusicId()){
      this.setData({
        isSame:true
      })
    }
    if(!this.data.isSame){
      backgroundAudioManager.stop()
    }
    wx.setNavigationBarTitle({
      title: `${music.name}-${music.ar[0].name}`,
    })
    this.setData({
      picUrl: music.al.picUrl,
      isPlaying: false
    })
    app.setPlayMusicId(music.id)
    wx.showLoading({
      title: '歌曲加载中'
    })
    const { data } = await musicData.getMusic(music.id)
    const url = data.data[0].url
    if(!this.data.isSame){
      backgroundAudioManager.title = music.name
      backgroundAudioManager.coverImgUrl = music.al.picUrl
      backgroundAudioManager.singer = music.ar[0].name
      backgroundAudioManager.epname = music.al.name
      backgroundAudioManager.src = url
      this.savePlayHistory()
    }
    this.setData({
      isPlaying: true
    })
    wx.hideLoading()
    const Lyric = await musicData.getLyric(music.id)
    
    if(Lyric.data.nolyric === true){
      this.setData({
        lyric:'暂无歌词'
      })
    }
    else{
      this.setData({
        lyric:Lyric.data.lrc.lyric
      })
    }
  },
  savePlayHistory() {
    //  当前正在播放的歌曲
    const music = musiclist[nowPlayingIndex]
    const openid = app.globalData.openid
    const history = wx.getStorageSync(openid)
    let bHave = false
    for (let i = 0, len = history.length; i < len; i++) {
      if (history[i].id == music.id) {
        bHave = true
        break
      }
    }
    if (!bHave) {
      history.unshift(music)
      wx.setStorage({
        key: openid,
        data: history,
      })
    }
  }, 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})