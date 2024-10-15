import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Switch } from 'react-native';

const App = () => {
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [items, setItems] = useState([]);

    const API_URL = 'https://2b21-2804-1b1-a940-ff19-18d7-ea6-4059-6f49.ngrok-free.app/items'; // Coloque a URL correta da API

    const fetchItems = async () => {
        console.log('Fetching items...');
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                console.error('Erro ao buscar itens:', response.statusText);
                return;
            }
            const data = await response.json();
            console.log('Itens recebidos:', data);
            setItems(data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        }
    };

    const addItem = async () => {
        const newItem = { name: itemName, quantity: parseInt(itemQuantity), purchased: false };
        console.log('Adicionando item:', newItem);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
            if (response.ok) {
                console.log('Item adicionado com sucesso');
                setItemName('');
                setItemQuantity('');
                fetchItems(); // Refresh the list after adding
            } else {
                console.error('Erro ao adicionar item:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
        }
    };

    const togglePurchased = async (id, currentStatus) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ purchased: !currentStatus }), // Inverte o status
            });
            if (response.ok) {
                console.log(`Item ${id} atualizado para purchased: ${!currentStatus}`);
                fetchItems(); // Atualiza a lista após a mudança
            } else {
                console.error('Erro ao atualizar item:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao atualizar item:', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Compras</Text>
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
            <Button title="Adicionar Item" onPress={addItem} />
            <FlatList
                data={items}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text>{item.name} - {item.quantity}</Text>
                        {/* Adiciona um Switch para marcar o item como "purchased" */}
                        <Switch
                            value={item.purchased}  // Controla o estado "purchased" do item
                            onValueChange={() => togglePurchased(item._id, item.purchased)}  // Função para alternar estado
                        />
                    </View>
                )}
            />
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
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default App;
