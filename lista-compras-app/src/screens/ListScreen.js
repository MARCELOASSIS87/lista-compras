import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';

const ListScreen = ({ navigation }) => {
  const [lists, setLists] = useState([]);
  const API_URL = 'https://a3ff-2804-1b1-a940-ff19-c49c-c87-c702-1994.ngrok-free.app/lists';

  useEffect(() => {
    fetchLists(); // Carrega as listas de compras quando a tela é carregada
  }, []);

  // Função para buscar listas do servidor com autenticação JWT
  const fetchLists = async () => {
    const token = 'SEU_TOKEN_AQUI'; // Aqui você deve substituir pelo token JWT real armazenado no cliente

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Envia o token JWT no cabeçalho de autorização
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLists(data); // Atualiza o estado com as listas recebidas
      } else {
        console.error('Erro ao buscar listas:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar listas:', error);
    }
  };

  const handleListPress = (listId) => {
    // Navega para a tela de itens de uma lista específica
    navigation.navigate('ItemsScreen', { listId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Listas de Compras</Text>
      <FlatList
        data={lists}
        keyExtractor={(item) => item._id} // Supondo que "_id" seja o identificador da lista
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.listItem} 
            onPress={() => handleListPress(item._id)}>
            <Text style={styles.listText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Button 
        title="Criar Nova Lista"
        onPress={() => navigation.navigate('CreateListScreen')} // Navega para a tela de criação de listas
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#e8e8e8',
    marginBottom: 10,
    borderRadius: 8,
  },
  listText: {
    fontSize: 18,
  },
});

export default ListScreen;
