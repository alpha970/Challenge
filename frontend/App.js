import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './screen/HomeScreen';
import CoursesScreen from './screen/CoursesScreen';
import CartScreen from './screen/CartScreen';

// Création de l'instance de la navigation par onglets
const Tab = createBottomTabNavigator();

// Composant d'écran utilisateur
const UserScreen = ({ isVisible, onClose }) => (
  <Modal visible={isVisible} animationType="slide">
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <MaterialIcons name="close" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.modalHeader}>
        <Text style={styles.welcomeText}>Bienvenue Alpha</Text>
      </View>
      <View style={styles.modalContent}>
        <Text style={styles.accountTitle}>Mon Compte</Text>
        <View style={styles.accountItem}>
          <MaterialIcons name="info" size={24} color="black" />
          <Text style={styles.accountItemText}>Mes informations</Text>
        </View>
        <View style={styles.accountItem}>
          <MaterialIcons name="credit-card" size={24} color="black" />
          <Text style={styles.accountItemText}>Mes cartes</Text>
        </View>
        <View style={styles.accountItem}>
          <MaterialIcons name="history" size={24} color="black" />
          <Text style={styles.accountItemText}>Historiques</Text>
        </View>
        <View style={styles.accountItem}>
          <MaterialIcons name="help" size={24} color="black" />
          <Text style={styles.accountItemText}>F.A.Q</Text>
        </View>
        <View style={styles.accountItem}>
          <MaterialIcons name="logout" size={24} color="black" />
          <Text style={styles.accountItemText}>Déconnexion</Text>
        </View>
      </View>
    </View>
  </Modal>
);

// Composant principal de l'application
const App = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  // Afficher le modal utilisateur
  const handleUserIconPress = () => {
    setModalVisible(true);
  };

  // Fermer le modal utilisateur
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Définir les icônes pour chaque onglet
            if (route.name === 'Accueil') {
              iconName = 'home';
            } else if (route.name === 'Courses') {
              iconName = 'book';
            } else if (route.name === 'Panier') {
              iconName = 'shopping-cart';
            } else if (route.name === 'Compte') {
              iconName = 'person';
            }

            return (
              <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
                <MaterialIcons name={iconName} size={size} color={color} />
                {focused && <View style={styles.iconBorderTop} />}
              </View>
            );
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { height: 60 },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Courses" component={CoursesScreen} />
        <Tab.Screen name="Panier" component={CartScreen} />
        <Tab.Screen
          name="Compte"
          children={() => null}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              handleUserIconPress();
            },
          }}
        />
      </Tab.Navigator>

      <UserScreen isVisible={isModalVisible} onClose={handleCloseModal} />
    </NavigationContainer>
  );
};

// Styles pour les composants
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
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    marginTop: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 20,
  },
  modalHeader: {
    height: '25%',
    backgroundColor: '#408EC6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
  },
  modalContent: {
    height: '75%',
    padding: 20,
  },
  accountTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  accountItemText: {
    fontSize: 18,
    marginLeft: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  iconContainerFocused: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  iconBorderTop: {
    position: 'absolute',
    top: 5,
    width: '90%',
    height: 2,
    backgroundColor: 'black',
  },
});

export default App;
