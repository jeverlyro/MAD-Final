import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/pages/Splashscreen';
import Onboarding from './components/Onboarding';
import SignUp from './src/pages/SignUp';
import React from 'react';
import SignIn from './src/pages/SignIn';
import Home from './src/pages/BottomTab/Home';
import LearnScreen from './src/pages/BottomTab/Learn';
import SimScreen from './src/pages/BottomTab/Simulation/Page1';
import ProfileScreen from './src/pages/BottomTab/Profile';
import FlashMessage from 'react-native-flash-message';
import Start from './src/pages/Start';
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
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Start"
          component={Start}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false, animation: 'none'}}
        />
        <stack.Screen
          name="Learn"
          component={LearnScreen}
          options={{headerShown: false, animation: 'none'}}
        />
        <stack.Screen
          name="Simulation"
          component={SimScreen}
          options={{headerShown: false, animation: 'none'}}
        />
        <stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false, animation: 'none'}}
        />
      </stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
