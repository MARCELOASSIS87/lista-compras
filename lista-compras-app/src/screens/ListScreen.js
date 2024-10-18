import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para recuperar o token JWT armazenado
import { API_BASE_URL } from '../config'; // Importe o caminho base da API

const ListScreen = ({ navigation }) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLists(); // Carrega as listas de compras quando a tela é carregada
  }, []);

  // Função para buscar listas do servidor com autenticação JWT
  const fetchLists = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Recupera o token JWT do armazenamento local

      if (!token) {
        Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
        navigation.navigate('LoginScreen');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/lists`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Envia o token JWT no cabeçalho de autorização
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLists(data); // Atualiza o estado com as listas recebidas
        setLoading(false);
      } else {
        console.error('Erro ao buscar listas:', response.statusText);
        Alert.alert('Erro', 'Falha ao carregar listas. Por favor, tente novamente.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro ao buscar listas:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar listas.');
      setLoading(false);
    }
  };

  const handleListPress = (listId) => {
    // Navega para a tela de itens de uma lista específica
    navigation.navigate('ItemsScreen', { listId });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando suas listas...</Text>
      </View>
    );
  }

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
        ListEmptyComponent={<Text>Você ainda não tem listas.</Text>}
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
