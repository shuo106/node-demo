'use strict';
// user 路由
import express from 'express';
import UserC from '../controllers/user/userController';

const router = express.Router();
// 检查用户是否存在
router.post('/check-user', UserC.checkUser);
// 检查邮箱
router.post('/check-email', UserC.checkEmail);
router.post('/login', UserC.login);
router.post('/signin', UserC.signin);

router.post('/', (req, res, next) => {
  res.send(req.body);
  next();
});
export default router