import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ROUTES } from '../constants/navigation.constants';
import SignUp from '../screens/SignUp.screen';

const Stack = createNativeStackNavigator()

const Navigation = (params) => {
  return (
    <NavigationContainer>
      <Stack.Navigatior>
        <Stack.Screen component={SignUp} name={ROUTES.signUp}>

        </Stack.Screen>
      </Stack.Navigatior>
    </NavigationContainer>
  )
}

export default Navigation;