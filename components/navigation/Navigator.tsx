import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import indexScreen from '@/app/index';
import forecastScreen from '@/app/forecast';
import infoScreen from '@/app/scoreInfo';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" component={indexScreen} />
        <Stack.Screen name="forecast" component={forecastScreen} />
        <Stack.Screen name="scoreInfo" component={infoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
