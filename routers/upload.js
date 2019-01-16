const router = require('koa-router')();
const fs = require('fs');
const path = require('path');

router.post('/upload', (ctx) => {
  const file = ctx.request.files.file;
  const readStream = fs.createReadStream(file.path)
  const writeStream = fs.createWriteStream(path.resolve('upload', file.name))
  readStream.pipe(writeStream)
  ctx.body = true
})

module.exports = router;
