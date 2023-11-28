export const passwordValidate = ({ currentPassword, newPassword }) => {
  if (!currentPassword) return "no-current-password";

  if (!newPassword) return "no-new-password";

  if (currentPassword.length < 8 || newPassword.length < 8)
    return "Password length > 7";

  return "";
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

  if (password.length < 6) {
    return "Password must be at least 8 characters long.";
  }

  if (password !== passwordConfirmation) {
    return "Passwords do not match.";
  }

  return "";
};
