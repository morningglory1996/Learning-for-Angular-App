'use strict'

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const config = require('../config');


router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if(!email) {
    return res.status(422).send({ errors: [{ title: 'User error', detail: 'Eメールを入力してください' }]});

  }
  if(!password) {
    return res.status(422).send({ errors: [{ title: 'User error', detail: 'パスワードを入力してください' }]});
  }

  User.findOne({ email }, (error, foundUser) => {
    if(error){
      return res.status(422).send({ errors: [{ title: 'User error', detail: '問題が発生しました' }]});
    }
    if(!foundUser) {
      return res.status(422).send({ errors: [{ title: 'User error', detail: 'ユーザーが見つかりません' }]});
    }
    if(!foundUser.hasSamePassword(password)) {
      return res.status(422).send({ errors: [{ title: 'User error', detail: 'パスワードが正しくありません' }]});
    }

    const token = jwt.sign({
      userId: foundUser.id,
      username: foundUser.username
      }, config.SECRET, { expiresIn: '1h' });;

    return res.json(token);
  })
});

router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // 上記と同じ
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;
  // const confirmPassword = req.body.confirmPassword;

  if(!username) {
    return res.status(422).send({ errors: [{ title: 'User error', detail: 'ユーザー名を入力してください' }]});
  }
  if(!email) {
    return res.status(422).send({ errors: [{ title: 'User error', detail: 'Eメールを入力してください' }]});

  }
  if(!password) {
    return res.status(422).send({ errors: [{ title: 'User error', detail: 'パスワードを入力してください' }]});
  }
  if(password !== confirmPassword) {
    return res.status(422).send({ errors: [{ title: 'User error', detail: '確認用パスワードを入力してください' }]});
  }
  
  User.findOne({ email }, (error, foundUser) => {
    if(error){
      return res.status(422).send({ errors: [{ title: 'User error', detail: '問題が発生しました' }]});
    }
    if(foundUser) {
      return res.status(422).send({ errors: [{ title: 'User error', detail: 'お使いのEメールはすでに使われてます' }]});
    }

    const user = new User({username, email, password});
    user.save((error) => {
      if(error){
        return res.status(422).send({ errors: [{ title: 'User error', detail: '問題が発生しました' }]});
      }
      return res.json({ "registerd": true })
    })
  })

});

module.exports = router;