const express = require('express')
const Model = require('../model/model')
  // const log = require('../middleware/log')
var addSql = 'INSERT INTO user(username,password) VALUES(?,?)'

// 文章子应用
const registerApp = express()

// 加载注册页
registerApp.get('/', (req, res) => {
  res.render('register', { msg: '' })
})

// 实现注册操作
registerApp.post('/', async(req, res, next) => {
  // var response = {
  //   username: req.body.username,
  //   password: req.body.password
  // }
  const repeatUser = 'select * from user where username = ?';
  const ret = await Model.query(repeatUser, [req.body.username]);
  if (ret && ret.length) {
    res.render('register', { msg: '用户名已存在' });
    res.end();
    return;
  }
  const addSqlParams = [req.body.username, req.body.password]
  Model.query(addSql, addSqlParams).then(function(result) {
      if (result) {
        // console.log('[INSERT ERROR] - ', err.message)
        // res.end('1') //如果注册失败就给客户端返回0
        res.redirect('/login')
        res.end();
        return //如果失败了就直接return不会继续下面的代码
      } else {
        res.render('register', { msg: '服务器错误' })
      }
      // res.end('0') //如果注册成功就给客户端返回1
      // console.log('OK')
    })
    // console.log(response)
    //res.end(JSON.stringify(response));
})

module.exports = registerApp