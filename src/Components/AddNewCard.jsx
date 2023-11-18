import { StyleSheet, TextInput, View, Text } from 'react-native'
import React from 'react'
import { Button, FAB, Overlay } from '@rneui/base'
import useModal from '../hooks/modal'
import { useForm } from '../hooks/form'
import { cards } from '../api/db'
import { useUser } from '../hooks/auth'
import { useRoute } from '@react-navigation/native'
import { FONT, COLORS, COMPONENT } from '../constants/style.contstants'

const baseState = () => ({
  front: "",
  back: "",
  detail: ""
})

const AddNewCard = () => {

  const [user] = useUser()
  const { visible, hide, show } = useModal()
  const [form, setForm] = useForm(baseState())
  const route = useRoute()
  const { id: categoryId } = route.params.category;

  const handleAddNewCard = () => {
    cards.add({
      ...form,
      categoryId,
      userId: user.uid,
    });
    hide()
  }

  return (
    <View>
      <FAB
        icon={{ name: 'add', color: 'white' }}
        style={styles.button}
        color={COLORS.highlight}
        onPress={show}
      ></FAB>

      <Overlay
        isVisible={visible}
        onBackdropPress={hide}
        overlayStyle={styles.overlay}
      >
        <View>
          <Text style={styles.title}>New Card</Text>

          <TextInput
            style={styles.input}
            placeholderTextColor={COLORS.textLight}
            value={form.front}
            onChangeText={(value) => { setForm({ key: "front", value }) }}
            placeholder='Front...'
          >
          </TextInput>
          <TextInput
            style={styles.input}
            placeholderTextColor={COLORS.textLight}
            value={form.back}
            onChangeText={(value) => { setForm({ key: "back", value }) }}
            placeholder='Back...'
          >
          </TextInput>
          <TextInput
            style={styles.input}
            placeholderTextColor={COLORS.textLight}
            value={form.detail}
            onChangeText={(value) => { setForm({ key: "detail", value }) }}
            placeholder='Detail...'
          >
          </TextInput>

          <Button
            titleStyle={styles.sendTitle}
            buttonStyle={styles.send}
            title="Add"
            onPress={handleAddNewCard} />
        </View>

      </Overlay>
    </View>
  )
}

export default AddNewCard

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    marginBottom: 36,
  },
  overlay: {
    width: '80%',
    backgroundColor: COLORS.main,
    padding: 36,
    borderRadius: 12,
  },
  title: {
    ...FONT.h3,
    color: COLORS.textLight,
  },
  input: {
    borderBottomColor: COLORS.textLight,
    borderBottomWidth: 1,
    color: COLORS.textLight,
    marginVertical: 12,
    padding: 12,
    paddingBottom: 6,
  },
  send: {
    ...COMPONENT.button.highlight,
    width: '40%',
    alignSelf: 'flex-end',
    marginTop: 24,
  },
  sendTitle: {
    ...FONT.button,
    color: COLORS.main,
  },
});