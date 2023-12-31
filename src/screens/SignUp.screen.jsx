import { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../api/db';
import { useUser } from '../hooks/auth';
import { COLORS, FONT, COMPONENT, SIZE } from '../constants/style.contstants';
import { Icon, Button } from '@rneui/base';
import useValidate from '../hooks/validate';
import { ROUTES } from '../constants/navigation.constants'
import { MESSAGES } from '../constants/errors.contstants'
import to from 'await-to-js';

const baseState = () => ({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState(baseState());
  const { validateForm, validatePasswords } = useValidate()
  const [user, setUser] = useUser()
  const [visibilityPasswords, setVisibilityPasswords] = useState({
    password: false,
    confirmPassword: false
  })
  const [errors, setErrors] = useState({
    name: 'Name is required.',
    email: 'Enter a valid email.',
    password: 'Password is required.',
    confirmPassword: 'Passwords do not match.',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    validateForm(name, value, errors, setErrors)
  };

  const handleOnBlur = (name) => {
    if (name === "password" || name === "confirmPassword") {
      const password = formData.password
      const confirmPassword = formData.confirmPassword
      const isValid = validatePasswords(password, confirmPassword, errors, setErrors)
      if (isValid) {
        setErrors({
          ...errors,
          password: "",
          confirmPassword: "",
        })
      }
      return
    }
    const value = formData[name]
    validateForm(name, value, errors, setErrors)
  }

  const handleSubmit = async () => {
    const formIsValid = Object.values(errors).every((error) => error.length === 0);

    if (formIsValid) {
      const [signUpError, userCredentials] = await to(
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
      );

      if (signUpError) {
        const { code } = signUpError;
        setErrors({ ...errors, "auth": MESSAGES[code] || code });
      } else {

        if (formData.name) {
          await updateProfile(auth.currentUser, {
            displayName: formData.name,
          });
        }

        setFormData(baseState());
        setUser(userCredentials.user);
        sendEmailVerification(auth.currentUser).then(() => {
          Alert.alert("Email verification link sent")
        })
        navigation.navigate(ROUTES.login);
      }
    } else {
      console.error('Error en el formulario. Por favor, verifica los campos.');
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputAllContainer}>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Name'
              style={errors.name ? styles.inputError : styles.input}
              value={formData.name}
              onChangeText={(value) => handleChange('name', value)}
              onBlur={() => handleOnBlur('name')}
            />
            <Icon name="error" color={COLORS.danger} style={!errors.name && { opacity: 0 }} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Email'
              style={errors.email ? styles.inputError : styles.input}
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              onBlur={() => handleOnBlur('email')}
            />
            <Icon name="error" color={COLORS.danger} style={!errors.email && { opacity: 0 }} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Password'
              style={errors.password ? styles.inputError : styles.input}
              value={formData.password}
              ref={element => this.flatlist = element}
              onChangeText={(value) => handleChange('password', value)}
              onBlur={() => handleOnBlur('password')}
              secureTextEntry={!visibilityPasswords.password}
            />


            <View style={{ display: errors.password ? "flex" : "none" }}>
              <Icon name="error" color={COLORS.danger} />
            </View>
            <Icon
              name={visibilityPasswords.password ? "visibility" : "visibility-off"}
              onPress={() => setVisibilityPasswords({ ...visibilityPasswords, "password": !visibilityPasswords.password })}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Confirm Password'
              style={errors.confirmPassword ? styles.inputError : styles.input}
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              onBlur={() => handleOnBlur('confirmPassword')}
              secureTextEntry={!visibilityPasswords.confirmPassword}
            />

            <View style={{ display: errors.confirmPassword ? "flex" : "none" }}>
              <Icon name="error" color={COLORS.danger} />
            </View>
            <Icon
              name={visibilityPasswords.confirmPassword ? "visibility" : "visibility-off"}
              onPress={() => setVisibilityPasswords({ ...visibilityPasswords, "confirmPassword": !visibilityPasswords.confirmPassword })}
            />
          </View>

        </View>

        {!Object.values(errors).every((error) => error.length === 0) &&
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{errors.name || errors.email || errors.password || errors.confirmPassword || errors.auth}</Text>
            <Icon style={styles.iconError} name="error" color={COLORS.danger} />
          </View>
        }

        <Button
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          title="Sign Up"
          onPress={handleSubmit}
          disabled={!Object.values(errors).every((error) => error.length === 0)}
        />

        <Button
          buttonStyle={styles.link}
          titleStyle={styles.linkTitle}
          title="Login instead"
          onPress={() => navigation.navigate(ROUTES.login)}
        />
      </View>
    </View >
  );
};

const input = {
  flex: 1,
  ...COMPONENT.input,
  color: COLORS.textLight,
  marginRight: SIZE.sm,
  color: COLORS.text,
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: COLORS.main,
    padding: SIZE.lg,
    height: '100%',
  },
  inner: {
    backgroundColor: COLORS.bacground,
    padding: SIZE.lg,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: SIZE.md,
    flex: 1,
  },
  title: {
    ...FONT.h1,
    marginBottom: SIZE.lg,
  },
  inputAllContainer: {
    marginBottom: SIZE.lg,
  },
  button: {
    ...COMPONENT.button,
    ...COMPONENT.button.main.button,
    alignSelf: "center",
    marginBottom: SIZE.lg
  },
  buttonTitle: {
    ...COMPONENT.button.title,
    ...COMPONENT.button.main.title,
  },
  link: {
    backgroundColor: "transparent"
  },
  linkTitle: {
    ...FONT.sub
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    ...input
  },
  inputError: {
    ...input,
    ...COMPONENT.input,
    borderBottomColor: COLORS.danger,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZE.sm
  },
  error: {
    textAlign: 'center',
    marginRight: 5,
  },
  iconError: {
    marginLeft: 5,
  },
});

export default SignUp;
