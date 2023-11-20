import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import { useEffect } from 'react'
import { FONT, COLORS, SIZE } from '../constants/style.contstants'
import useModal from '../hooks/modal'

const CardItem = ({ card }) => {
  const { visible, toggle, show } = useModal(true)
  const { front, back, detail } = card

  useEffect(() => {
    show()
  }, [card])

  return (
    <TouchableHighlight
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

    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 250,
    backgroundColor: COLORS.main,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: SIZE.sm,
    marginBottom: SIZE.lg,
    paddingHorizontal: SIZE.sm,
  },
  title: {
    ...FONT.h3,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  sub: {
    ...FONT.sub,
    marginTop: SIZE.sm,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});

export default CardItem
