import { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Icon } from '@rneui/base';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/db';
import { MESSAGES } from '../constants/errors.contstants';
import { ROUTES } from '../constants/navigation.constants';
import { COLORS, COMPONENT, FONT, SIZE } from '../constants/style.contstants';
import { useUser } from '../hooks/auth';
import { useForm } from '../hooks/form';
import to from 'await-to-js';
import useValidate from '../hooks/validate'

const baseState = () => ({
  email: '',
  password: '',
});

const errorsState = () => ({
  email: 'Email is required.',
  password: 'Password is required.',
});

const passwordState = () => ({
  password: false,
});

const Login = ({ navigation }) => {
  const [user, setUser] = useUser();
  const [form, setForm] = useForm(baseState());
  const [valid, setValid] = useState(false);
  const [errors, setErrors] = useState(errorsState());
  const { validateEmail, validateForm } = useValidate()
  const [visibilityPasswords, setVisibilityPasswords] = useState(passwordState())
  const { email, password } = form;

  const handleDoLogin = useCallback(async () => {
    const [loginError, userCredentials] = await to(
      signInWithEmailAndPassword(auth, form.email, form.password)
    );

    if (loginError) {
      const { code } = loginError;
      setErrors({ ...errors, "auth": MESSAGES[code] || code });
    } else {
      setForm(baseState());
      auth.currentUser = userCredentials.user;
      setUser(userCredentials.user);

      if (user && !user?.emailVerified)
        navigation.navigate(ROUTES.emailVerification);
    }

  }, [form, setErrors, navigation, setUser]);

  const handleChangeInput = ({ key, value }) => {
    setForm({ key, value })


    if (key === "email") {
      const isValid = validateEmail(value)

      isValid ? setErrors({
        ...errors,
        email: ""
      }) : setErrors({
        ...errors,
        email: "Email invalid."
      })

    } else {
      validateForm(key, value, errors, setErrors)
    }
  }

  useEffect(() => {
    if (user && user?.emailVerified)
      navigation.navigate(ROUTES.categories);

  }, [navigation, user]);

  useEffect(() => {
    const { email, password } = form;

    setValid(() => {
      if (!email.length || !password.length) {
        return false;
      }

      if (password.length < 8) return false;

      return true;
    });
  }, [form]);

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.title}>Welcome{'\n'}Back</Text>

        <View style={styles.inputAllContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={errors.email || errors.auth ? styles.inputError : styles.input}
              placeholder="Email Address"
              value={email}
              textContentType="emailAddress"
              onChangeText={(value) => handleChangeInput({ key: 'email', value })}
            />
            <Icon name="error" color={COLORS.danger} style={{ opacity: errors.email || errors.auth ? 1 : 0 }} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={errors.password || errors.auth ? styles.inputError : styles.input}
              placeholder="Password"
              value={password}
              textContentType="password"
              secureTextEntry={!visibilityPasswords.password}
              onChangeText={(value) => handleChangeInput({ key: 'password', value })}
            />

            <View style={{ display: errors.password || errors.auth ? "flex" : "none" }}>
              <Icon name="error" color={COLORS.danger} />
            </View>
            <Icon
              name={visibilityPasswords.password ? "visibility" : "visibility-off"}
              onPress={() => setVisibilityPasswords({ ...visibilityPasswords, "password": !visibilityPasswords.password })}
            />
          </View>

        </View>


        {!Object.values(errors).every((errors) => errors.length === 0) &&
          <View style={styles.errorContainer}>
            <Text>{errors.email || errors.password || errors.auth}</Text>
            <Icon name="error" color={COLORS.danger} />
          </View>
        }

        <Button
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          title="Login"
          onPress={handleDoLogin}
          disabled={!valid}
        />


        <Button
          buttonStyle={styles.link}
          titleStyle={styles.linkTitle}
          title="Sign up instead"
          onPress={() => navigation.navigate(ROUTES.signup)}
        />
      </View>
    </View>
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
    backgroundColor: COLORS.highlight,
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
  input: {
    ...input
  },
  inputError: {
    ...input,
    ...COMPONENT.input,
    borderBottomColor: COLORS.danger,
  },
  button: {
    ...COMPONENT.button,
    ...COMPONENT.button.highlight.button,
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
  errorContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZE.sm
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});


export default Login
