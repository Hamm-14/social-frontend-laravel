export const REGEX = {
  PHONE_NUM_REGEX: /^\d{10}$/,
  AUCTION_NUM_REGEX: /^[\d]{5,}$/,
  LOWERCASE_REGEX: /\w*[a-z]\w*/,
  UPPERCASE_REGEX: /\w*[A-Z]\w*/,
  DIGIT_REGEX: /\d/,
  SPECIAL_CHAR_REGEX: /[!@#$%^&*()\-_"=+{}; :,<.>]/,
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/,
};
