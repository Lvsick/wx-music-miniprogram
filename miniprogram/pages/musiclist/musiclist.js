// pages/musiclist/musiclist.js
import { Musiclist } from '../../modules/Musiclist'
const musiclist = new Musiclist()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musiclist: [],
    listInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
      title: '拼命加载中',
    })
    const res = await musiclist.getMusiclist(options.playlistId)
    const data = res.data.playlist
    console.log(res)
    this.setData({
      musiclist: data.tracks,
      listInfo: {
        coverImgUrl: data.coverImgUrl,
        name: data.name,
        description: data.description
      }
    })
    this._setMusiclist()
    wx.hideLoading()
  },
  _setMusiclist() {
    wx.setStorage({
      data: this.data.musiclist,
      key: 'musiclist',
    })
  }
})