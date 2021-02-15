const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../utilities/validators');
const User = require('../../models/User');
const { JWT_SECRET } = require('../../config');

function createToken(user) {
  return jwt.sign({
    id: user._id,
    email: user.email,
    username: user.username
  }, JWT_SECRET, { expiresIn: '1h'});
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (e) {
        throw new Error(e);
      }
    }
  },
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if(!valid) {
        throw new UserInputError('Wrong credentials', { errors });
      }
      const user = await User.findOne({ username })
      // Check failures
      if(!user) {
        errors.notFound = 'User does not exist';
        throw new UserInputError('User not found', errors);
      }
      const passwordMath = await bcrypt.compare(password, user.password);
      if(!passwordMath) {
        errors.passwordDoesNotMatch = 'Wrong creds';
        throw new UserInputError('Wrong creds', errors);
      }
      // Correct username / password
      const token = createToken(user);
      // Proceed
      return {
        ...user._doc,
        id: user._id,
        token
      }
    },
    async register(_, { registerInput: { username, email, password, confirmPassword} }) {
      // Validate
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
      if(!valid) {
        throw new UserInputError('Error(s) occured: ', { errors });
      }
      // User exist?
      const user = await User.findOne({ username });
      const emailTaken = await User.findOne({ email });
      if(user) {
        // Throw error is user is !== null
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        })
      } else if(emailTaken) {
        // Throw error is user is !== null
        throw new UserInputError('Email is taken', {
          errors: {
            username: 'This Email is taken'
          }
        })
      }
      // Hash
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });
      const res = await newUser.save();
      // generate token
      const token = createToken(res);
      // Done, return token & doc props
      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}