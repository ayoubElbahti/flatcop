import React, { useState, useEffect, useRef } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reloading } from '../components/Reloading';

const { width, height } = Dimensions.get('window');


const Galerie = ({ route }) => {
  const [galleries, setGalleries] = useState([]);
  const { id_product } = route.params;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);



  useEffect(() => {
    const fetchData = async () => {
      console.log(id_product);
      
      // await AsyncStorage.clear()
      try {
        let storedGalleries = await AsyncStorage.getItem('produits');
        storedGalleries = JSON.parse(storedGalleries);
        if(id_product){
          storedGalleries = storedGalleries.filter(gal => gal.categorie.id === id_product);
        }
        setGalleries(storedGalleries.filter(gal => gal.image));
        setImages(storedGalleries.filter(ga => ga.image).map(gal => ({ url: gal.localImageUri })));
        console.log(storedGalleries);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        Alert.alert('Error', 'Failed to fetch galleries');
      }
    };
    fetchData();
    console.log(galleries);
    console.log(images);
    console.log("done");
    
    
  }, [id_product]);


  const flatListRef = useRef(null);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
    <Reloading />
    );
  }

  return (
    <View className="flex-1 bg-white p-2">
    {galleries.length > 0 ? (
      <FlatList
      ref={flatListRef}
        data={galleries}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => openModal(index)}
          style={{ width , height }}
          >
            <Image source={{ uri: item.localImageUri }} 
                      style={{ width, height: '100%', resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        // numColumns={2}
        horizontal={true}
        contentContainerStyle={{gap:2 }}
        pagingEnabled
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        initialNumToRender={1}
      />
    ) : (
      <Text className="text-center">Aucune donnee</Text>
    )}

    <Modal isVisible={isModalVisible} onBackdropPress={closeModal} className="m-0">
      <ImageViewer
         imageUrls={galleries.map(gal => ({ url: gal.localImageUri }))}
        index={currentImageIndex}
        onSwipeDown={closeModal}
        enableSwipeDown
        renderHeader={() => <View className="absolute top-0 left-0 right-0 p-4 bg-black opacity-75"><Text className="text-white">Swipe down to close</Text></View>}
        renderFooter={() => <View className="absolute bottom-0 left-0 right-0 p-4 bg-black opacity-75"><Text className="text-white">Swipe down to close</Text></View>}
      />
    </Modal>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width / 1 - 50 ,
    borderRadius: 10,
  },
});

export default Galerie;
