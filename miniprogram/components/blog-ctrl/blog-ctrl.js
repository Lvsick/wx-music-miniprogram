// components/blog-ctrl/blog-ctrl.js
let userInfo = {}
const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId:String,
    blog:Object
  },
  externalClasses:[
    'iconfont',
    'icon-pinglun',
    'icon-icon_share'
  ],
  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    showComment:false,
    conent:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPopup(){
      wx.getSetting({
        success:(res) =>{
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success:(res)=>{
                userInfo = res.userInfo
                this.setData({
                  showComment:true
                })
              }
            })
          }
          else {
            this.setData({ show: true })
          }
        }
      })
    },
    onGetUserInfo (event) {
      userInfo = event.detail.userInfo
      if (userInfo) {
        this.setData({ show: false, showComment:true})
      } else {
        wx.showModal({
          title: '评论需要授权'
        })
      }
    },
    onClose() {
      this.setData({ show: false });
    },
    onCommentClose(){
      this.setData({ showComment: false });
    },
    onSend(){
      let content = this.data.conent  
      if(content.trim() ==''){
        this.showModal({
          title:'评论内容不能为空'
        })
        return
      }
      wx.showLoading({
        title: '评价中',
        mask:true
      })
      db.collection('blog-comment').add({
        data:{
          content,
          createTime:db.serverDate(),
          blogId:this.properties.blogId,
          nickName:userInfo.nickName,
          avatarUrl:userInfo.avatarUrl
        }
      }).then( res =>{
        wx.hideLoading({
          success: (res) => {},
        })
        wx.showToast({
          title: '评论成功',
        })
       
        this.setData({ showComment: false,content:'' });
        this.triggerEvent('refreshCommentList')
      })
    },
    onInput(event){
      this.setData({
        conent:event.detail.value
      })
    }
  }
})
