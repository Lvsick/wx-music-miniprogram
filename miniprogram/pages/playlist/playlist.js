
import { Playlist } from '../../modules/Playlist'
const playlist = new Playlist()
Page({
  data: {
    playlistHigh: [],
    playlistChinese: [],
    playlistRap: [],
    playlistEle: [],
    playlistPop: [],
    playlistRock: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
      title: '拼命加载中',
    })
    const Highquality = await playlist.getHighquality()
    const chinese = await playlist.getChinese()
    const rap = await playlist.getRap()
    const ele = await playlist.getEle()
    const pop = await playlist.getPop()
    const rock = await playlist.getRock()
    this.setData({
      playlistHigh: Highquality.data.playlists,
      playlistChinese: chinese.data.playlists,
      playlistRap: rap.data.playlists,
      playlistEle: ele.data.playlists,
      playlistPop: pop.data.playlists,
      playlistRock: rock.data.playlists
    })
    wx.hideLoading()
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
  onReachBottom: async function () {


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})