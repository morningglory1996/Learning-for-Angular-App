'use strict'
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model/user');


function notAuthorized(res) {
  return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'ログインしてください' }]});
}

exports.authMiddleware = function(req, res, next) {

  const token = req.headers.authorization;

  if(!token) {
    return notAuthorized(res);
  }

  jwt.verify(token.split(' ')[1], config.SECRET, function(err, decodedToken) {
    if(err) {
      return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'トークンが正しくありません' }]});
    }

    User.findById(decodedToken.userId, function(err, foundUser) {
      if(err) {
        return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'トークンが正しくありません' }]});
      }

      if(!foundUser) {
        return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'ユーザーが見つかりません' }]});
      }

      next();
    });
  });
};