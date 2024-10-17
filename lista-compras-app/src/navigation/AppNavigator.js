import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importando as telas que criamos
import WelcomeScreen from '../screens/WelcomeScreen';
import ListScreen from '../screens/ListScreen';
import ItemsScreen from '../screens/ItemsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        
        {/* Tela de Bem-vindo */}
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ title: 'Bem-vindo' }}
        />

        {/* Tela de Listas */}
        <Stack.Screen 
          name="Lists" 
          component={ListScreen} 
          options={{ title: 'Minhas Listas' }}
        />

        {/* Tela de Itens */}
        <Stack.Screen 
          name="Items" 
          component={ItemsScreen} 
          options={{ title: 'Itens da Lista' }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
