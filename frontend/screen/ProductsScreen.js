import React, {useEffect, useState, useContext} from 'react';
import { View, Text, FlatList, StyleSheet,ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Product } from '../components/Product.js';

const { width, height } = Dimensions.get('screen');

const productList = [
    
  {
      _id:"art1",
      nomArt:"PLAT DE GARBA",
      prix:1500,
      image:"https://i0.wp.com/gnadoemedia.com/wp-content/uploads/2019/10/garba.jpg?fit=768%2C576&ssl=1",
      idRestaurant:"rest1",
      categories:[],
      isOnline:false,
      createdBy:"101",
      updatedBy:"101",
      description: 'A headset combines a headphone with microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).',
      isActive:true,
      createdAt:"2022-08-17T21:32:48.655+00:00",
      updatedAt:"2022-08-17T21:32:48.655+00:00",
  },
  {
      _id:"art2",
      nomArt:"Bounty2",
      prix:1500,
      image:"https://i.pinimg.com/736x/7e/7c/1c/7e7c1cffc2ed4091b569ba3fe331d183.jpg",
      idRestaurant:"rest1",
      categories:[],
      isOnline:false,
      description: 'A headset combines a headphone with microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).',
      createdBy:"101",
      updatedBy:"101",
      isActive:true,
      createdAt:"2022-08-17T21:32:48.655+00:00",
      updatedAt:"2022-08-17T21:32:48.655+00:00",
     
  },
  {
  _id:"art3",
  nomArt:"PLAT DE RIZ SAUCE",
  prix:1500,
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpq1bV_4txTiBuUd9pD6biYtHY3US0J4RuaA&usqp=CAU",
  idRestaurant:"rest2",
  categories:[],
  isOnline:false,
  description: 'A cupcake (also British English: fairy cake; Hiberno-English: bun; Australian English: fairy cake or patty cake[1]) is a small cake designed to serve one person.',
  createdBy:"101",
  updatedBy:"101",
  isActive:true,
  createdAt:"2022-08-17T21:32:48.655+00:00",
  updatedAt:"2022-08-17T21:32:48.655+00:00",
 
  } 
]

export function ProductsScreen ({navigation}) {
 
  const [products, setProducts] = useState(productList);

  function renderProduct({item: product}) {
    return (
      <Product {...product} 
      width={'48%'}
      onPress={() => {
      }}
      />
    );
  }


  async function getProducts() {
    // Add code here to fetch and retrieve product data from api 
    //
    //
    ////////////////////////////////////////////////////////////
     
  };

  useEffect(() => {
    
    getProducts();
  },[]);

  return (
    <View style={{ paddingHorizontal: 5}}>
      <Text style={{marginTop:10, marginLeft:20, fontSize:15,fontWeight:'bold'}}>{products.length} Articles</Text>
      <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      keyExtractor={(item) => item._id.toString()}
      numColumns={2}
      data={products}
      renderItem={renderProduct}
      columnWrapperStyle={styles.row}
    />
    </View>
    )
  }

  const styles = StyleSheet.create({
    productsList: {
      backgroundColor: '#eeeeee',
    },
    productsListContainer: {
      backgroundColor: '#eeeeee',
      paddingBottom: width*0.2,
    },
    row: {
      justifyContent: 'center',
      marginBottom: 0,
    },
    description: {
      fontSize: 16,
      fontWeight: '400',
      color: '#787878',
      marginBottom: 16,
    },
    image: {
      height: width*0.3,
      //width:width*0.9,
      resizeMode: 'contain',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    }
  });