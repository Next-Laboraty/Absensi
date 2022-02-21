import React from 'react';
import AppLoading from 'expo-app-loading';
import { Text, View, StyleSheet } from 'react-native';
import {
  useFonts,
  Oxygen_300Light,
  Oxygen_400Regular,
  Oxygen_700Bold
} from '@expo-google-fonts/oxygen'
import RoutingValue from './src/RoutingValue';

export default function HeaderTitle() {
  let [fontsLoaded] = useFonts({
    Oxygen_300Light,
    Oxygen_400Regular,
    Oxygen_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <RoutingValue />
  );
}
