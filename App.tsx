import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/pages/Splashscreen';
import Start from './src/pages/Start';
import SignUp from './src/pages/SignUp';
import React from 'react';
import SignIn from './src/pages/SignIn';

const stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="Splashscreen"
          component={Splash}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Start"
          component={Start}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
