import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const downloadImage = async (url, imageName) => {
    const fileUri = FileSystem.documentDirectory + imageName;
    const { uri } = await FileSystem.downloadAsync(url, fileUri);
    return uri;
  };


export const fetchData = async (aleardylogin) => {
    try {
      let response = '';
      let api_url = '';
      let imageUrl = '';
      let user_Id = await AsyncStorage.getItem('user');
      console.log("user id = " + user_Id);
      
      console.log("fetching catalogues");
      response = await axios.get('https://filacop.ma/apibadr/categories');
      const cataloguesfetchedData = response.data.data;
      for (let catalogue of cataloguesfetchedData) {
        if (catalogue.image) {
          imageUrl = `https://filacop.ma/uploads/imagecat/${catalogue.image}`;
          catalogue.localImageUri = await downloadImage(imageUrl, catalogue.image);
        }
      }
      
      // ----------------------------------------------------------------------------------
      // ----------------------------------------------------------------------------------
      // ----------------------------------------------------------------------------------
      
      console.log("fetching produits");
      api_url = 'https://filacop.ma/apibadr/products';
      response = await axios.get(api_url);
      const produitsfetchedData = response.data.data;
      for (let produit of produitsfetchedData) {
        if (produit.image) {
          const imageUrl = `https://filacop.ma/uploads/productimage/${produit.image}`;
          produit.localImageUri = await downloadImage(imageUrl, produit.image);
        }
      }
      
      // ------------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------------
      console.log("fetching impayers");
      response = await axios.get('https://filacop.ma/apibadr/users/13/unpaid-invoices');

  // ----------------------------si les apis fonctionnes bien sauvegrader les donnees au niveau de local storage-----------------------------------------------------
      await AsyncStorage.clear();
      await AsyncStorage.setItem(`imps_${user_Id}`, JSON.stringify(response.data.impayers));
      await AsyncStorage.setItem('produits' , JSON.stringify(produitsfetchedData));
      await AsyncStorage.setItem('catalogues', JSON.stringify(cataloguesfetchedData));
      await AsyncStorage.setItem('user', JSON.stringify(user_Id));
      const storedGalleries = await AsyncStorage.getItem('produits');
      console.log(storedGalleries);
      return true;
    } catch (error) {
      console.log('Error fetching data:', error);
      if(!aleardylogin){
        await AsyncStorage.clear();
      }
      return false;
     
    }
  };

export const logOut = async () =>{
  try
      {  console.log('clear all data');
        await AsyncStorage.clear();
        return true;
      }
   catch (error) {
    console.log("arreur " + error);
    return false;
    
   }

}

