

exports.list_all_users = (req, res) => {
  User.find({}, (err, data) => {
    if(err){
      res.send(err);
    } else {
      res.send(data);
    }
  });
};
// 查询单个用户
exports.get_a_user = (req, res) => {
  let user_id = req.params.id;
  User.findById(user_id, (err, data) => {
    if(err){
      res.send(err);
    } else {
      res.send(data);
    }
  })
};

// 创建用户
exports.create_a_user = (req, res) => {
  let new_user = new User(req.body);
  User.findByName(new_user.name, (err, data) => {
    if(data){
      res.send(data);
    }
  }).then(checkEmail(new_user.email, (err, data) => {
    if(data){
      res.send('邮箱已被注册');
      return 0;
    }
  })).then(new_user.save((err, data) => {
      if(err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }));
};

// 更新用户
exports.update_a_user = (req, res) => {
  let user_id = req.params.id;
  User.findOneAndUpdate({id: user_id}, req.body, 
    {new: true}, (err, data) => {
      if(err){
        res.send(err);
      } else {
        res.send(data);
      }
    });
};

// 删除用户
exports.delete_a_user = (req, res) => {
  res.send('delete');
};


// 判断用户名是否已存在
let checkUser = user_name => {
  User.findByName(user_name, (err, data) =>{
    console.log(data);
  });
}
// 判断邮箱是否已注册
let checkEmail = user_email => {
  let email = User.findByEmail(user_email);
  if(email){
    return 1
  }
  return 0;
}