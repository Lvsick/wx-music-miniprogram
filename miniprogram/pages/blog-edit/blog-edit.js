// pages/blog-edit/blog-edit.js
const MAX_IMG_NUM = 9
const db = wx.cloud.database()
let content = ''
let userInfo = {}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    footerBottom: 0,
    images: [],
    selectPhoto: true,
    content: ''
  },
  onInput (event) {
    content = event.detail.value
  },
  onFocus (event) {
    this.setData({
      footerBottom: event.detail.height
    })
  },
  onBlur () {
    this.setData({
      footerBottom: 0
    })
  },
  send () {
    if (content.trim() === '') {
      wx.showModal({
        title: '请输入内容'
      })
      return
    }
    wx.showLoading({
      title: '发布中...',
      mask:true
    })
    let promiseArr = []
    let fileIds = []
    for (let i = 0, len = this.data.images.length; i < len; i++) {
      let p = new Promise((resolve, reject) => {
        const last = this.data.images[i].split('.')
        wx.cloud.uploadFile({
          cloudPath: 'blog/' + Date.now() + '.' + last[last.length - 1],
          filePath: this.data.images[i],
          success: res => {
            fileIds = fileIds.concat(res.fileID)
            resolve()
          },
          fail: error => {
            reject(error)
          }
        })
      })
      promiseArr.push(p)
    }
    Promise.all(promiseArr).then(res => {
      db.collection('blog')
        .add({
          data: {
            content,
            img: fileIds,
            ...userInfo,
            createTime: db.serverDate()
          }
        })
        .then(res => {
          wx.hideLoading()
          wx.showToast({
            title: '发布成功',
            duration:2500,
          })
          setTimeout(()=>{
            wx.navigateBack()
            const pages = getCurrentPages()
            const prevPage = pages[pages.length-2]
            prevPage.onPullDownRefresh()
          },1000)
        })
        .catch(error => {
          wx.hideLoading()
          wx.showToast({
            title: '发布失败'
          })
        })
    })
  },
  onChooseImage () {
    let max = MAX_IMG_NUM - this.data.images.length
    wx.chooseImage({
      count: max,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: result => {
        console.log(result)
        this.setData({
          images: this.data.images.concat(result.tempFilePaths)
        })
        let max = MAX_IMG_NUM - this.data.images.length
        this.setData({
          selectPhoto: max <= 0 ? false : true
        })
      }
    })
  },
  onDelImage (event) {
    this.data.images.splice(event.target.dataset.index, 1)
    this.setData({
      images: this.data.images
    })
    if (this.data.images.length === MAX_IMG_NUM - 1) {
      this.setData({
        selectPhoto: true
      })
    }
  },
  onPreviewImage (event) {
    wx.previewImage({
      urls: this.data.images,
      current: this.data.images[event.target.dataset.index]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userInfo = options
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
