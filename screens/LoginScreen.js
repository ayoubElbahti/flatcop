import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/logo.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { fetchData } from '../configs/Maj';
import { Reloading } from '../components/Reloading';

const LoginScreen = () => {
  const navigation = useNavigation(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [reloading , setReloading] = useState(false);


  const handleLogin = async () => {
    try {
      setReloading(true);
      const response = await axios.post(
        'https://filacop.ma/login',
        new URLSearchParams({
          'email': email,
          'password': password
        }),
        {
          headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7,ar;q=0.6',
            'cache-control': 'max-age=0',
            'cookie': 'PHPSESSID=qgdfe1orrotmfuiih1crlvhf6c',
            'origin': 'https://filacop.ma',
            'priority': 'u=0, i',
            'referer': 'https://filacop.ma/login',
            'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
          }
        }
      );
      
      if (response.status === 200) {
        console.log("Login Successful");
        const user_id = 13;
        await AsyncStorage.setItem('user',  JSON.stringify(user_id));
        await AsyncStorage.setItem('isAlreadyLoggedIn', 'true');
        const st = await fetchData(false);
        console.log("return from fetching data " + st);
        setReloading(false);
        if(st){
          navigation.navigate('MainScreen');
              }
        else {
          Alert.alert('La connexion a échoué', 'Veuillez vérifier votre connexion !');
            }
                                      } 
  }
  catch (error) {
      setReloading(false);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  if (reloading){
    return (<Reloading />);
  }
  return (
    <View className='flex-1 items-center justify-center p-4 mb-10'>
      <Image source={logo} style={styles.logo} />
      <Text className='text-md mb-5'>
      Connectez-vous pour continuer sur Filacop
      </Text>

      <View className='w-full flex-row items-center bg-white border border-gray-300 rounded p-2 mb-4'>
        <Icon name="email" size={20} color="#959396" className='mr-2' />
        <TextInput
          className='flex-1 ml-2'
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View className='w-full flex-row items-center bg-white border border-gray-300 rounded p-2 mb-4'>
        <Icon name="lock" size={20} color="#959396" className='mr-2' />
        <TextInput
          className='flex-1 ml-2'
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={handleLogin} className='bg-yellow-600 p-2 rounded w-full items-center'>
        <Text className='text-white text-lg font-bold'>Login</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  logo: {
    width: 200,  // Set your desired width
    height: 200,  // Set your desired height
    resizeMode: 'contain',  // Ensure the image keeps its aspect ratio
    marginBottom: 2,  // Add some space below the image
  },
});

export default LoginScreen;
