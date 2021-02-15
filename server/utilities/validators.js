module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  console.log("info: ", username, email, password, confirmPassword);
  const errors = {};
  if(username.trim() === '') {
    errors.username = 'Username must be longer than 0 characters'
  }
  if(email.trim() === '') {
    errors.email = 'email must be longer than 0 characters'
  } else {
    const emailExpressionTest = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{1,50})$/;
    if(!email.match(emailExpressionTest)) {
      errors.email = 'This is not a valid email';
    }
  }
  if(password === '') {
    errors.password = 'password must be longer than 0 characters'
  } else if(password !== confirmPassword) {
    errors.confirmPassword = 'Password does not match';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if(username.trim() === '') {
    errors.username = 'Username cant be empty'
  }
  if(password.trim() === '') {
    errors.password = 'Password cant be empty'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}