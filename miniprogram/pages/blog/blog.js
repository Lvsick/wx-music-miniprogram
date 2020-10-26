// pages/blog/blog.js
let keyword =''
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    userInfo: {},
    blogList: []
  },
  showPopup () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              wx.navigateTo({
                url: `../blog-edit/blog-edit?nickName=${res.userInfo.nickName}&avatarUrl=${res.userInfo.avatarUrl}`
              })
            }
          })
        } else {
          this.setData({ show: true })
        }
      }
    })
  },

  onClose () {
    this.setData({ show: false })
  },
  onGetUserInfo (event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      wx.navigateTo({
        url: `../blog-edit/blog-edit?nickName=${userInfo.nickName}&avatarUrl=${userInfo.avatarUrl}`
      })
      this.setData({ show: false })
    } else {
      wx.showModal({
        title: '发布需要授权'
      })
    }
  },
  goComment(event){
    wx.navigateTo({
      url: '../../pages/blog-comment/blog-comment?blogId='+ event.target.dataset.blogid,
    })
  },
  test(){
    console.log(123)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async _blogList (start = 0) {
    wx.showLoading({
      title: '拼命加载中',
    })
    let res = await wx.cloud.callFunction({
      name: 'blog',
      data: {
        keyword,
        $url: 'list',
        start,
        count: 4
      }
    })
    this.setData({
      blogList: this.data.blogList.concat(res.result.data)
    })
    wx.hideLoading({
      success: (res) => {},
    })
  },
  onLoad: function (options) {
    this._blogList()
  },
  onSearch(event){
    this.setData({
      blogList:[]
    })
    keyword = event.detail.keyword
    this._blogList()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      blogList:[]
    })
    this._blogList(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._blogList(this.data.blogList.length)
  },
    
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (event) {
    console.log(event)
    let blogObj = event.target.dataset.blog
    return {
      title:blogObj.content,
      path:`/pages/blog-comment/blog-comment?blogId=${blogObj._id}`,
    }
  }
})
