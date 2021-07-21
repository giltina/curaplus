import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Login from './pages/Login'
import Create from './pages/Create'
import Prescription from './pages/Prescription'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#438983',
    accent: '#438983',
  
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer style={{backgroundColor: 'green'}}>
      <Stack.Navigator initialRouteName='Prescription'>
        <Stack.Screen name ='Login' component={Login} />
        <Stack.Screen name ='Create' component={Create} />
        <Stack.Screen name ='Prescription' component={Prescription} options={{
          title: 'Cura Plus Pharmacy',
          headerStyle: {
            backgroundColor: '#438983',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          }} />
      </Stack.Navigator>

    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
