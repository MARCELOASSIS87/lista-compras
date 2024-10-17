import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importando as telas que criamos
import WelcomeScreen from '../screens/WelcomeScreen';
import ListScreen from '../screens/ListScreen';
import ItemsScreen from '../screens/ItemsScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen'; // Certifique-se de que está importado corretamente
import CreateListScreen from '../screens/CreateListScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ title: 'Bem-vindo' }}
        />

        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ title: 'Login' }}
        />

        <Stack.Screen 
          name="SignupScreen" 
          component={SignupScreen} 
          options={{ title: 'Cadastro' }}
        />

        <Stack.Screen 
          name="ListScreen" 
          component={ListScreen} 
          options={{ title: 'Minhas Listas' }}
        />

        <Stack.Screen 
          name="ItemsScreen" 
          component={ItemsScreen} 
          options={{ title: 'Itens da Lista' }}
        />
        
        <Stack.Screen 
          name="CreateListScreen" 
          component={CreateListScreen}  // Adicione a tela de criação de lista aqui
          options={{ title: 'Criar Lista' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
