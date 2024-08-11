import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerPage from './screens/CustomerPage.js';
import Galerie from './screens/Galerie.js'; // Import the Galerie component
import Catalogue from './screens/Catalogue.js';
import ListeDeProduit from './screens/ListeDeProduit.js';
import ListeDesReduction from './screens/ListeDesReduction.js';
import MainScreen from './screens/MainScreen.js';
import Login from './screens/Login.js';
import LoginScreen from './screens/LoginScreen.js';
import ListImp from './screens/ListeImp.js';
import logo from './assets/logo.png'; // Ensure you have the correct path to your logo
import ListeDesPromos from './screens/ListeDesPromos.js';

const Stack = createStackNavigator();

const HeaderTitle = ({ title }) => (
  <View className='flex-row items-center justify-start px-5 items-center w-full'>
    {
      title ? (<Text className='text-lg font-bold  '>{title}</Text>):(<></>)
    }
    
    {
      title ? (    <Image source={logo} style={{ width: 100, height: 40, marginLeft: 400 }} />
      ):(    <Image source={logo} style={{ width: 100, height: 40, marginLeft: 550 }} />
      )
    }

  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="MainScreen" 
          component={MainScreen}
          options={{
            headerTitle: () => <HeaderTitle  />,
            headerTintColor: '#D9A900',
          }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Log" 
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="CustomerPage" 
          component={CustomerPage}
          options={{
            headerTitle: () => <HeaderTitle title="Customer Page" />,
            headerTintColor: '#D9A900',
          }}
        />
        <Stack.Screen 
          name="Galerie" 
          component={Galerie}
          options={{
            headerTitle: () => <HeaderTitle title="Galerie" />,
            headerTintColor: '#D9A900',
          }}
        />
        <Stack.Screen 
          name="Catalogue" 
          component={Catalogue}
          options={{
            headerTitle: () => <HeaderTitle title="Catalogue" />,
            headerTintColor: '#D9A900',
          }}
        />
        <Stack.Screen 
          name="ListeDeProduit" 
          component={ListeDeProduit}
          options={{
            headerTitle: () => <HeaderTitle title="Liste de Produit" />,
            headerTintColor: '#D9A900',
          }}
        />
          <Stack.Screen 
          name="ListeDesPromos" 
          component={ListeDesPromos}
          options={{
            headerTitle: () => <HeaderTitle title="Liste des Promos" />,
            headerTintColor: '#D9A900',
          }}
        />
        <Stack.Screen 
          name="ListeDesReduction" 
          component={ListeDesReduction}
          options={{
            headerTitle: () => <HeaderTitle title="Liste des Réductions" />,
            headerTintColor: '#D9A900',
          }}
        />
        <Stack.Screen 
          name="ListeImp" 
          component={ListImp}
          options={{
            headerTitle: () => <HeaderTitle title="Liste Impayée" />,
            headerTintColor: '#D9A900',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
