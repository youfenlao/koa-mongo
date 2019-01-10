const todoModel = require('../models/todo');

async function all(ctx) {
  const res = await todoModel.find({});
  ctx.body = res;
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
