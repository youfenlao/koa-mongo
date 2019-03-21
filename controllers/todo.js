const todoModel = require('../models/todo');

async function all(ctx) {
  const pageSize = Number(ctx.query.pageSize || 10);
  const pageNo = Number(ctx.query.pageNo || 1);
  const options = {"limit": pageSize, "skip": (pageNo-1) * pageSize};
  const totalNum = await todoModel.count();
  const totalPage = Math.ceil(totalNum / pageSize);
  const list = await todoModel.find({}, null, options);
  ctx.body = {
    pageNo,
    pageSize,
    totalNum,
    totalPage,
    list
  };
}

async function create(ctx) {
  const res = await todoModel.create(ctx.request.body);
  ctx.body = res;
}

async function destroy(ctx) {
  const res = await todoModel.findByIdAndRemove(ctx.params.id);
  ctx.body = res;
}

async function update(ctx) {
  const res = await todoModel.findByIdAndUpdate(ctx.params.id, {
    $set: {
      txt: ctx.request.body.txt
    }
  });
  ctx.body = res
}

module.exports = {
  all,
  create,
  destroy,
  update
}
