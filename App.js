import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navigations from './Components/Navigations';
// import DrawerNav from './Components/DrawerNav'

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <NavigationContainer>
        {/* <Home /> */}
        {/* <Signup/> */}
        <Navigations />
        {/* <DrawerNav /> */}
      </NavigationContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
