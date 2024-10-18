import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ItemsScreen = ({ route, navigation }) => {
  const { listId } = route.params; // Recebe o ID da lista de compras selecionada
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchItems(); // Carrega os itens da lista quando a tela é carregada
  }, []);

  // Função para buscar itens da lista específica
  const fetchItems = async () => {
    const API_URL = `https://276e-2804-1b1-a940-ff19-8013-9c34-80f5-287f.ngrok-free.app/lists/${listId}/items`;
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    }
  };

  const addItem = async () => {
    if (!itemName || !itemQuantity) {
      Alert.alert('Erro', 'Nome do item e quantidade são obrigatórios.');
      return;
    }
    const newItem = { name: itemName, quantity: parseInt(itemQuantity) };
    const API_URL = `https://276e-2804-1b1-a940-ff19-8013-9c34-80f5-287f.ngrok-free.app/lists/${listId}/items`;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        setItemName('');
        setItemQuantity('');
        fetchItems(); // Atualiza a lista após adicionar o item
      }
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  const editItem = async () => {
    if (!editingItemId || !itemName || !itemQuantity) {
      Alert.alert('Erro', 'Nome do item e quantidade são obrigatórios.');
      return;
    }
    const updatedItem = { name: itemName, quantity: parseInt(itemQuantity) };
    const API_URL = `https://276e-2804-1b1-a940-ff19-8013-9c34-80f5-287f.ngrok-free.app/lists/${listId}/items/${editingItemId}`;
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
      if (response.ok) {
        setItemName('');
        setItemQuantity('');
        setEditingItemId(null);
        fetchItems(); // Atualiza a lista após editar o item
      }
    } catch (error) {
      console.error('Erro ao editar item:', error);
    }
  };

  const deleteItem = async (id) => {
    const API_URL = `https://276e-2804-1b1-a940-ff19-8013-9c34-80f5-287f.ngrok-free.app/lists/${listId}/items/${id}`;
    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchItems(); // Atualiza a lista após excluir o item
      }
    } catch (error) {
      console.error('Erro ao deletar item:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itens da Lista</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.quantity} - {item.name}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => {
                setEditingItemId(item._id);
                setItemName(item.name);
                setItemQuantity(item.quantity.toString());
              }}>
                <MaterialIcons name="edit" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item._id)}>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do item"
          value={itemName}
          onChangeText={setItemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={itemQuantity}
          onChangeText={setItemQuantity}
          keyboardType="numeric"
        />
        <Button
          title={editingItemId ? "Atualizar Item" : "Adicionar Item"}
          onPress={editingItemId ? editItem : addItem}
        />
      </View>
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});

export default ItemsScreen;
