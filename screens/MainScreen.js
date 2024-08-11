import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import logo from '../assets/logo.png';
import { fetchData, logOut } from '../configs/Maj';
import { Reloading } from '../components/Reloading';
import { useNavigation } from '@react-navigation/native';



const MainScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);
    const success = await fetchData(true);
    if (success) {
      console.log('Data fetched successfully!');
      setLoading(false);
    } else {
      console.log('Failed to fetch data.');
      setLoading(false);
    }
  };


  const deconnection = async () => {
    try {
      const log = await logOut();
      if (log) {
        console.log('Logged out successfully');
        navigation.navigate('Login');  // Navigate to the Login screen
      } else {
        console.log('Failed to log out');
        Alert.alert('Error', 'Failed to log out.');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
      Alert.alert('Error', 'An unexpected error occurred during logout.');
    }
  };

if(loading){
  return <Reloading />
}

  return (
    <View className="flex-1 justify-center items-center">
      {/* <TouchableOpacity
        className="p-4 w-80 rounded-lg mb-4 bg-[#4ca6c2] "
        onPress={() => navigation.navigate('Galerie')} // Update this route as needed
      >
        <Text className="text-white text-center text-lg">Galerie</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        className="p-4 w-80 rounded-lg mb-4 bg-[#776acf] "
        onPress={() => navigation.navigate('Catalogue')} // Update this route as needed
      >
        <Text className="text-white text-center text-lg">Catalogue</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="p-4 mb-4 bg-[#f7cc53] w-80 rounded-lg"
        onPress={() => navigation.navigate('ListeDeProduit' , { categoryId: null })} // Update this route as needed
      >
        <Text className="text-white text-center text-lg">Liste des Produits</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="p-4 mb-4 bg-[#b4524a] w-80 rounded-lg"
        onPress={() => navigation.navigate('ListeDesReduction')} // Update this route as needed
      >
        <Text className="text-white text-center text-lg">Liste des Réductions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="p-4 mb-4 bg-[#b4524a] w-80 rounded-lg"
        onPress={() => navigation.navigate('ListeDesPromos')} // Update this route as needed
      >
        <Text className="text-white text-center text-lg">Liste des Promos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="p-4 mb-4 bg-[#454559] w-80 rounded-lg"
        onPress={() => navigation.navigate('ListeImp' , { userId: 13 })}// Update this route as needed
      >
        <Text className="text-white text-center text-lg"
          >Liste des Impayé</Text>
      </TouchableOpacity>
      
      
      <View className=' mt-10 flex-row justify-between items-center    space-x-4'>
        <TouchableOpacity  className="p-4 mb-4 bg-[#b4524a] w-60 rounded-lg "
         onPress={handlePress} 
         >
          <Text className="text-white text-center text-lg">Mettre a jour</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-4 mb-4 bg-[#b4524a] w-60 rounded-lg"
          onPress={deconnection}>

          <Text className="text-white text-center text-lg">Log Out</Text>
        </TouchableOpacity>
      </View>

      <Image source={logo} style={styles.logo} />

    </View>
  );
};


const styles = StyleSheet.create({
  logo: {
    width: 100,  // Set your desired width
    height: 100,  // Set your desired height
    resizeMode: 'contain',  // Ensure the image keeps its aspect ratio
  // Add some space below the image
  },
});

export default MainScreen;
