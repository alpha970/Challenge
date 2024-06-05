import React, { useEffect, useState, memo } from 'react';
import { FlatList, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { API_BASE_URL } from '@env'; // Importer la variable d'environnement

// Générer des valeurs aléatoires pour les temps de livraison et les pouces levés
const generateRandomValues = (data) => {
  return data.map(item => ({
    ...item,
    deliveryTime: randomDeliveryTime(),
    thumbsUp: randomThumbsUp(),
  }));
};

// Générer un temps de livraison aléatoire
const randomDeliveryTime = () => {
  const times = ['30 min', '45 min', '1h', '1h30 min'];
  return times[Math.floor(Math.random() * times.length)];
};

// Générer des valeurs aléatoires pour les pouces levés
const randomThumbsUp = () => {
  const percentage = Math.floor(Math.random() * 30) + 70; // Pourcentage entre 70 et 100
  const votes = Math.floor(Math.random() * 300) + 1; // Nombre de votes entre 1 et 300
  return { percentage, votes };
};

// Composant pour afficher chaque élément de la liste
const CourseItem = memo(({ item }) => {
  const image = item.images?.slice(-1)[0]; // Récupérer la dernière image
  const imageUri = `${API_BASE_URL}files/image/${image?.filename}`;

  return (
    <View style={styles.item}>
      {image && (
        <ImageBackground
          style={styles.image}
          source={{ uri: imageUri }}
          imageStyle={{ borderRadius: 8 }}
        >
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{item.prix} FCFA</Text>
          </View>
        </ImageBackground>
      )}
      <Text style={styles.title}>{item.nomArt}</Text>
      <Text style={styles.details}>{item.details}</Text>
      <Text style={styles.deliveryTime}>Temps de livraison: {item.deliveryTime}</Text>
      <View style={styles.thumbsUpContainer}>
        <FontAwesome name="thumbs-up" size={24} color="#735DA5" />
        <Text style={styles.thumbsUpText}>{item.thumbsUp.percentage}% ({item.thumbsUp.votes})</Text>
        <TouchableOpacity>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Utilisation de useEffect pour charger les données lors du montage du composant
  useEffect(() => {
    fetch(`${API_BASE_URL}articles`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 'SUCCESS') {
          const updatedData = generateRandomValues(json.data);
          updatedData.reverse(); // Inverser l'ordre des données
          setData(updatedData);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  // Fonction de rendu pour chaque élément de la liste
  const renderItem = ({ item }) => <CourseItem item={item} />;

  // Rendu principal du composant
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Accueil</Text>
        <Searchbar
          placeholder="Rechercher..."
          style={styles.searchBar}
          inputStyle={styles.searchBarInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        getItemLayout={(data, index) => (
          { length: 240, offset: 240 * index, index } // Assume 240 is the fixed height of the item
        )}
      />
    </View>
  );
}

// Styles pour les composants
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#f5f5f5',
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
    color: '#333',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8,
  },
  priceTag: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#408EC6',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  priceText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  thumbsUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  thumbsUpText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 4,
    flex: 1, // pour pousser le bouton "+" vers la droite
  },
  
  addButtonText: {
    color: '#408EC6',
    fontSize: 25,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginVertical: 8,
  },
});

export default HomeScreen;
