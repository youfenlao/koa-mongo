const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  nickname: String,
  age: String,
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
})

module.exports = mongoose.model('user', userSchema)
