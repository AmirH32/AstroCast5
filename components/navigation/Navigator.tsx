import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import indexScreen from '@/app/index';
import forecastScreen from '@/app/forecast';
import infoScreen from '@/app/scoreInfo';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="index">
        <Stack.Screen 
          name="index" component={indexScreen} options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="forecast" component={forecastScreen} options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="scoreInfo" component={infoScreen} options={{ 
            headerShown: true, title: ' ', 
            headerStyle: {backgroundColor: '#221D34', shadowColor: 'transparent'}, headerTintColor: 'white', 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
