export const passwordValidate = (value, key, errors, setErrors) => {
  if (value.length < 8)
    return setErrors({
      ...errors,
      [key]: "Password must be at least 8 characters.",
    });
  setErrors({
    ...errors,
    [key]: "",
  });
};

export const validateSignUp = ({
  name,
  email,
  password,
  passwordConfirmation,
}) => {
  if (!name.length) {
    return "It is mandatory to enter the name.";
  }

  if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return "Incorrect email address.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (password !== passwordConfirmation) {
    return "Passwords do not match.";
  }

  return "";
};

export const validateEmail = (email) => {
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validateForm = (name, value, errors, setErrors) => {
  switch (name) {
    case "name":
      setErrors({
        ...errors,
        [name]: value.length < 3 ? `${name} is required.` : "",
      });
      break;
    case "email":
      setErrors({
        ...errors,
        email: validateEmail(value) ? "" : "Enter a valid email.",
      });
      break;
    case "password":
      setErrors({
        ...errors,
        [name]:
          value.length === 0
            ? `Password is required.`
            : value.length < 8
            ? `Password must be at least 8 characters.`
            : "",
      });
      break;
    case "confirmPassword":
      setErrors({
        ...errors,
        [name]:
          value.length === 0
            ? `Password confirm is required.`
            : value.length < 8
            ? `Password confirm must be at least 8 characters.`
            : "",
      });
      break;
    default:
      break;
  }
};
