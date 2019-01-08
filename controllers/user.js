const userModel = require('../models/user');

exports.getlist = async (ctx, next) => {
 
  const res = await userModel.find({})
  ctx.body = {
    msg: true,
    res
  }
}

exports.update = async(ctx) => {
  try {
    
    const res = await userModel.findOneAndUpdate({
      _id: ctx.params.id
    }, {
      $set: {
        nickname: ctx.request.body.nickname
      }
    }, {
      new: false
    })
    ctx.body = {
      success: true,
      data: res
    }
  } catch (error) {
    console.log(error)
  }
}

exports.create = async (ctx) => {
  try {
    const res = await userModel.create(ctx.request.body)
    ctx.body = {
      success: true,
      data: res
    }
  } catch (error) {
    
  }
}

exports.delete = async(ctx) => {
  try {
    const res = await userModel.findByIdAndRemove(ctx.params.id)
    ctx.body = {
      success: true,
      data: res
    }
  } catch (error) {
    ctx.body = {
      success: false,
      data: error
    }
  }
}
