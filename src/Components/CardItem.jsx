import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useEffect } from 'react'
import { FONT, COLORS } from '../constants/style.contstants'
import useModal from '../hooks/modal'

const CardItem = ({ card }) => {
  const { visible, toggle, show } = useModal(true)
  const { front, back, detail } = card

  useEffect(() => {
    show()
  }, [card])

  return (
    <TouchableOpacity
      underlayColor={COLORS.mainDarker}
      activeOpacity={0.5}
      style={styles.card}
      onPress={toggle}
    >

      {visible ? (
        <Text style={styles.title}>{front}</Text>
      ) : (
        <>
          <Text style={styles.title}>{back}</Text>
          <Text style={styles.sub}> {detail}</Text>
        </>
      )}

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 24,
    paddingVertical: 64,
    marginBottom: 48,
    borderRadius: 12,
    backgroundColor: COLORS.main,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: 200,
  },
  title: {
    ...FONT.h3,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  sub: {
    ...FONT.sub,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});

export default CardItem
