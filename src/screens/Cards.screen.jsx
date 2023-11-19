import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCards } from '../hooks/data'
import { Button } from '@rneui/base'
import { useCallback } from 'react'
import { FONT, COLORS, COMPONENT } from '../constants/style.contstants'
import { pluralize } from '../utils/text'
import UserInfo from '../Wrappers/UserInfo'
import AddNewCard from '../Components/AddNewCard'
import CardItem from '../Components/CardItem'

const Cards = ({ route }) => {
  const { id, name } = route.params.category;
  const cards = useCards(id);
  const [active, setActive] = useState(null)

  const showNewCard = useCallback(() => {
    if (!cards.length) return;

    if (cards.length === 1) {
      setActive(cards[0].id);
      return;
    }

    setActive((prev) => {
      let newId;

      do {
        newId = cards[Math.floor(Math.random() * cards.length)].id;
      } while (newId && newId === prev);

      return newId;
    });
  }, [setActive, cards]);

  useEffect(() => {
    if (active) return
    if (!cards.length) return;

    if (cards.length === 1) {
      setActive(cards[0].id)
    } else {
      showNewCard()
    }

  }, [cards])

  useEffect(() => {
    if (!active && cards.length) {
      showNewCard();
    }
  }, [cards, active, showNewCard]);

  const activeCard = cards.find(card => card.id === active)

  return (
    <UserInfo>
      <View>
        <Text style={styles.h2}>{name}</Text>
        <Text style={styles.sub}>
          {pluralize({ noun: 'Card', number: cards.length })}
        </Text>

        <AddNewCard />

        {!cards.length && (
          <Text style={styles.empty}>Try adding a card first...</Text>
        )}

        {active && <CardItem card={activeCard} />}

        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title="Next"
          disabled={cards.length < 2}
          onPress={showNewCard}
        />
      </View>
    </UserInfo>
  )
}

const styles = StyleSheet.create({
  h2: { ...FONT.h2 },
  sub: { ...FONT.sub },
  empty: { ...FONT.sub, textAlign: 'center', margin: 36 },
  button: {
    ...COMPONENT.button.highlight,
    alignSelf: 'center',
  },
  buttonTitle: {
    ...FONT.button,
    color: COLORS.main,
  },
});

export default Cards