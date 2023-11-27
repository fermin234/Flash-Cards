import React, { useEffect, useState, useCallback } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from '@rneui/base';
import { COLORS, FONT, COMPONENT, SIZE } from '../constants/style.contstants';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../api/db';
import { MESSAGES } from '../constants/errors.contstants';
import { ROUTES } from '../constants/navigation.constants';
import { useUser } from '../hooks/auth';
import { useForm } from '../hooks/form';
import to from 'await-to-js';

const baseState = () => ({
  email: '',
  password: '',
  passwordConfirmation: '',
});

const SignUp = ({ navigation }) => {
  const [user, setUser] = useUser();
  const [form, setForm] = useForm(baseState());

  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);

  const { email, password, passwordConfirmation } = form;

  const doSignUp = useCallback(async () => {
    const [signUpError, userCredentials] = await to(
      createUserWithEmailAndPassword(auth, form.email, form.password)
    );

    if (signUpError) {
      const { code } = signUpError;
      setError(MESSAGES[code] || code);
    } else {
      setForm(baseState());
      setUser(userCredentials.user);

      sendEmailVerification(auth.currentUser).then(() => {
        Alert.alert("Email verification link sent")
      })

      // navigation.navigate(ROUTES.categories);
    }
  }, [form, setError, navigation, setUser]);

  // useEffect(() => {
  //   if (user) navigation.navigate(ROUTES.categories);
  // }, [navigation, user]);

  useEffect(() => {
    const { email, password, passwordConfirmation } = form;

    setValid(() => {
      if (!email.length || !password.length || !passwordConfirmation.length) {
        return false;
      }

      if (password.length < 6) return false;

      if (password !== passwordConfirmation) return false;

      return true;
    });
  }, [form]);

  useEffect(() => {
    setError(null);
  }, [form, setError]);

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Email Address'
            textContentType='emailAddress'
            value={email}
            style={styles.input}
            onChangeText={(value) => setForm({ key: 'email', value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            onChangeText={(value) => setForm({ key: 'password', value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={passwordConfirmation}
            textContentType="password"
            secureTextEntry
            onChangeText={(value) =>
              setForm({ key: 'passwordConfirmation', value })
            }
          />
        </View>

        <Button
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          title="Sign Up"
          onPress={doSignUp}
          disabled={!valid}
        />

        {error && <Text style={styles.error}>{error}</Text>}

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

  inputContainer: {
    marginBottom: SIZE.lg,
  },

  input: {
    ...COMPONENT.input,
    borderBottomColor: COLORS.main,
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

  error: {
    textAlign: "center"
  }
});

export default SignUp