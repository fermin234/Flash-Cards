export default useValidate = () => {
  const validatePasswords = (password, confirmPassword, errors, setErrors) => {
    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match.",
        password: "Passwords do not match.",
      });
      return;
    } else {
      return true;
    }
  };

  const passwordValidate = (value, key, errors, setErrors) => {
    if (value.length < 8)
      return setErrors({
        ...errors,
        [key]: "Password must be at least 8 characters.",
      });
    setErrors({
      ...errors,
      [key]: "",
      auth: "",
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = (name, value, errors, setErrors) => {
    switch (name) {
      case "name":
        setErrors({
          ...errors,
          auth: "",
          [name]: value.length < 3 ? `${name} is required.` : "",
        });
        break;
      case "email":
        setErrors({
          ...errors,
          auth: "",
          email: validateEmail(value) ? "" : "Enter a valid email.",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          auth: "",
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
          auth: "",
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

  return { passwordValidate, validatePasswords, validateEmail, validateForm };
};
