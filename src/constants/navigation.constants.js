export const ROUTES = {
  login: "Login",
  signup: "Signup",
  emailVerification: "emailVerification",
  categories: "Categories",
  cards: {
    name: "Cards",
    params: (categoryId) => ({ categoryId }),
  },
};
