import { useEffect, useState } from "react";
import { useUser } from "./auth";
import { categories as DBCategories, cards as DBCards } from "../api/db";

export const useCategories = () => {
  const [user] = useUser();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!user) return () => {};

    const query = DBCategories.where("userId", "==", user.uid);
    //googlear esto
    const unsub = query.onSnapshot((qs) => {
      const results = qs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //*****************************************************

      setCategories(results);
    });

    return unsub;
  }, [user]);

  return categories;
};

export const useCards = (categoryId) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const query = DBCards.where("categoryId", "==", categoryId);
    query.onSnapshot((qs) => {
      const results = qs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCards(results);
    });
  }, [categoryId]);

  return cards;
};
