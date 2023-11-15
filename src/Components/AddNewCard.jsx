import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Button, FAB, Overlay } from '@rneui/base'
import useModal from '../hooks/modal'
import { useForm } from '../hooks/form'
import { cards } from '../api/db'
import { useUser } from '../hooks/auth'
import { useRoute } from '@react-navigation/native'

const baseState = () => ({
  front: "",
  back: "",
  deail: ""
})

const AddNewCard = () => {

  const [user] = useUser()
  const { visible, hide, show } = useModal()
  const [form, setForm] = useForm(baseState)
  const route = useRoute()
  // const { id: categoryId } = route.params.category;

  const addNewCard = () => {
    cards.add({
      ...form,
      // categoryId,
      userId: user.uid
    })
    hide()
  }

  return (
    <View>
      <FAB
        icon={{ name: 'add' }}
        style={{ backgroundColor: "red" }}
        onPress={show}
      ></FAB>

      <Overlay
        isVisible={visible}
        onBackdropPress={hide}
        overlayStyle={{ backgroundColor: "white" }}
      >
        <View>
          <TextInput value={form.front} onChange={(value) => { setForm({ key: "front", value }) }} placeholder='Front...' ></TextInput>
          <TextInput value={form.back} onChange={(value) => { setForm({ key: "back", value }) }} placeholder='Back...' ></TextInput>
          <TextInput value={form.detail} onChange={(value) => { setForm({ key: "detail", value }) }} placeholder='Detail...' ></TextInput>

          <View>
            <Button title="Add" onPress={addNewCard} />
            <Button title="Close" onPress={hide} />
          </View>

        </View>

      </Overlay>
    </View>
  )
}

export default AddNewCard

const styles = StyleSheet.create({})