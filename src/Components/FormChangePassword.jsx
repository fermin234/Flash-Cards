import { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { COLORS, COMPONENT, FONT, SIZE } from '../constants/style.contstants'
import { Button, Overlay, ListItem, Icon } from '@rneui/base'
import { useModal } from '../hooks/modal'
import { useChangePassword, useUser } from '../hooks/auth'
import { useForm } from '../hooks/form'
import useValidate from '../hooks/validate'

const formState = () => ({
  currentPassword: "",
  newPassword: ""
})

const passwordState = () => ({
  currentPassword: false,
  newPassword: false
})

const errorsState = () => ({
  currentPassword: "Current password is required.",
  newPassword: "New password is required.",
})

const FormChangePassword = () => {
  const { hide, show, visible } = useModal()
  const [passwordVisible, setPasswordVisible] = useForm(passwordState())
  const [errors, setErrors] = useState(errorsState())
  const [form, setForm] = useForm(formState())
  const { changePassword } = useChangePassword()
  const { passwordValidate } = useValidate()
  const [user] = useUser()

  const handleChangePassword = async () => {
    try {
      const result = await changePassword(user, form.currentPassword, form.newPassword)

      if (result.success) {
        hide()
      }
    } catch (err) {
      const code = err.message.match(/\((.*?)\)/)

      if (code[1] === "auth/invalid-login-credentials") {
        setErrors({
          ...errors,
          auth: "Current password is incorrect."
        })
        return
      }

      setErrors({
        ...errors,
        "auth": code[1]
      })
    }
  }

  const handleChangeInput = ({ value, key }) => {
    setForm({
      ...form,
      [key]: value
    })

    passwordValidate(value, key, errors, setErrors)
  }

  useEffect(() => {
    setForm(formState())
    setPasswordVisible(passwordState())
  }, [visible])

  useEffect(() => {
    () => {
      setErrors(errorsState())
    }
  }, [])

  return (
    <View>
      <Overlay
        isVisible={visible}
        onBackdropPress={hide}
        overlayStyle={styles.overlay}
      >
        <Text style={styles.title}>Change Password</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={errors.currentPassword ? styles.inputError : styles.input}
            placeholderTextColor={COLORS.detailLight}
            value={form.currentPassword}
            secureTextEntry={!passwordVisible.currentPassword}
            onChangeText={(value) => handleChangeInput({ key: "currentPassword", value })}
            placeholder='Current Password'
          />

          <Icon
            name={passwordVisible.currentPassword ? 'visibility' : 'visibility-off'}
            color={COLORS.text}
            onPress={() => setPasswordVisible({ key: "currentPassword", value: !passwordVisible.currentPassword })}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={errors.newPassword ? styles.inputError : styles.input}
            placeholderTextColor={COLORS.detailLight}
            value={form.newPassword}
            secureTextEntry={!passwordVisible.newPassword}
            onChangeText={(value) => handleChangeInput({ key: "newPassword", value })}
            placeholder='New Password'
          />

          <Icon
            name={passwordVisible.newPassword ? 'visibility' : 'visibility-off'}
            color={COLORS.text}
            onPress={() => setPasswordVisible({ key: "newPassword", value: !passwordVisible.newPassword })}
          />
        </View>

        {!Object.values(errors).every((error) => error.length === 0) &&
          <View style={styles.errorContainer}>
            <Text style={styles.textError}>{errors.currentPassword || errors.newPassword || errors.auth}</Text>
            <Icon name="error" color="#DC143C" />
          </View>
        }

        <Button
          title="Accept"
          titleStyle={styles.acceptTitle}
          buttonStyle={styles.accept}
          disabled={!(form.newPassword.length > 7 && form.currentPassword.length > 7 && Object.values(errors).every((error) => error.length === 0))}
          onPress={handleChangePassword}
        />
      </Overlay>

      <ListItem onPress={show}>
        <ListItem.Content>
          <ListItem.Title>Change password</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View >
  )
}

const input = {
  flex: 1,
  ...COMPONENT.input,
  borderBottomColor: COLORS.textLight,
  color: COLORS.textLight,
  marginRight: SIZE.sm,
  color: COLORS.text,
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZE.sm
  },
  overlay: {
    ...COMPONENT.dialog
  },
  title: {
    ...FONT.h3,
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: SIZE.lg,
  },
  input: {
    ...input
  },
  accept: {
    ...COMPONENT.button,
    ...COMPONENT.button.highlight.button,
    width: "auto"
  },
  acceptTitle: {
    ...COMPONENT.button.title,
    ...COMPONENT.button.highlight.title,
  },
  textError: {
    ...COMPONENT.error,
    color: "black",
    fontSize: 16
  },
  inputError: {
    ...input,
    ...COMPONENT.input,
    borderBottomColor: "red",
  },
  errorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginBottom: SIZE.sm,
  }
})

export default FormChangePassword
