'use strict';

import UserModel from '../../models/user/userModel';
import crypto from 'crypto';

// 查询所有用户

class User {
  constructor() {
    // super();
    this.signin = this.signin.bind(this);
    this.login = this.login.bind(this);
  }
  // 登录
  async login(req, res, next) {
    let { name, pashhhsword } = req.body;
    try {
      if (!name) {
        throw new Error('用户名参数错误');
      } else if (!password) {
        throw new Error('密码参数错误');
      }
      UserModel.findOne({ 'name': name, 'password': this.md5(password) }, (err, data) => {
        if (err) {
          res.send({
            status: 501,
            type: 'MONGODB_SAVE ERROR',
            message: '数据库添加用户失败'
          });
          return;
        } else if (data) {
          res.send({
            status: 200,
            type: 'LOGIN_OK',
            message: '登录成功',
            user: data
          });
          return next();
        } else {
          res.send({
            status: 501,
            type: 'LOGIN_ERROR',
            message: '登录失败',
          });
          return;
        }
      })
    } catch (err) {
      console.log('登录参数错误', err);
      res.send({
        status: 0,
        type: 'ERROR_QUERY',
        message: err.message
      });
    }
  }
  // 注册
  async signin(req, res, next) {
    let { name, password } = req.body;
    try {
      if (!name) {
        throw new Error('用户名错误');
      } else if (!password) {
        throw new Error('密码错误');
      }
      // await this.checkUser(req, res, next);
      // await this.checkEmail(req, res, next);
      UserModel.create(req.body, (err, data) => {
        if (err) {
          res.send({
            status: 501,
            type: 'MONGODB_SAVE ERROR',
            message: '数据库添加用户失败'
          });
          return next();
        } else {
          res.send({
            status: 200,
            type: 'OK',
            message: '添加用户成功'
          });
          return next();
        }
      });
    } catch (err) {
      console.log(err.message);
      res.send({
        status: 500,
        type: 'GET_ERROR_PARAM',
        message: err.message
      });
      return next();
    }
  }
  // 检查用户名是否已存在
  async checkUser(req, res, next) {
    if (!req.body.name) {
      res.send({
        status: 400,
        type: 'GET_ERROR_PARAM',
        message: '用户名不能为空'
      })
    } else {
      UserModel.findOne({ 'name': req.body.name }, (err, data) => {
        if (err) {
          res.send({
            status: 500,
            type: 'MONGODB_QUERY_ERROR',
            message: '数据库查询失败'
          });
        } else if (data) {
          res.send({
            status: 501,
            type: 'USER_HAS_EXIST',
            message: '用户已存在'
          });
        } else {
          res.send({
            status: 200,
            type: 'OK',
            message: '用户名可用'
          });
          // resolve(next());
        }
      });
    }
    return;
  }
  // checkUser()
  // 检查邮箱是否已被注册
  async checkEmail(req, res, next) {
    // if(!req.body.email){
    //   res.send({
    //     status: 400,
    //     type: 'GET_ERROR_PARAM',
    //     message: '邮箱不能为空'
    //   })
    // }
    UserModel.findOne({ 'email': req.body.email }, (err, data) => {
      if (err) {
        res.send({
          status: 500,
          type: 'MONGODB_QUERY_ERROR',
          message: '数据库查询失败'
        });
      } else if (data) {
        res.send({
          status: 501,
          type: 'EMAIL_HAS_EXIST',
          message: '邮箱已被注册'
        });
      } else {
        res.send({
          status: 200,
          type: 'OK',
          message: '邮箱可用'
        });
      }
    });
    return;
  }
  // 加密
  md5(password) {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}

export default new User();