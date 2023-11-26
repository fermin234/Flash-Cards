export const passwordValidate = ({ currentPassword, newPassword }) => {
  if (!currentPassword) return "no-current-password";

  if (!newPassword) return "no-new-password";

  if (currentPassword.length < 8 || newPassword.length < 8)
    return "Password length > 7";

  return "";
};
