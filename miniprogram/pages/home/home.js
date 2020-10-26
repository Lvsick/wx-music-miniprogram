
import { Banner } from '../../modules/Banner'
import { Find } from '../../modules/Find'
const banner = new Banner()
const find = new Find()
Page({
  data: {
    swiperImgUrls: [],
    findPlaylist: []
  },
  toPlaylist() {
    wx.navigateTo({
      url: '../playlist/playlist',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
      title: '拼命加载中',
    })
    const banners = await banner.getBanner()
    const findList = await find.getFind()
    this.setData({
      swiperImgUrls: banners.data.banners,
      findPlaylist: findList.data.playlists
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