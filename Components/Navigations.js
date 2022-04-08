import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import GetStarted from '../Screens/GetStarted';
// import Login from '../Screens/Login';
// import Home from '../Screens/Home';
// import Signup from '../Screens/Signup';
// import Profile from '../Screens/Profile';
import Details from '../Screens/Details';
import UploadingData from '../Screens/UploadingData';
const Stack = createStackNavigator();

const Navigations = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Details"
        component={Details}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadingData"
        component={UploadingData}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default Navigations;
