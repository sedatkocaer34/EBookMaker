var jwt = require('express-jwt');
var secret = require('../config').secret;

function getTokenFromHeader(req){
  
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        console.log(req.headers.authorization.split(' ')[1]);
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

var auth = {
  required: jwt({
    secret: secret,
    userProperty:'payload',
    algorithms: ['HS256'],
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secret,
    userProperty:'payload',
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;