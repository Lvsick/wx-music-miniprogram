// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const Tcbrouter = require('tcb-router')
const db = cloud.database()
const blogCollection = db.collection('blog')


// 云函数入口函数
exports.main = async (event, context) => {
  const app = new Tcbrouter({
    event
  })
  app.router('list', async (ctx, next) => {
    const keyword = event.keyword
    let w = {}
    if (keyword.trim() != '') {
      w = {
        content: db.RegExp({
          regexp: keyword,
          options: 'i'
        })
      }
    }
    let blogList = await blogCollection.where(w).skip(event.start).limit(event.count)
      .orderBy('createTime', 'desc').get()
    ctx.body = blogList
  })

    app.router('detail',async(ctx,next)=>{
      let blogId = event.blogId
      const blog = await blogCollection.aggregate().match({
        _id: blogId
      }).lookup({
        from: 'blog-comment',
        localField: '_id',
        foreignField: 'blogId',
        as: 'commentList'
      }).end()
      ctx.body = blog
    })
  return app.serve()
}