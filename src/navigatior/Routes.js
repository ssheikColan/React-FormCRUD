import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import FlashMessage from "react-native-flash-message";

import MenuScreen from '../../MenuScreen';
import { View } from 'react-native';
import ViewScreen from '../screens/ViewScreen';



const stack = createNativeStackNavigator();

const Routes = () => {
  return (
 <View style={{flex:1}}>
  <NavigationContainer>
    <stack.Navigator initialRouteName='MenuScreen'
    screenOptions={{headerShown:false,}}>
        <stack.Screen name='MenuScreen' component={MenuScreen}/>
        <stack.Screen name='ViewScreen' component={ViewScreen}/>
      
    </stack.Navigator>
  </NavigationContainer>
  <FlashMessage position="top" />
  </View>
  )
}

export default Routes