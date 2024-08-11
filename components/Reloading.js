import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const Reloading = ()=>{
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#D9A900" />
        </View>
      );
};