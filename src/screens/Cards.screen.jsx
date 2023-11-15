import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import AddNewCard from '../Components/AddNewCard'
import { useState } from 'react'
import { useEffect } from 'react'

const Cards = () => {

  const route = useRoute()
  const { category } = route.params;

  const [active, setActive] = useState(null)

  useEffect(() => {


  }, [])


  return (
    <View>
      <AddNewCard />
      <Text>Category: {category.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default Cards