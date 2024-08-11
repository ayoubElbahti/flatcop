import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reloading } from '../components/Reloading';

const ListeDeProduit = ({ route }) => {
  const { categoryId } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let storedProducts = await AsyncStorage.getItem('produits');
        storedProducts = JSON.parse(storedProducts);
        if(categoryId){
          storedProducts = storedProducts.filter(prod => prod.categorie.id === categoryId);
        }
        // storedProducts = storedProducts.filter(product => product.image);
        setProducts(storedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        Alert.alert('Error', 'Failed to fetch products');
      }
    };
    fetchProducts();
  }, [categoryId]);

  const filteredProducts = products.filter(product =>
    product.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
     <Reloading />
    );
  }

  const renderProductItem = ({ item, index }) => (
    <View key={`${item.reference}_${index}`} className="flex flex-row justify-between border-b p-2 border-gray-300">
      <Text className="flex-1  text-center">{item.reference}</Text>
      <Text className="flex-1 text-center">{item.name}</Text>
      <Text className="flex-1  text-center">{item.prix} MAD</Text>
      <Text className="flex-1  text-center">{item.categorie.name}</Text>
      {item.localImageUri ? (
        <Image source={{ uri: item.localImageUri }} className="w-12 h-12 rounded" />
      ) : (
        <View className="w-12 h-12 rounded bg-gray-300" />
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <TextInput
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Chercher par Referencce"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text className="pb-5 font-bold">
        {filteredProducts.length > 0 ? `${filteredProducts.length} Resultat trouvé ` : ''}
      </Text>
      <View className="flex flex-row justify-between p-2 bg-yellow-500">
        <Text className="flex-1 text-center  font-bold text-white">Ref</Text>
        <Text className="flex-1 text-center font-bold text-white">Name</Text>
        <Text className="flex-1 text-center font-bold text-white">Prix</Text>
        <Text className="flex-1 text-center font-bold text-white">Categorie</Text>
        <Text className="flex-2 text-center font-bold text-white">Image</Text>
      </View>
      {filteredProducts.length > 0 ? ( <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => `${item.reference}_${index}`}
        contentContainerStyle="p-2"
      />) : (
          <Text className='text-center font-semibold text-black p-2'>No matching records found</Text>
      )
      }
     
    </View>
  );
};

export default ListeDeProduit;
