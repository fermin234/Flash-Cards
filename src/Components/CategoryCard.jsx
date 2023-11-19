import { StyleSheet, TouchableOpacity, Text, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../constants/navigation.constants';
import { COLORS, FONT } from '../constants/style.contstants'

const CategoryCard = ({ category, even }) => {
  const navigation = useNavigation();
  const { name, id } = category;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ROUTES.cards.name, { category })}
      style={styles.card}
      activeOpacity={0.5}
    >
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    marginBottom: 24,
    borderRadius: 12,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 24,
    alignSelf: 'flex-end',
    borderRadius: 24,
  },
  title: {
    ...FONT.h3,
  },
  buttonText: {
    ...FONT.button,
  },

  even: {
    card: {
      backgroundColor: COLORS.highlight,
    },
    button: {
      backgroundColor: COLORS.main,
    },
    title: {
      color: COLORS.main,
    },
    buttonText: {
      color: COLORS.highlight,
    },
  },
  odd: {
    card: {
      backgroundColor: COLORS.main,
    },
    button: {
      backgroundColor: COLORS.highlight,
    },
    title: {
      color: COLORS.textLight,
    },
    buttonText: {
      color: COLORS.main,
    },
  },
})

export default CategoryCard