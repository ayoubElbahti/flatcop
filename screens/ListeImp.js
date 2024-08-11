import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { memo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reloading } from '../components/Reloading';
const ListImp =  ({ route }) => {
    const { userId } = route.params;
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        console.log(userId);
        
        const storedImp = await AsyncStorage.getItem(`imps_${userId}`);
        setInvoices(JSON.parse(storedImp));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        Alert.alert('Error', 'Failed to fetch invoices');
      }
    };
    fetchInvoices();    
  }, [userId]);
  const InvoiceItem = memo(({ item }) => (
    <View className="flex flex-row justify-between py-2 border-b border-gray-300">
      <Text className="flex-1 text-center">{item.client}</Text>
      <Text className="flex-1 text-center">{item.montant} MAD</Text>
      <Text className="flex-1 text-center">{item.type}</Text>
      <Text className="flex-1 text-center">{new Date(item.date).toLocaleDateString('en-GB')}</Text>
      <Text className="flex-1 text-center">{item.annuler ? 'Yes' : 'No'}</Text>
      <Text className="flex-1 text-center">{item.sousclient ? item.sousclient : '-'}</Text>
      <Text className="flex-1 text-center">{item.reglement}</Text>
      <Text className="flex-1 text-center">{item.note ? item.note : '-'}</Text>
    </View>
  ));


  const renderInvoiceItem = useCallback(({ item }) => (
    <InvoiceItem item={item} />
  ), []);

  if (loading) {
    return (
    <Reloading />
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="pb-5 font-bold">
        {invoices.length > 0 ? `${invoices.length} Unpaid Invoices Found` : 'No Unpaid Invoices Found'}
      </Text>
      <View className="flex flex-row justify-between py-2 bg-yellow-500">
        <Text className="flex-1 text-center font-bold text-white">Client</Text>
        <Text className="flex-1 text-center font-bold text-white">Montant</Text>
        <Text className="flex-1 text-center font-bold text-white">Type</Text>
        <Text className="flex-1 text-center font-bold text-white">Date</Text>
        <Text className="flex-1 text-center font-bold text-white">Annuler</Text>
        <Text className="flex-1 text-center font-bold text-white">Sous Client</Text>
        <Text className="flex-1 text-center font-bold text-white">Réglement</Text>
        <Text className="flex-1 text-center font-bold text-white">Note</Text>
      </View>
      <FlatList
        data={invoices}
        renderItem={renderInvoiceItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 2 }}
      />
    </View>
  );
};



export default ListImp;
