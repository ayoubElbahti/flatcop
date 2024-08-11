import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, Alert, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reloading } from '../components/Reloading';

const Catalogue = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        // await AsyncStorage.clear();
        const storedGalleries = await AsyncStorage.getItem('catalogues');
        setGalleries(JSON.parse(storedGalleries));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        Alert.alert('Error', 'Failed to fetch galleries');
      }
    };

    fetchGalleries();
  }, []);

  if (loading) {
    return (
     <Reloading />
    );
  }

  const renderGalleryItem = ({ item, index }) => (
    <TouchableOpacity
      key={`${item.id}_${index}`}
      onPress={() => navigation.navigate('Galerie', { id_product: item.id })}
      style={styles.item}
    >
      {item.localImageUri ? (
        <Image
          source={{ uri: item.localImageUri }}
          style={styles.image}
        />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <Text className='text-2xl font-bold text-center'>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className='flex-1 p-5'>
      <TouchableOpacity 
      onPress={() => navigation.navigate('Galerie' , { id_product: null })}
      className='w-full bg-yellow-300 rounded-lg p-2'>

          <Text className=' text-center text-2xl font-bold'>Tous les Produits</Text>
      </TouchableOpacity>
      <FlatList
        data={galleries}
        renderItem={renderGalleryItem}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 4 - 30,
  },
  imagePlaceholder: {
    width: '100%',
    height: Dimensions.get('window').width / 4 - 30,
    backgroundColor: '#ccc',
  },
  itemText: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Catalogue;
