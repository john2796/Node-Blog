const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateUserPost(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";

  if (!Validator.isLength(data.name, { min: 2, max: 200 })) {
    errors.name = "name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
//More OPTIONS
// // ordering matteres on which statement will return
// // check for password and password2 does not match
// if (!Validator.equals(data.password, data.password2)) {
//   errors.password2 = 'Passwords must matched';
// }
// // check for if email is not valid
// if (!Validator.isEmail(data.email)) {
//   errors.email = 'Email is invalid';
// }
//   // if is not empty then ...
//   if (!isEmpty(data.website)) {
//     if (!Validator.isURL(data.website)) {
//       // if is not a url
//       errors.website = 'Not a valid URL';
//     }
//   }
