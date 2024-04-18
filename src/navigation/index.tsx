// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouterNames } from '@common';
import { SignIn, SignUp } from '@screens/authenticate';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RouterNames.HOME_SCREEN}>
        <Stack.Screen name={RouterNames.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={RouterNames.SIGN_IN} component={SignIn} />
        <Stack.Screen name={RouterNames.SIGN_UP} component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
