/**
 * 在app.use(router)之前调用
 */
const response_formatter = async (ctx) => {

  //如果有返回数据，将返回数据添加到data中
  if (ctx.body) {
      ctx.body = {
          code: 0,
          message: 'success',
          data: ctx.body
      }
  } else {
      ctx.body = {
          code: 0,
          message: 'success'
      }
  }
}

const fliter = (pattern) => {
  return async function(ctx, next) {
    const reg = new RegExp(pattern)
    await next();
    if(reg.test(ctx.originalUrl)) {
      response_formatter(ctx)
    }
  }
  
}

module.exports = fliter;
