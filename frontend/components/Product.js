import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import CONST from '../constants/constants';
import helpers from '../helpers/helpers';

const { width, height } = Dimensions.get('screen');

export function Product({ images,isActive,isOnline, prix,original_price, details, onPress, width, nomArt}) {
  
  
  let imageUri = helpers.getImageUri(images)
 
  return (
    <TouchableOpacity 
    style={{...styles.card,width:width}} 
    onPress={onPress}>
      <Image
        style={styles.thumb_small}
        source={{uri:imageUri}}
      />
      <View style={styles.infoContainer}>
        <View>
            <Text style={styles.name}>{nomArt} </Text>
            <Text style={styles.price}>{prix?prix:original_price}  {CONST.DEVISE}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    //width:'100%',
    elevation: 1,
    marginHorizontal:3,
    marginVertical:8
  },
  thumb: {
    height: width*0.8,
    //borderTopLeftRadius: 16,
    //borderTopRightRadius: 16,
    width: '100%',
    //resizeMode:"contain"
  },
  thumb_small: {
    height: width*0.3,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
    //resizeMode:'contain'
  },
  infoContainer: {
    padding: 10,
    height:width*0.2
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    color:'grey'
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    //marginBottom: 8,
    //color:'grey'
  },
});