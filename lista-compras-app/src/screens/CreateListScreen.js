import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CreateListScreen = ({ navigation }) => {
  const [listName, setListName] = useState('');

  const handleCreateList = () => {
    if (listName) {
      // Aqui você pode enviar o listName para o backend ou realizar a lógica de criação da lista
      console.log('Lista criada:', listName);
      // Volta para a tela de listas
      navigation.navigate('ListScreen');
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default CreateListScreen;
