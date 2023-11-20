import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Button, FAB, Overlay } from '@rneui/base'
import { COLORS, COMPONENT, FONT, SIZE } from '../constants/style.contstants'
import { useState, useEffect } from 'react'
import { useUser } from '../hooks/auth'
import { useModal } from '../hooks/modal'
import { categories } from '../api/db';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [user] = useUser();
  const { visible, show, hide } = useModal();

  const createCategory = () => {
    categories.add({
      name,
      userId: user.uid,
    });

    hide();
  };

  useEffect(() => {
    setName('');
  }, [visible]);

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
        overlayStyle={styles.overlay}
      >
        <View>
          <Text style={styles.title}>New category</Text>

          <TextInput
            style={styles.input}
            placeholder="Category name..."
            onChangeText={(value) => setName(value)}
            value={name}
            placeholderTextColor={COLORS.detailLight}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Close"
              titleStyle={styles.closeTitle}
              buttonStyle={styles.close}
              onPress={hide}
            />
            <Button
              titleStyle={styles.sendTitle}
              buttonStyle={styles.send}
              title="Add"
              onPress={createCategory}
              disabled={!name.length}
            />
          </View>

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

  send: {
    ...COMPONENT.button,
    ...COMPONENT.button.highlight.button,
    width: "auto"
  },

  sendTitle: {
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

export default AddCategory