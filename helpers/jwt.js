const expressJwt = require('express-jwt');

function authJwt() {
  return expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      `${process.env.API_URL}/user/login`,
      `${process.env.API_URL}/user/register`,
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isLoggedIn) {
    return done(null, true);
  }

  done();
}

module.exports = authJwt;
