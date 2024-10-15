import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const App = () => {
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [items, setItems] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const [message, setMessage] = useState(''); // Para exibir a mensagem de item pego

    const API_URL = 'https://2b21-2804-1b1-a940-ff19-18d7-ea6-4059-6f49.ngrok-free.app/items';

    const fetchItems = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                console.error('Erro ao buscar itens:', response.statusText);
                return;
            }
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        }
    };

    const addItem = async () => {
        if (!itemName || !itemQuantity) return;
        const newItem = { name: itemName, quantity: parseInt(itemQuantity), purchased: false };
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
                fetchItems();
            }
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
        }
    };

    const editItem = async () => {
        if (!editingItemId || !itemName || !itemQuantity) return;
        const updatedItem = { name: itemName, quantity: parseInt(itemQuantity) };
        try {
            const response = await fetch(`${API_URL}/${editingItemId}`, {
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
                fetchItems();
            }
        } catch (error) {
            console.error('Erro ao atualizar item:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchItems();
            }
        } catch (error) {
            console.error('Erro ao deletar item:', error);
        }
    };

    const togglePurchased = async (id, currentStatus) => {
        try {
            // Encontra o item que está sendo atualizado
            const itemToUpdate = items.find(item => item._id === id);
    
            // Envia todos os campos na requisição
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: itemToUpdate.name,
                    quantity: itemToUpdate.quantity,
                    purchased: !currentStatus
                }),
            });
    
            if (!response.ok) {
                const data = await response.json();
                console.error('Erro ao atualizar item no servidor:', response.status, response.statusText, data);
            } else {
                fetchItems(); // Atualiza a lista de itens após a alteração
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
    <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
            <TouchableOpacity
                activeOpacity={0.6} // Define a opacidade ao clicar
                style={styles.itemContainer}
                onPress={() => togglePurchased(item._id, item.purchased)} // Chama a função ao clicar
            >
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemText}>{item.quantity} - {item.name}</Text>
                </View>
                <View style={styles.iconContainer}>
                    {/* Ícone de marca de verificação que aparece se o item estiver comprado */}
                    {item.purchased && (
                        <MaterialIcons name="check" size={24} color="green" />
                    )}
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
            </TouchableOpacity>
        )}
    />


            {/* Exibe a mensagem ao marcar como comprado */}
            {message ? <Text style={styles.messageText}>{message}</Text> : null}

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
                <TouchableOpacity style={styles.addButton} onPress={editingItemId ? editItem : addItem}>
                    <Text style={styles.addButtonText}>
                        {editingItemId ? "Atualizar Item" : "Adicionar Item"}
                    </Text>
                </TouchableOpacity>
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
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    itemTextContainer: {
        flex: 1,
    },
    itemText: {
        fontSize: 18,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100, // Ajuste o espaço dos ícones
    },
    formContainer: {
        marginTop: 20,
        width: '100%',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
    messageText: {
        color: 'green',
        fontSize: 18,
        marginVertical: 10,
    },
});

export default App;
