const router = require('koa-router')();
const fs = require('fs-extra');
const path = require('path');

router.get('/check/md5', async(ctx) => {
  const fileMd5 = ctx.query.m;
  fs.readdirSync(path.resolve('temp'))
})

router.post('/upload', async (ctx) => {
  const fileMd5 = ctx.request.body.fileMd5;
  const tempbuffer = fs.readFileSync(ctx.request.files.chunk.path);

  await fs.ensureDir(path.resolve('temp', fileMd5))

  fs.writeFileSync(path.resolve('temp', `${ctx.request.body.fileMd5}`, `${ctx.request.body.num}`), tempbuffer)

  // const writeStream = fs.createWriteStream(path.resolve('temp', `${ctx.request.body.fileMd5}`, `${ctx.request.body.num}`))
  // const readerStream = fs.createReadStream(ctx.request.files.chunk.path)
  // readerStream.pipe(writeStream)
  ctx.body = true
})

router.get('/merge', (ctx) => {
  const fileMd5 = ctx.query.m;
  const fileName = ctx.query.name;
  const files = fs.readdirSync(path.resolve('temp', fileMd5))
  const buffers = [];
  files.forEach((name) => {
    const buffer = fs.readFileSync(path.resolve('temp', fileMd5, name));
    buffers.push(buffer);
  })
  const concatBuffer = Buffer.concat(buffers);
  fs.writeFileSync(path.resolve('upload', fileName), concatBuffer);

  async function remove(folder) {
    await fs.remove(folder)
  }
  remove(path.resolve('temp', fileMd5))
  ctx.body = true

})

module.exports = router;
