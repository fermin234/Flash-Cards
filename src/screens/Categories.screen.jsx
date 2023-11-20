import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useCategories } from "../hooks/data";
import { FONT, SIZE } from '../constants/style.contstants'
import UserInfo from "../Wrappers/UserInfo";
import AddCategory from "../Components/AddCategory";
import CategoryCard from "../Components/CategoryCard";

const Categories = () => {
  const categories = useCategories()

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <UserInfo>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Flashcards</Text>
          <Text style={styles.subTitle}>Select your set</Text>
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
  textContainer: {
    marginBottom: SIZE.lg
  },
  title: {
    ...FONT.h2
  },
  subTitle: {
    ...FONT.sub
  },
});

export default Categories;
