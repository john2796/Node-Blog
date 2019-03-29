const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePosts(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 2, max: 200 })) {
    errors.text = "Text must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
