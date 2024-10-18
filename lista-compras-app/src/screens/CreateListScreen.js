import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Certifique-se de que esse pacote está instalado
import { API_BASE_URL } from '../config'; // Caminho base da sua API

const CreateListScreen = ({ navigation, route }) => {
  const [listName, setListName] = useState('');

  const handleCreateList = async () => {
    if (!listName) {
      Alert.alert('Erro', 'O nome da lista não pode estar vazio.');
      return;
    }

    try {
      // Obtenha o token JWT do AsyncStorage
      const token = await AsyncStorage.getItem('token');

      // Envie o nome da lista para o backend
      const response = await fetch(`${API_BASE_URL}/lists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Inclui o token JWT no cabeçalho
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: listName }), // Envia o nome da lista no corpo da requisição
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Lista criada com sucesso:', data);
        Alert.alert('Sucesso', 'Lista criada com sucesso!');
        
        // Passa uma função de callback para a ListScreen para forçar a atualização
        route.params?.onCreateList?.();
        navigation.goBack();
      } else {
        console.error('Erro ao criar lista:', response.statusText);
        Alert.alert('Erro', 'Ocorreu um erro ao criar a lista.');
      }
    } catch (error) {
      console.error('Erro ao criar lista:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar a lista.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Lista</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da lista"
        value={listName}
        onChangeText={setListName}
      />
      <Button title="Criar Lista" onPress={handleCreateList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default CreateListScreen;
