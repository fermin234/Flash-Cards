import { Button } from '@rneui/base';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../api/db';
import { MESSAGES } from '../constants/errors.contstants';
import { ROUTES } from '../constants/navigation.constants';
import { COLORS, COMPONENT, FONT } from '../constants/style.contstants';
import { useUser } from '../hooks/auth';
import { useForm } from '../hooks/form';
import to from 'await-to-js';

const baseState = () => ({
  email: '',
  password: '',
});

const Login = ({ navigation }) => {
  const [user, setUser] = useUser();
  const [form, setForm] = useForm(baseState());

  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);

  const { email, password } = form;

  const doLogin = useCallback(async () => {
    const [loginError, userCredentials] = await to(
      signInWithEmailAndPassword(auth, form.email, form.password)
    );

    if (loginError) {
      const { code } = loginError;
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
    const { email, password } = form;

    setValid(() => {
      if (!email.length || !password.length) {
        return false;
      }

      if (password.length < 6) return false;

      return true;
    });
  }, [form]);

  useEffect(() => {
    setError(null);
  }, [form, setError]);

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.title}>Welcome{'\n'}Back</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={error ? styles.inputError : styles.input}
            placeholder="Email Address"
            value={email}
            textContentType="emailAddress"
            onChangeText={(value) => setForm({ key: 'email', value })}
          />
          <TextInput
            style={error ? styles.inputError : styles.input}
            placeholder="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            onChangeText={(value) => setForm({ key: 'password', value })}
          />

          <Button
            titleStyle={FONT.button}
            buttonStyle={styles.button}
            title="Login"
            onPress={doLogin}
            disabled={!valid}
          />
          {error && <Text style={styles.error}>{error}</Text>}
        </View>


        <Button
          buttonStyle={styles.link.button}
          titleStyle={styles.link.title}
          title="Sign up instead"
          onPress={() => navigation.navigate(ROUTES.signup)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: COLORS.highlight,
    padding: 30,
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
  inputError: {
    borderBottomColor: COLORS.error,
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
    ...COMPONENT.error,
  }
});

export default Login
