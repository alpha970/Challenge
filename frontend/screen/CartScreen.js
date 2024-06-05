import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';

// Liste des articles dans le panier avec des détails
const cartItems = [
  { id: '1', name: 'Takos', price: '2000 FCFA', quantity: 1, image: 'https://v3.api.rii-songoo.pw/api/files/image/242a4ed866a8e80b7977d8cffb990e4b' },
  { id: '2', name: 'Pizza Calzoné', price: '2500 FCFA', quantity: 2, image: 'https://v3.api.rii-songoo.pw/api/files/image/ea02a0927ef57f5b1a21ef98bc554e48' },
  { id: '3', name: 'Laitue', price: '3300 FCFA', quantity: 3, image: 'https://v3.api.rii-songoo.pw/api/files/image/01da4e8a47789b757e2b5b66304fa684' },
  // Ajoutez d'autres articles ici
];

// Composant pour rendre chaque article du panier
const CartItem = React.memo(({ item }) => (
  <View style={styles.item}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.itemDetails}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.quantity}>Quantité: {item.quantity}</Text>
    </View>
    <Text style={styles.price}>{item.price}</Text>
  </View>
));

const CartScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Utilisation de useCallback pour optimiser le rendu des éléments de la liste
  const renderItem = useCallback(({ item }) => <CartItem item={item} />, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Panier</Text>
        <Searchbar 
          placeholder="Rechercher..." 
          style={styles.searchBar} 
          inputStyle={styles.searchBarInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => (
          { length: 80, offset: 80 * index, index }
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 25,
  },
  searchBar: {
    width: '70%',
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
  },
  searchBarInput: {
    marginVertical: -20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemDetails: {
    marginLeft: 15,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 14,
    color: '#888',
  },
  price: {
    fontSize: 16,
    color: '#888',
    alignSelf: 'center',
  },
});

export default CartScreen;
