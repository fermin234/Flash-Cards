import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../constants/navigation.constants';
import { COLORS, FONT, SIZE, COMPONENT } from '../constants/style.contstants'
import { useCards } from '../hooks/data';
import { Button } from '@rneui/base';
import { pluralize } from '../utils/text';

const CategoryCard = ({ category, even }) => {
  const navigation = useNavigation();
  const { name, id } = category;
  const cardStyle = styles[even ? 'even' : 'odd']
  const cards = useCards(id)

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ROUTES.cards.name, { category })}
      style={[styles.card, cardStyle.card]}
      activeOpacity={0.8}
    >
      <Text style={[styles.title, cardStyle.title]}>{name}</Text>
      {
        !!cards.length &&
        <Button
          titleStyle={[styles.buttonTitle, cardStyle.buttonTitle]}
          buttonStyle={[styles.button, cardStyle.button]}
          title={pluralize({ quantity: cards.length, text: "Card" })}
        />
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  opacity: COLORS.mainDarker,
  card: {
    borderRadius: SIZE.sm,
    padding: SIZE.lg,
    backgroundColor: "#d7d7d7",
    marginBottom: SIZE.lg,
  },
  title: {
    ...FONT.h3
  },
  button: {
    ...COMPONENT.button,
    width: "auto",
    paddingHorizontal: SIZE.lg,
    alignSelf: "flex-end",
    marginTop: SIZE.sm
  },
  buttonTitle: {
    ...COMPONENT.button.title
  },
  odd: {
    opacity: COLORS.highlight,
    card: {
      backgroundColor: COLORS.main
    },
    title: {
      color: COLORS.textLight
    },
    button: {
      ...COMPONENT.button.highlight.button
    },
    buttonTitle: {
      ...COMPONENT.button.highlight.title,
      color: COLORS.main
    },
  },
  even: {
    card: {
      backgroundColor: COLORS.highlight
    },
    title: {
      color: COLORS.main.button
    },
    button: {
      ...COMPONENT.button.main.button
    },
    buttonTitle: {
      ...COMPONENT.button.main.title,
      color: COLORS.highlight
    },
  },
})

export default CategoryCard