import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useCategories } from "../hooks/data";
import { FONT } from '../constants/style.contstants'
import UserInfo from "../Wrappers/UserInfo";
import AddCategory from "../Components/AddCategory";
import CategoryCard from "../Components/CategoryCard";

const Categories = () => {
  const categories = useCategories()

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <UserInfo style={styles.a}>
        <View>
          <Text style={styles.h2}>Flashcards</Text>
          <Text style={styles.sub}>Select your set</Text>
        </View>

        <AddCategory />

        {categories.length ? (
          categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              even={index % 2}
            />
          ))
        ) : (
          <Text>Try adding a new category</Text>
        )}

      </UserInfo>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  h2: { ...FONT.h2 },
  sub: { ...FONT.sub },
  text: {
    fontSize: 25
  },
});

export default Categories;
