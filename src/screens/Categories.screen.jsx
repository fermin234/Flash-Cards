import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserInfo from "../Wrappers/UserInfo";
import AddCategory from "../Components/AddCategory";
import { useCategories } from "../hooks/data";
import AddNewCard from "../Components/AddNewCard";
import CategoryCard from "../Components/CategoryCard";

const Categories = () => {

  const categories = useCategories()

  return (
    <UserInfo>
      <AddCategory />
      <View>
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
        <AddNewCard />
      </View>
    </UserInfo>
  );
};

const styles = StyleSheet.create({});

export default Categories;
