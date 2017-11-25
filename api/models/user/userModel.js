'use strict';

import mongoose from 'mongoose';
import crypto from 'crypto'; // 加密

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    set: v => {
      let md5 = crypto.createHash('md5');
      md5.update(v);
      return md5.digest('hex');
    }
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: Number
  },
  create_at: {
    type: Date,
    default: Date.now
  }
});

// 添加静态方法
// 此处不用 => 函数 (this)
userSchema.statics.findByName = function(name, callback){
  return this.findOne({name: name}, callback);
}
userSchema.statics.findByEmail = function(email, callback){
  return this.findOne({email: email}, callback);
}

const User = mongoose.model('users', userSchema);
export default User