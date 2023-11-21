import { StyleSheet, TextInput, View, Text } from 'react-native'
import { Button, FAB, Overlay } from '@rneui/base'
import { useForm } from '../hooks/form'
import { cards } from '../api/db'
import { useUser } from '../hooks/auth'
import { useRoute } from '@react-navigation/native'
import { FONT, COLORS, COMPONENT, SIZE } from '../constants/style.contstants'
import useModal from '../hooks/modal'
import { useEffect, useState } from 'react'

const baseState = () => ({
  front: "",
  back: "",
  detail: ""
})

const AddNewCard = () => {
  const [user] = useUser()
  const { visible, hide, show } = useModal()
  const [form, setForm] = useForm(baseState())
  const [active, setActive] = useState(true)
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

  useEffect(() => {
    if (form.front.length && form.back.length) setActive(false)
    else setActive(true)
  }, [form])

  useEffect(() => {
    setForm(baseState())
  }, [visible])

  return (
    <View>
      <FAB
        icon={{ name: 'add', color: COLORS.textLight }}
        style={styles.fab}
        buttonStyle={{ backgroundColor: COLORS.highlight }}
        onPress={show}
      />

      <Overlay
        isVisible={visible}
        onBackdropPress={hide}
        overlayStyle={styles.overlay}>
        <Text style={styles.title}>New Card</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.detailLight}
          value={form.front}
          onChangeText={(value) => { setForm({ key: "front", value }) }}
          placeholder='Front...' />
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.detailLight}
          value={form.back}
          onChangeText={(value) => { setForm({ key: "back", value }) }}
          placeholder='Back...' />
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.detailLight}
          value={form.detail}
          onChangeText={(value) => { setForm({ key: "detail", value }) }}
          placeholder='Detail...' />

        <View style={styles.buttonContainer}>
          <Button
            title="Close"
            titleStyle={styles.closeTitle}
            buttonStyle={styles.close}
            onPress={hide}
          />
          <Button
            titleStyle={styles.addTitle}
            buttonStyle={styles.add}
            title="Add"
            onPress={handleAddNewCard}
            disabled={active}
          />
        </View>

      </Overlay>
    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: COLORS.highlight,
    alignSelf: "flex-end",
    marginBottom: SIZE.lg,
  },

  overlay: {
    ...COMPONENT.dialog
  },

  title: {
    ...FONT.h3,
    color: COLORS.textLight,
    marginBottom: SIZE.sm
  },

  input: {
    ...COMPONENT.input,
    borderBottomColor: COLORS.textLight,
    color: COLORS.textLight,
    marginBottom: SIZE.lg
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  add: {
    ...COMPONENT.button,
    ...COMPONENT.button.highlight.button,
    width: "auto"
  },

  addTitle: {
    ...COMPONENT.button.title,
    ...COMPONENT.button.highlight.title,
  },

  close: {
    ...COMPONENT.button,
    backgroundColor: "transparent",
    width: "auto",
    padding: 0
  },

  closeTitle: {
    ...COMPONENT.button.title,
    ...COMPONENT.button.highlight.title,
  },

});

export default AddNewCard
