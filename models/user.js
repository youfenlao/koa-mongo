const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  nickname: String,
  age: String,
  sex: {type: String},
  updated: {type: Date},
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      dafault: Date.now()
    }
  }
}, {timestamps: true})

// setter 对age这个字段做二次处理
userSchema.path('age').set(function(v) {
  return v + '000'
})

// 每次保存都记录一下最后更新时间
userSchema.pre('save', function(next){
  console.log(99999);
  this.updated = Date.now();
  next();
});

// model的静态方法
userSchema.statics.findByUsername = function(nickname){
  return this.findOne({nickname});
};

module.exports = mongoose.model('user', userSchema)
