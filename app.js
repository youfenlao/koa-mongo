
const Koa = require('koa');
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');


const userRouter = require('./routers/user');
const todoRouter = require('./routers/todo')
const config = require('./config');

const app = new Koa();


mongoose.connect("mongodb://127.0.0.1:27017/testDB", err => {
  if (err) {
    console.log("数据库连接失败！")
  } else {
    console.log("数据库连接成功！")
  }
});

app.use(bodyParser());
app.use(cors());


app.use(userRouter.routes());
app.use(todoRouter.routes());


app.listen(config.port)
console.log(`app started at port ${config.port}...`);
