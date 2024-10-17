import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Lista de Compras</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Entrar"
          onPress={() => navigation.navigate('LoginScreen')} // Navega para a tela de Login
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Cadastrar"
          onPress={() => navigation.navigate('SignupScreen')} // Navega para a tela de Cadastro
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    width: '80%',
  },
});

export default WelcomeScreen;
