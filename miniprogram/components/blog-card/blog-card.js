// components/blog-card/blog-card.js
import formatTime from '../../utils/formatTime'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog:Object
  },
  observers:{
    ['blog.createTime'](val){
      if (val) {
        // console.log(val)
        this.setData({
          createTime: formatTime(new Date(val))
        })
      }
    }
  },
  lifetimes:{
    attached(){
      this.setData({
        loading:false
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    createTime:'',
    loading: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPreviewImage(event){
      const ds = event.target.dataset
      wx.previewImage({
        urls: ds.imgs,
        current:ds.imgsrc
      })
    }
  }
})
