
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, TouchableOpacity,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchData } from '../configs/Maj';
import { Reloading } from '../components/Reloading';


const Login = () => {

 
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const result = await fetchData();
      if (result) {
        console.log('Data fetched successfully');
        setLoading(false);
      } else {
        console.log('Failed to fetch data');
        setLoading(false);
        Alert.alert('Error', 'Probleme au niveau de votre reseaux');
      }
    };

    fetchDataFromAPI();
  }, []);





if (loading) {
   <Reloading />
  }






// if (isConnected){
//   console.log('fetched from server');
//   fetchData();  
// }  
// else{
//   console.log('fetched from local storage');
//   fetchData();  
// }

  
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Login</Text> 
      <TouchableOpacity
      onPress={() => navigation.navigate('MainScreen')}
    >
      <Text>Go to catalogue</Text>
    </TouchableOpacity>
    </View>
  );
};


export default Login;
