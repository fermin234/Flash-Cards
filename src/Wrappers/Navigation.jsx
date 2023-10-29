import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/navigation.constants';
import SignUp from '../screens/SignUp.screen';

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.signUp}>
        <Stack.Screen
          name={ROUTES.signUp}
          component={SignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;