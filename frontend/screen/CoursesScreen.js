import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { Searchbar } from 'react-native-paper';

// Données des courses avec des sections pour "Aujourd'hui" et "30 derniers jours"
const coursesData = [
  {
    title: "Aujourd'hui",
    data: [
      { id: '1', date: '2024-06-06', total: '1100 FCFA' },
      { id: '2', date: '2024-06-06', total: '1500 FCFA' },
    ]
  },
  {
    title: '30 derniers jours',
    data: [
      { id: '3', date: '2024-05-30', total: '2100 FCFA' },
      { id: '4', date: '2024-05-25', total: '1700 FCFA' },
      { id: '5', date: '2024-05-20', total: '1800 FCFA' },
      { id: '6', date: '2024-05-15', total: '2400 FCFA' },
      { id: '7', date: '2024-05-14', total: '3000 FCFA' },
    ]
  },
  // Ajoutez d'autres sections ici
];

// Composant pour afficher chaque élément de course
const CourseItem = React.memo(({ item }) => (
  <View>
    <Text style={styles.date}>{item.date} - {item.total}</Text>
  </View>
));

// Composant principal pour l'écran des courses
const CoursesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction de rendu pour chaque élément de course
  const renderItem = useCallback(({ item }) => <CourseItem item={item} />, []);

  // Fonction de rendu pour l'en-tête de chaque section
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Courses</Text>
        <Searchbar 
          placeholder="Rechercher..." 
          style={styles.searchBar} 
          inputStyle={styles.searchBarInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <SectionList
        sections={coursesData}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

// Styles pour les composants
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  date: {
    fontSize: 18,
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 16,
  },
});

export default CoursesScreen;
