import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/navigation.constants';
import SignUp from '../screens/SignUp.screen';
import Categories from '../screens/Categories.screen';
import Login from '../screens/Login.screen';
import Cards from '../screens/Cards.screen';

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.login}>
        <Stack.Screen
          name={ROUTES.login}
          component={Login} />
        <Stack.Screen
          name={ROUTES.signup}
          component={SignUp}
        />
        <Stack.Screen
          name={ROUTES.categories}
          component={Categories}
        />
        <Stack.Screen
          name={ROUTES.cards.name}
          component={Cards} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;