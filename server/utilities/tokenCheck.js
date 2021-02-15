const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = (context) => {
  const headerCheck = context.req.headers.authorization;
  if(!headerCheck) {
    throw new Error('No authorization header is present');
  } else {
    const actualToken = headerCheck.split('Bearer ')[1];
    if(!actualToken) {
      throw new Error('Token must be \'Bearer [token]\'');
    } else {
      try {
        // Check token
        const user = jwt.verify(actualToken, JWT_SECRET);
        return user;
      } catch (e) {
        throw new AuthenticationError('Invalid token :(');
      }
    }
  }
}