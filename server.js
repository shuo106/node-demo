'use strict'
import express from 'express';
import bodyParser from 'body-parser'

import db from './mongodb/db';
import config from './config/mongo';
import router from './routes/index';

const app = express();
// 接受post请求
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1');
  if(req.method == 'OPTIONS'){
    res.send(200);
  } else {
    next();
  }
});

router(app);

app.listen(config.port, () =>{
  console.log('Server listening at: http://localhsot:%s', config.port);
});
