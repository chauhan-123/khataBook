const jwt = require('jsonwebtoken')
const config = require('../model/config');

let auth = (req, res, next) => {
  console.log(req.headers)

  let token = req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, config.secret, (error, decoded) => {
      if (error) {
        return res.status(500).json({
          message: 'Token is expired',
          success: false
        })
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(500).json({
      success: true,
      message: 'Auth token is not supplied'
    });
  }
};





module.exports = auth