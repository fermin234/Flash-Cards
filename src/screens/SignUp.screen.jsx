import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from '@rneui/base';
import { COLORS, FONT, COMPONENT } from '../constants/style.contstants';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/db';
import to from 'await-to-js';
import { MESSAGES } from '../constants/errors.contstants';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../constants/navigation.constants';
import { useUser } from '../hooks/auth';
import { useForm } from '../hooks/form';

const baseState = () => ({
  email: '',
  password: '',
  passwordConfirmation: '',
});

const SignUp = () => {
  const navigation = useNavigation()

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
      auth.currentUser = userCredentials.user;
      setUser(userCredentials.user);
      navigation.navigate(ROUTES.categories);
    }
  }, [form, setError, navigation, setUser]);

  useEffect(() => {
    if (user) navigation.navigate(ROUTES.categories);
  }, [navigation, user]);

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

          <Button
            titleStyle={FONT.button}
            buttonStyle={styles.button}
            title="Sign Up"
            onPress={doSignUp}
            disabled={!valid}
          />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}

        <Button
          buttonStyle={styles.link.button}
          titleStyle={styles.link.title}
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
    padding: 36,
    height: '100%',
  },
  inner: {
    backgroundColor: 'white',
    borderRadius: 12,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 36,
  },
  input: {
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    marginBottom: 24,
    padding: 12,
    paddingBottom: 6,
  },
  title: {
    ...FONT.h1,
    marginBottom: 32,
  },
  button: {
    ...COMPONENT.button.main,
    marginVertical: 32,
    marginLeft: '10%',
  },
  link: {
    button: {
      backgroundColor: 'transparent',
    },
    title: {
      ...FONT.sub,
      fontSize: 14,
    },
  },
  inputContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  error: {
    textAlign: "center"
  }
});

export default SignUp


//rnfes