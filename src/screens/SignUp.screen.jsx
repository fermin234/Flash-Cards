import React, { useEffect, useState, useCallback } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { Button, Icon } from '@rneui/base';
import { COLORS, FONT, COMPONENT, SIZE } from '../constants/style.contstants';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../api/db';
import { MESSAGES } from '../constants/errors.contstants';
import { ROUTES } from '../constants/navigation.constants';
import { useUser } from '../hooks/auth';
import { useForm } from '../hooks/form';
import to from 'await-to-js';
import { validateSignUp } from '../hooks/validate';

const baseState = () => ({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
});

const SignUp = ({ navigation }) => {
  const [user, setUser] = useUser();
  const [form, setForm] = useForm(baseState());

  const [error, setError] = useState(null);

  const { name, email, password, passwordConfirmation } = form;

  const doSignUp = useCallback(async () => {
    try {

      if (password.trim() !== passwordConfirmation.trim()) {
        return setError("Passwords do not match.");
      }

      if (error) return

      const [signUpError, userCredentials] = await to(
        createUserWithEmailAndPassword(auth, form.email, form.password)
      );

      if (signUpError) {
        const { code } = signUpError;
        setError(MESSAGES[code] || code);
      } else {

        if (form.name) {
          await updateProfile(auth.currentUser, {
            opacityName: form.name,
          });
        }

        setForm(baseState());
        setUser(userCredentials.user);
        sendEmailVerification(auth.currentUser).then(() => {
          Alert.alert("Email verification link sent")
        })
        navigation.navigate(ROUTES.login);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('An unexpected error occurred.');
    }
  }, [form, setError, navigation, setUser]);

  const errorsState = (form) => ({
    name: form.name.length < 3,
    email: !/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(form.email),
    password: form.password.length < 8,
    passwordConfirmation: passwordConfirmation === "" || form.password !== form.passwordConfirmation,
  });

  const [errorInput, setErrorInput] = useState(errorsState(form))

  //Verificador de acount.
  useEffect(() => {
    if (user && user?.emailVerified)
      navigation.navigate(ROUTES.categories);
  }, [navigation, user]);

  //Validador de formulario
  useEffect(() => {
    const code = validateSignUp(form);
    setError(code !== "" ? MESSAGES[code] : null);
  }, [form, doSignUp]);

  //Validador de formulario para controlar los icons de los inputs
  useEffect(() => {
    setErrorInput(errorsState(form))
  }, [form]);

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputAllContainer}>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Name'
              textContentType='name'
              value={name}
              style={errorInput.name ? styles.inputError : styles.input}
              onChangeText={(value) => setForm({ key: 'name', value })}
            />
            <Icon name="error" color={COLORS.danger} style={!errorInput.name && { opacity: 0 }} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Email Address'
              textContentType='emailAddress'
              value={email}
              style={errorInput.email ? styles.inputError : styles.input}
              onChangeText={(value) => setForm({ key: 'email', value })}
            />
            <Icon name="error" color={COLORS.danger} style={!errorInput.email && { opacity: 0 }} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={errorInput.password ? styles.inputError : styles.input}
              placeholder="Password"
              value={password}
              textContentType="password"
              secureTextEntry
              onChangeText={(value) => setForm({ key: 'password', value })}
            />
            <Icon name="error" color={COLORS.danger} style={!errorInput.password && { opacity: 0 }} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={errorInput.passwordConfirmation ? styles.inputError : styles.input}
              placeholder="Confirm Password"
              value={passwordConfirmation}
              textContentType="password"
              secureTextEntry
              onChangeText={(value) =>
                setForm({ key: 'passwordConfirmation', value })
              }
            />
            <Icon name="error" color={COLORS.danger} style={!errorInput.passwordConfirmation && { opacity: 0 }} />
          </View>
        </View>

        {error &&
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{error}</Text>
            <Icon style={styles.iconError} name="error" color={COLORS.danger} />
          </View>
        }

        <Button
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          title="Sign Up"
          onPress={doSignUp}
        />

        <Button
          buttonStyle={styles.link}
          titleStyle={styles.linkTitle}
          title="Login instead"
          onPress={() => navigation.navigate(ROUTES.login)}
        />
      </View>
    </View >
  )
}

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
  },
  error: {
    textAlign: 'center',
    marginRight: 5,
  },
  iconError: {
    marginLeft: 5,
  },
});

export default SignUp