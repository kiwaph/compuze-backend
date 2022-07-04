import validator from 'validator';

export function isEmailValid(email) {
  return validator.isEmail(email);
}

export function isUsernameValid(username) {
  if (username.length < 3) {
    return false;
  }

  return validator.isAlphanumeric(username);
}

export function isPhoneValid(phone) {
  if (phone.charAt(0) == 0) {
    phone = phone.substring(1);
  }

  return validator.isMobilePhone(phone, ['ar-LB']);
}

export function isPasswordValid(password) {
  if (password.length < 6) {
    return false;
  }
  return true;
}

export function isPriceValid(price) {
  return validator.isDecimal(price);
}

