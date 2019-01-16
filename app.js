const path = require('path');
const Koa = require('koa');
const cors = require('koa-cors')
const bodyParser = require('koa-body');
const mongoose = require('mongoose');
const log4js = require('koa-log4');

const response_formatter = require('./middlewares/response_formatter');

const userRouter = require('./routers/user');
const todoRouter = require('./routers/todo')
const uploadRouter = require('./routers/upload')
const config = require('./config');

const app = new Koa();

const logDir = path.join(__dirname, 'logs')

try {
  require('fs').mkdirSync(logDir)
} catch (e) {
  if (e.code != 'EEXIST') {
    console.error('Could not set up log directory, error was: ', e)
    process.exit(1)
  }
}

log4js.configure(path.join(__dirname, 'log4js.json'), { cwd: logDir })
const logger = log4js.getLogger('app')


mongoose.connect("mongodb://127.0.0.1:27017/testDB", err => {
  if (err) {
    console.log("数据库连接失败！")
  } else {
    console.log("数据库连接成功！")
  }
});

app.use(async (ctx, next) => {
  const startTime = Date.now()
  await next()
  const endTime = Date.now()
  logger.info(`${ctx.method} ${ctx.url} - ${(endTime-startTime)/1000}ms`)
})

app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }))

app.use(bodyParser({
  multipart: true,
  formidable: {
      maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));
app.use(cors());
app.use(response_formatter('^/api'));

app.use(userRouter.routes());
app.use(todoRouter.routes());
app.use(uploadRouter.routes());


app.listen(config.port)
logger.info(`app started at port ${config.port}...`);
