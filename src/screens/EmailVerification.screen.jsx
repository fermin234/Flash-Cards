import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useUser } from '../hooks/auth'
import { ROUTES } from '../constants/navigation.constants'
import { COLORS, SIZE, FONT, COMPONENT } from '../constants/style.contstants'
import { Button, Icon } from '@rneui/base'

const EmailVerification = ({ navigation }) => {
  const [user, setUser] = useUser()

  const handleReLogin = () => {
    navigation.navigate(ROUTES.login)
  }

  useEffect(() => {
    if (!user)
      navigation.navigate(ROUTES.login)
  }, [user])

  if (user?.emailVerified) return null

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>

        <Icon size={60} name="warning" color={COLORS.mainDarker} />
        <Text style={styles.title}>Verification email sent!</Text>
        <Text style={styles.sub}>Please confirm email and re-login to proceed.</Text>

        <Button
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          title="Re-Login"
          onPress={handleReLogin}
        />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: COLORS.highlight,
    padding: SIZE.lg,
    height: '100%',
  },
  inner: {
    backgroundColor: COLORS.bacground,
    padding: SIZE.md,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: SIZE.md,
    flex: 1,
  },
  title: {
    ...FONT.h2,
    marginVertical: SIZE.lg,
    fontSize: 25,
    fontWeight: "900"
  },
  sub: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: SIZE.lg,
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
})

export default EmailVerification
